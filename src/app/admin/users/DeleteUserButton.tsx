"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/ActionIcons";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteUser } from "./actions";

type Props = {
  userId: string;
  userName: string;
};

export function DeleteUserButton({ userId, userName }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    const result = await deleteUser(userId);
    setDeleting(false);
    if (result.error) {
      alert(result.error);
      return;
    }
    setShowConfirm(false);
    router.refresh();
  }

  return (
    <>
      <DeleteButton
        onClick={() => setShowConfirm(true)}
        disabled={deleting}
        loading={deleting}
        title="Delete user"
        aria-label="Delete user"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      />
      <ConfirmDialog
        open={showConfirm}
        title="Delete user"
        message={`Delete user "${userName}"? This cannot be undone and they will lose access.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
