"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type Props = {
  userId: string;
  userName: string;
  isLocked: boolean;
};

export function LockUserButton({ userId, userName, isLocked }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/lock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lock: !isLocked }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error ?? "Failed to update user");
        return;
      }
      setShowConfirm(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors text-slate-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        title={isLocked ? "Unlock user" : "Lock user"}
        aria-label={isLocked ? "Unlock user" : "Lock user"}
      >
        {isLocked ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z" />
          </svg>
        )}
      </button>
      <ConfirmDialog
        open={showConfirm}
        title={isLocked ? "Unlock user" : "Lock user"}
        message={
          isLocked
            ? `Unlock "${userName}"? They will be able to sign in again.`
            : `Lock "${userName}"? They will not be able to sign in until an admin unlocks them.`
        }
        confirmLabel={isLocked ? "Unlock" : "Lock"}
        variant={isLocked ? "default" : "danger"}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={loading}
      />
    </>
  );
}
