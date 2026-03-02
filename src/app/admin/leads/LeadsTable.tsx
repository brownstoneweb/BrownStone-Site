"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/lib/supabase/types";
import { IconPerson, IconPersonAdd, IconDelete } from "@/components/admin/ActionIcons";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const MESSAGE_PREVIEW_WORDS = 8;

function escapeCsvCell(value: string | null | undefined): string {
  if (value == null || value === "") return "";
  const s = String(value);
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function getSourceLabel(lead: Lead): string {
  if (lead.source === "brochure" && lead.project === "townhouse") {
    return "Celestia Townhouses Brochure";
  }
  if (lead.source === "brochure" && lead.project === "celestia") {
    return "Celestia Brochure";
  }
  if (lead.source === "brochure" && lead.project === "lakehouse") {
    return "Celestia Brochure (Lakehouse)";
  }
  const labels: Record<string, string> = {
    contact: "Contact",
    brochure: "Brochure",
    lakehouse: "Lakehouse",
    exit_intent: "Exit intent",
    newsletter: "Newsletter",
  };
  return labels[lead.source] ?? lead.source;
}

function getContactIdForLead(
  lead: Lead,
  existingContactIdByEmail: Record<string, string>,
  addedContactId: Record<string, string>
): string | null {
  const byEmail = lead.email
    ? existingContactIdByEmail[lead.email.trim().toLowerCase()] ?? null
    : null;
  return lead.contact_id ?? byEmail ?? addedContactId[lead.id] ?? null;
}

export function LeadsTable({
  leads,
  sources,
  currentSource,
  currentFrom,
  currentTo,
  existingContactIdByEmail = {},
}: {
  leads: Lead[];
  sources: readonly { value: string; label: string }[];
  currentSource: string;
  currentFrom: string;
  currentTo: string;
  existingContactIdByEmail?: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messageModal, setMessageModal] = useState<{ lead: Lead } | null>(null);
  const [addingLeadId, setAddingLeadId] = useState<string | null>(null);
  const [addedContactId, setAddedContactId] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAdding, setBulkAdding] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [leadActivityModal, setLeadActivityModal] = useState<Lead | null>(null);
  const [leadActivities, setLeadActivities] = useState<{ id: string; type: string; metadata: { content?: string }; created_at: string }[]>([]);
  const [leadActivityNote, setLeadActivityNote] = useState("");
  const [leadActivityType, setLeadActivityType] = useState<"note" | "call" | "meeting" | "email_sent">("note");
  const [savingLeadActivity, setSavingLeadActivity] = useState(false);
  const [loadingLeadActivities, setLoadingLeadActivities] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activityDialogRef = useRef<HTMLDialogElement>(null);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)));
    }
  }

  async function addLeadToContacts(lead: Lead) {
    if (!lead.email?.trim()) return;
    setAddingLeadId(lead.id);
    try {
      const res = await fetch("/api/crm/contacts/from-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: lead.id }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        setAddedContactId((prev) => ({ ...prev, [lead.id]: data.id }));
      } else {
        alert(data.error ?? "Failed to add to contacts");
      }
    } catch {
      alert("Failed to add to contacts");
    } finally {
      setAddingLeadId(null);
    }
  }

  async function bulkAddToContacts() {
    const toAdd = leads.filter((l) => {
      if (!selectedIds.has(l.id) || !l.email?.trim()) return false;
      const cid = getContactIdForLead(l, existingContactIdByEmail, addedContactId);
      return !cid;
    });
    if (toAdd.length === 0) return;
    setBulkAdding(true);
    let added = 0;
    for (const lead of toAdd) {
      try {
        const res = await fetch("/api/crm/contacts/from-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead_id: lead.id }),
        });
        const data = await res.json();
        if (res.ok && data.id) {
          setAddedContactId((prev) => ({ ...prev, [lead.id]: data.id }));
          added++;
        }
      } catch {
        // continue
      }
    }
    setBulkAdding(false);
    setSelectedIds(new Set());
    if (added > 0) router.refresh();
  }

  async function handleConfirmBulkDelete() {
    if (selectedIds.size === 0) return;
    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/leads/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_ids: Array.from(selectedIds) }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowBulkDeleteConfirm(false);
        setSelectedIds(new Set());
        router.refresh();
      } else {
        alert(data.error ?? "Failed to delete leads");
      }
    } catch {
      alert("Failed to delete leads");
    } finally {
      setBulkDeleting(false);
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (messageModal) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [messageModal]);

  useEffect(() => {
    const dialog = activityDialogRef.current;
    if (!dialog) return;
    if (leadActivityModal) {
      dialog.showModal();
      setLoadingLeadActivities(true);
      fetch(`/api/admin/leads/${leadActivityModal.id}/activities`)
        .then((r) => r.ok ? r.json() : [])
        .then(setLeadActivities)
        .catch(() => setLeadActivities([]))
        .finally(() => setLoadingLeadActivities(false));
      setLeadActivityNote("");
      setLeadActivityType("note");
    } else {
      dialog.close();
    }
  }, [leadActivityModal]);

  async function handleAddLeadActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!leadActivityModal) return;
    if (leadActivityType === "note" && !leadActivityNote.trim()) return;
    setSavingLeadActivity(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadActivityModal.id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: leadActivityType, content: leadActivityNote.trim() || undefined }),
      });
      if (res.ok) {
        setLeadActivityNote("");
        const list = await fetch(`/api/admin/leads/${leadActivityModal.id}/activities`).then((r) => r.ok ? r.json() : []);
        setLeadActivities(list);
        router.refresh();
      }
    } finally {
      setSavingLeadActivity(false);
    }
  }

  const [exportingCsv, setExportingCsv] = useState(false);
  async function exportCsv() {
    setExportingCsv(true);
    try {
      const params = new URLSearchParams();
      if (currentSource) params.set("source", currentSource);
      if (currentFrom) params.set("from", currentFrom);
      if (currentTo) params.set("to", currentTo);
      const res = await fetch(`/api/admin/leads/export?${params.toString()}`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed. Try again.");
    } finally {
      setExportingCsv(false);
    }
  }

  function updateFilters(updates: { source?: string; from?: string; to?: string }) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (updates.source !== undefined) {
      if (updates.source) params.set("source", updates.source);
      else params.delete("source");
    }
    if (updates.from !== undefined) {
      if (updates.from) params.set("from", updates.from);
      else params.delete("from");
    }
    if (updates.to !== undefined) {
      if (updates.to) params.set("to", updates.to);
      else params.delete("to");
    }
    router.push(`/admin/leads?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <form
        className="flex flex-wrap items-end gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="source" className="block text-xs font-medium text-slate-500 mb-1">
            Source
          </label>
          <select
            id="source"
            value={currentSource}
            onChange={(e) => updateFilters({ source: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
          >
            {sources.map((s) => (
              <option key={s.value || "all"} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="from" className="block text-xs font-medium text-slate-500 mb-1">
            From date
          </label>
          <input
            id="from"
            type="date"
            value={currentFrom}
            onChange={(e) => updateFilters({ from: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
          />
        </div>
        <div>
          <label htmlFor="to" className="block text-xs font-medium text-slate-500 mb-1">
            To date
          </label>
          <input
            id="to"
            type="date"
            value={currentTo}
            onChange={(e) => updateFilters({ to: e.target.value })}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
          />
        </div>
        {(currentSource || currentFrom || currentTo) && (
          <button
            type="button"
            onClick={() => updateFilters({ source: "", from: "", to: "" })}
            className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
          >
            Clear filters
          </button>
        )}
        <button
          type="button"
          onClick={exportCsv}
          disabled={exportingCsv}
          className="ml-auto px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exportingCsv ? "Exporting…" : "Export CSV"}
        </button>
      </form>

      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
          <span className="text-sm font-medium text-slate-700">
            {selectedIds.size} selected
          </span>
          <button
            type="button"
            onClick={bulkAddToContacts}
            disabled={bulkAdding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium text-sm disabled:opacity-70"
            title="Add selected to contacts"
          >
            <IconPersonAdd className="w-4 h-4 shrink-0" />
            {bulkAdding ? "Adding…" : "Add to contacts"}
          </button>
          <button
            type="button"
            onClick={() => selectedIds.size > 0 && setShowBulkDeleteConfirm(true)}
            disabled={bulkDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm disabled:opacity-70"
            title="Delete selected"
          >
            <IconDelete className="w-4 h-4 shrink-0" />
            {bulkDeleting ? "Deleting…" : "Delete"}
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Clear selection
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-widest font-bold border-b border-slate-100">
                <th className="px-4 py-4 w-12">
                  <label className="flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={leads.length > 0 && selectedIds.size === leads.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                      aria-label="Select all"
                    />
                  </label>
                </th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-4 py-5 w-12 align-middle">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                          aria-label={`Select ${lead.email}`}
                        />
                      </label>
                    </td>
                    <td className="px-6 py-5 align-middle">
                      <a
                        href={`mailto:${lead.email}`}
                        className="font-medium text-slate-800 hover:text-primary transition-colors text-[0.8rem]"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {lead.phone ? (
                        <a href={`tel:${lead.country_code ?? ""}${lead.phone}`} className="hover:text-primary">
                          {lead.country_code ? `${lead.country_code} ` : ""}
                          {lead.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{lead.name || "—"}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {getSourceLabel(lead)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">{lead.project || "—"}</td>
                    <td className="px-6 py-5 text-sm text-slate-500 max-w-[280px]">
                      {lead.message ? (
                        <>
                          <span className="block truncate text-slate-600">
                            {(() => {
                              const words = lead.message.trim().split(/\s+/);
                              const preview =
                                words.length <= MESSAGE_PREVIEW_WORDS
                                  ? lead.message.trim()
                                  : words.slice(0, MESSAGE_PREVIEW_WORDS).join(" ") + "…";
                              return preview;
                            })()}
                          </span>
                          <button
                            type="button"
                            onClick={() => setMessageModal({ lead })}
                            className="mt-1 text-xs font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
                          >
                            View full message
                          </button>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5 text-right align-middle">
                      <span className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setLeadActivityModal(lead)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Notes & activity"
                          aria-label="Notes & activity"
                        >
                          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                          </svg>
                        </button>
                        {(() => {
                          const contactId = getContactIdForLead(lead, existingContactIdByEmail, addedContactId);
                          return contactId ? (
                            <Link
                              href={`/admin/crm/contacts/${contactId}`}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                              title="Already added – view contact"
                              aria-label="Already added – view contact"
                            >
                              <IconPerson className="w-5 h-5 shrink-0" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addLeadToContacts(lead)}
                              disabled={addingLeadId === lead.id || !lead.email?.trim()}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                              title="Add to contacts"
                              aria-label="Add to contacts"
                            >
                              {addingLeadId === lead.id ? (
                                <span className="text-xs font-medium">…</span>
                              ) : (
                                <IconPersonAdd />
                              )}
                            </button>
                          );
                        })()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {leads.length > 0 && (
        <p className="text-sm text-slate-500">
          Showing {leads.length} lead{leads.length === 1 ? "" : "s"} (max 200).
        </p>
      )}

      {/* Full message modal */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 w-full max-w-lg mx-auto my-8 p-0 rounded-xl border border-slate-200 shadow-xl bg-white overflow-hidden [&::backdrop]:bg-black/30"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMessageModal(null);
        }}
        onCancel={() => setMessageModal(null)}
        onClose={() => setMessageModal(null)}
      >
        {messageModal && (
          <div className="p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Message</h3>
              <button
                type="button"
                onClick={() => setMessageModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-1">
              {messageModal.lead.name && <span className="font-medium text-slate-700">{messageModal.lead.name}</span>}
              {messageModal.lead.name && " · "}
              <a href={`mailto:${messageModal.lead.email}`} className="text-primary hover:underline">
                {messageModal.lead.email}
              </a>
            </p>
            <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-100 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">
                {messageModal.lead.message || "—"}
              </p>
            </div>
          </div>
        )}
      </dialog>
      {/* Notes & activity modal */}
      <dialog
        ref={activityDialogRef}
        className="fixed inset-0 z-50 w-full max-w-lg mx-auto my-8 p-0 rounded-xl border border-slate-200 shadow-xl bg-white overflow-hidden max-h-[90vh] flex flex-col [&::backdrop]:bg-black/30"
        onClick={(e) => { if (e.target === e.currentTarget) setLeadActivityModal(null); }}
        onCancel={() => setLeadActivityModal(null)}
        onClose={() => setLeadActivityModal(null)}
      >
        {leadActivityModal && (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Notes & activity</h3>
              <button
                type="button"
                onClick={() => setLeadActivityModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              {leadActivityModal.name && <span className="font-medium text-slate-700">{leadActivityModal.name}</span>}
              {leadActivityModal.name && " · "}
              <a href={`mailto:${leadActivityModal.email}`} className="text-primary hover:underline">{leadActivityModal.email}</a>
            </p>
            <form onSubmit={handleAddLeadActivity} className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <select
                  value={leadActivityType}
                  onChange={(e) => setLeadActivityType(e.target.value as "note" | "call" | "meeting" | "email_sent")}
                  className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm"
                >
                  <option value="note">Note</option>
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="email_sent">Emailed</option>
                </select>
              </div>
              <textarea
                value={leadActivityNote}
                onChange={(e) => setLeadActivityNote(e.target.value)}
                placeholder={leadActivityType === "note" ? "Add a note..." : "Summary (optional)..."}
                rows={2}
                disabled={savingLeadActivity}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm mb-2"
              />
              <button
                type="submit"
                disabled={savingLeadActivity || (leadActivityType === "note" && !leadActivityNote.trim())}
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {savingLeadActivity ? "Adding…" : "Add"}
              </button>
            </form>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Timeline</h4>
            {loadingLeadActivities ? (
              <p className="text-sm text-slate-500">Loading…</p>
            ) : leadActivities.length === 0 ? (
              <p className="text-sm text-slate-500">No activity yet.</p>
            ) : (
              <div className="space-y-2">
                {[...leadActivities].reverse().map((a) => (
                  <div key={a.id} className="flex gap-3 py-2 px-3 rounded-lg border border-slate-100 bg-slate-50/50 text-sm">
                    <span className="text-slate-500 shrink-0 w-24">
                      {new Date(a.created_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="font-medium text-slate-700 capitalize">{a.type.replace("_", " ")}</span>
                    {a.metadata?.content && <span className="text-slate-600">— {a.metadata.content}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
      <ConfirmDialog
        open={showBulkDeleteConfirm}
        title="Delete leads"
        message={`Delete ${selectedIds.size} lead${selectedIds.size === 1 ? "" : "s"}? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmBulkDelete}
        onCancel={() => setShowBulkDeleteConfirm(false)}
        loading={bulkDeleting}
      />
    </div>
  );
}
