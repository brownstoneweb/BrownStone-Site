"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/ActionIcons";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deletePost } from "./actions";

type Props = {
  postId: string;
  postTitle: string;
  variant?: "link" | "button";
  className?: string;
};

export function DeletePostButton({ postId, postTitle, variant = "link", className }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    const result = await deletePost(postId);
    if (result.error) {
      alert(result.error);
      setDeleting(false);
      return;
    }
    setShowConfirm(false);
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <>
      <DeleteButton
        onClick={() => setShowConfirm(true)}
        disabled={deleting}
        loading={deleting}
        title={variant === "button" ? "Delete post" : "Delete"}
        aria-label={variant === "button" ? "Delete post" : "Delete"}
        className={className ?? "text-red-600 hover:text-red-700 hover:bg-red-50"}
      />
      <ConfirmDialog
        open={showConfirm}
        title="Delete post"
        message={`Delete "${postTitle}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
