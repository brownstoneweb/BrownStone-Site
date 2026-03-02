"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/ActionIcons";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export function DeleteCampaignButton({
  campaignId,
  campaignName,
  variant = "link",
}: {
  campaignId: string;
  campaignName: string;
  variant?: "link" | "button";
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/crm/campaigns/${campaignId}`, { method: "DELETE" });
      if (res.ok) {
        setShowConfirm(false);
        router.push("/admin/crm/campaigns");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to delete campaign");
      }
    } catch {
      alert("Failed to delete campaign");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <DeleteButton
        onClick={() => setShowConfirm(true)}
        disabled={deleting}
        loading={deleting}
        title={variant === "button" ? "Delete campaign" : "Delete"}
        aria-label={variant === "button" ? "Delete campaign" : "Delete"}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      />
      <ConfirmDialog
        open={showConfirm}
        title="Delete campaign"
        message={`Delete campaign "${campaignName}"? This will remove all recipient records and cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
