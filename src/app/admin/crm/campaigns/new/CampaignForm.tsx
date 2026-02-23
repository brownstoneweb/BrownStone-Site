"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Template = { id: string; name: string; subject: string };
type Contact = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  do_not_contact?: boolean;
  unsubscribed?: boolean;
};
type Segment = { id: string; name: string; color: string; contact_count: number };

export function CampaignForm({
  templates,
  contacts,
  segments = [],
}: {
  templates: Template[];
  contacts: Contact[];
  segments?: Segment[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<Set<string>>(new Set());
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<Set<string>>(new Set());

  function toggleContact(id: string) {
    setSelectedContactIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllContacts() {
    if (selectedContactIds.size === eligibleContacts.length) {
      setSelectedContactIds(new Set());
    } else {
      setSelectedContactIds(new Set(eligibleContacts.map((c) => c.id)));
    }
  }

  function toggleSegment(id: string) {
    setSelectedSegmentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!hasRecipients) {
      setError("Select at least one segment or individual contact.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/crm/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          type: "cold",
          template_id: templateId || null,
          contact_ids: selectedContactIds.size > 0 ? Array.from(selectedContactIds) : undefined,
          segment_ids: selectedSegmentIds.size > 0 ? Array.from(selectedSegmentIds) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create campaign");
        return;
      }
      router.push(`/admin/crm/campaigns/${data.id}`);
      router.refresh();
    } catch {
      setError("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  }

  const eligibleContacts = contacts.filter(
    (c) => !c.do_not_contact && !c.unsubscribed
  );

  const hasRecipients = selectedSegmentIds.size > 0 || selectedContactIds.size > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl"
    >
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Campaign name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
            placeholder="Q1 Cold Outreach"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email template *
          </label>
          <select
            required
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
          >
            <option value="">Select a template</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.subject}
              </option>
            ))}
          </select>
          {templates.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">
              Create a template first in Email Templates.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Recipients
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Select by segment and/or individual contacts. Contacts marked &quot;Do not contact&quot; or &quot;Unsubscribed&quot; are excluded.
          </p>

          {segments.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-slate-600 mb-2">By segment ({selectedSegmentIds.size} selected)</p>
              <div className="flex flex-wrap gap-2">
                {segments.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSegmentIds.has(s.id)}
                      onChange={() => toggleSegment(s.id)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-slate-800">{s.name}</span>
                    <span className="text-slate-400 text-xs">({s.contact_count})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-medium text-slate-600 mb-2">By individual contact ({selectedContactIds.size} selected)</p>
          <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
            <div className="p-3 border-b border-slate-100 bg-slate-50/50">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eligibleContacts.length > 0 && selectedContactIds.size === eligibleContacts.length}
                  onChange={toggleAllContacts}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Select all</span>
              </label>
            </div>
            <div className="divide-y divide-slate-100">
              {eligibleContacts.length === 0 ? (
                <div className="p-4 text-sm text-slate-500 text-center">
                  No contacts. Add contacts in the Contacts section.
                </div>
              ) : (
                eligibleContacts.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedContactIds.has(c.id)}
                      onChange={() => toggleContact(c.id)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-800 truncate">
                      {c.name || c.email}
                    </span>
                    <span className="text-xs text-slate-500 truncate flex-1">
                      {c.email}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading || templates.length === 0 || !hasRecipients}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create campaign"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:text-slate-800 border border-slate-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
