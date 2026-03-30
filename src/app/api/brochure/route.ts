import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend once
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const project = body.project || "celestia";
    const consent = body.consent;

    // ✅ VALIDATION
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "You must accept the terms." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY." },
        { status: 500 }
      );
    }

    // ✅ EMAIL CONTENT (USER RECEIVES)
    const userEmail = await resend.emails.send({
      from: "Celestia <creative@brownstoneltd.com>", // ⚠️ change after domain verified
      to: email,
      subject:
        project === "townhouse"
          ? "Your Celestia Townhouses Brochure"
          : "Your Celestia Brochure",
      html: `
        <h2>Celestia Brochure</h2>
        <p>Thank you for your interest.</p>
        <p>Download your brochure below:</p>
        <a href="${process.env.BROCHURE_PDF_URL}" target="_blank">
          Download Brochure
        </a>
      `,
    });

    // ❗ CHECK RESEND RESPONSE
    if (userEmail.error) {
      console.error("Resend Error:", userEmail.error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    // ✅ OPTIONAL: SEND TO YOU (ADMIN NOTIFICATION)
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: "Celestia <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: "New Brochure Request",
        html: `
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project:</strong> ${project}</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message || "Server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}