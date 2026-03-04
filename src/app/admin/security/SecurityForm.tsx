"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateEmergencyLock } from "./actions";

type Props = {
  initialEnabled: boolean;
  initialMessage: string;
};

export function SecurityForm({ initialEnabled, initialMessage }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await updateEmergencyLock(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="enabled"
          defaultChecked={initialEnabled}
          className="rounded border-slate-300"
          disabled={saving}
        />
        <span className="font-medium text-earthy">Enable access restriction</span>
      </label>

      <div>
        <label className="block text-sm font-medium text-earthy mb-1">
          Message shown on restricted screen (optional)
        </label>
        <textarea
          name="message"
          defaultValue={initialMessage}
          rows={4}
          className="w-full border border-grey/20 rounded-lg px-3 py-2"
          placeholder="Example: Access to this site is currently restricted. Please check back later."
          disabled={saving}
        />
        <p className="text-xs text-grey mt-2">
          Shown to visitors when access is restricted. Keep it neutral.
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
