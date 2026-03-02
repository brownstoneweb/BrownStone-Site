import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "@/lib/logger";
import { logAuditFromRequest } from "@/lib/audit";

const log = logger.create("api:admin:media");

/** Cap listed objects to avoid huge responses and Array buffer allocation failures. */
const MAX_MEDIA_ITEMS = 2000;

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");

function getR2Client() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) return null;
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { getUserRoles } = await import("@/lib/supabase/auth");
  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator") && !roles.includes("author")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = getR2Client();
  if (!client || !R2_BUCKET_NAME || !R2_PUBLIC_URL) {
    return NextResponse.json(
      { error: "R2 storage not configured." },
      { status: 503 }
    );
  }

  const items: { key: string; url: string; size: number; lastModified: string }[] = [];
  let continuationToken: string | undefined;

  try {
    do {
      if (items.length >= MAX_MEDIA_ITEMS) break;
      const command = new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        Prefix: "media/",
        MaxKeys: Math.min(500, MAX_MEDIA_ITEMS - items.length),
        ContinuationToken: continuationToken,
      });
      const response = await client.send(command);

      for (const obj of response.Contents ?? []) {
        if (obj.Key && items.length < MAX_MEDIA_ITEMS) {
          items.push({
            key: obj.Key,
            url: `${R2_PUBLIC_URL}/${obj.Key}`,
            size: obj.Size ?? 0,
            lastModified: obj.LastModified?.toISOString() ?? "",
          });
        }
      }
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);
  } catch (err: unknown) {
    const code = err && typeof err === "object" && "Code" in err ? (err as { Code?: string }).Code : undefined;
    if (code === "Unauthorized" || code === "AccessDenied" || (err as Error)?.name === "Unauthorized") {
      return NextResponse.json(
        {
          error: "R2 access denied. Check R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, bucket name, and that the API token has Object Read & List permissions.",
        },
        { status: 502 }
      );
    }
    throw err;
  }

  // Newest first
  items.sort((a, b) => (b.lastModified > a.lastModified ? 1 : -1));

  const keys = items.map((i) => i.key);
  let metaMap: Record<string, { alt: string | null; caption: string | null }> = {};
  if (keys.length > 0) {
    const { data: metaRows } = await supabase
      .from("media_meta")
      .select("key, alt, caption")
      .in("key", keys);
    if (metaRows) {
      metaMap = Object.fromEntries(
        metaRows.map((r) => [
          r.key,
          { alt: (r.alt as string) ?? null, caption: (r.caption as string) ?? null },
        ])
      );
    }
  }

  const itemsWithMeta = items.map((item) => ({
    ...item,
    alt: metaMap[item.key]?.alt ?? null,
    caption: metaMap[item.key]?.caption ?? null,
  }));

  const truncated = items.length >= MAX_MEDIA_ITEMS;
  return NextResponse.json({
    items: itemsWithMeta,
    ...(truncated && { truncated: true, message: `Showing newest ${MAX_MEDIA_ITEMS} files. More may exist in the bucket.` }),
  });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { getUserRoles } = await import("@/lib/supabase/auth");
  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { key?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = body.key?.trim();
  if (!key || !key.startsWith("media/")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const client = getR2Client();
  if (!client || !R2_BUCKET_NAME) {
    return NextResponse.json({ error: "R2 storage not configured." }, { status: 503 });
  }

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    );

    logAuditFromRequest(request, {
      userId: user.id,
      userEmail: user.email,
      action: "delete",
      resourceType: "media",
      resourceId: key,
      description: `Deleted media file ${key.split("/").pop()}`,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    log.error("Media deletion failed", err);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { getUserRoles } = await import("@/lib/supabase/auth");
  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator") && !roles.includes("author")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { key?: string; alt?: string | null; caption?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = body.key?.trim();
  if (!key || !key.startsWith("media/")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const alt = body.alt === undefined ? null : (body.alt === null || body.alt === "" ? null : String(body.alt).trim());
  const caption = body.caption === undefined ? null : (body.caption === null || body.caption === "" ? null : String(body.caption).trim());

  const { error } = await supabase.from("media_meta").upsert(
    {
      key,
      alt,
      caption,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    },
    { onConflict: "key" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
