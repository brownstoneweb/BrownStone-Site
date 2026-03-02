"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type Snippet = { id: string; name: string; content: string; created_at: string; updated_at: string };

const EXAMPLE_SNIPPETS: { name: string; content: string; description: string }[] = [
  {
    name: "CTA – Contact us",
    description: "Prominent call-to-action box with button.",
    content: `<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 1.5rem 1.75rem; margin: 1.5rem 0; color: #fff;">
  <p style="margin: 0 0 0.75rem 0; font-size: 1.1rem; font-weight: 600;">Ready to build with us?</p>
  <p style="margin: 0 0 1rem 0; opacity: 0.95; font-size: 0.95rem;">Discuss your project with Brownstone Construction. We'll respond within 24 hours.</p>
  <a href="/contact" style="display: inline-block; background: #fff; color: #1a472a; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">Get in touch</a>
</div>`,
  },
  {
    name: "CTA – Contact (compact)",
    description: "Short inline CTA with link.",
    content: `<p style="border-left: 4px solid #1a472a; padding: 0.75rem 1rem; background: #f5f5f0; margin: 1rem 0; border-radius: 0 8px 8px 0;">
  <strong>Have a project in mind?</strong> <a href="/contact" style="color: #1a472a; font-weight: 600;">Contact us</a> for a consultation.
</p>`,
  },
  {
    name: "Disclaimer – views",
    description: "Standard disclaimer for opinions or forward-looking content.",
    content: `<p style="font-size: 0.875rem; color: #6b7280; font-style: italic; margin: 1rem 0; padding: 0.75rem 1rem; background: #f9fafb; border-radius: 8px;">
  The views and information in this article are for general purposes only. For project-specific advice, please <a href="/contact" style="color: #1a472a;">contact us</a>.
</p>`,
  },
];

export function SnippetsManager({
  snippets: initial,
  canManage,
}: {
  snippets: Snippet[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [snippets, setSnippets] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editContent, setEditContent] = useState("");
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Snippet | null>(null);
  const [deleting, setDeleting] = useState(false);
  const addFormRef = useRef<HTMLFormElement>(null);

  function useExample(name: string, content: string) {
    setNewName(name);
    setNewContent(content);
    setEditingId(null);
    addFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), content: newContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create");
      setSnippets((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setNewContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(s: Snippet) {
    setEditingId(s.id);
    setEditName(s.name);
    setEditContent(s.content);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/snippets/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), content: editContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update");
      setSnippets((prev) => prev.map((s) => (s.id === editingId ? data : s)));
      setEditingId(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/snippets/${confirmDelete.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSnippets((prev) => prev.filter((s) => s.id !== confirmDelete.id));
      setConfirmDelete(null);
      router.refresh();
    } catch {
      setError("Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* How to use */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-2">How to use snippets</h3>
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-600">
          <li>Create snippets below (or use an example). Each has a <strong>name</strong> and <strong>HTML content</strong>.</li>
          <li>When editing a post, click the <strong>Snippet</strong> button in the editor toolbar (next to Media).</li>
          <li>Choose a snippet to insert it at the cursor. The HTML is dropped into your post so you can edit it there if needed.</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          Tip: Use simple HTML with inline styles so the block looks consistent. You can change links (e.g. <code className="bg-slate-200 px-1 rounded">/contact</code>) after inserting.
        </p>
      </div>

      {/* Example snippets */}
      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-3">Example snippets</h3>
        <p className="text-sm text-slate-500 mb-4">Use one as-is or copy and edit. Click &quot;Use this&quot; to pre-fill the form below, then click Add snippet.</p>
        <div className="space-y-4">
          {EXAMPLE_SNIPPETS.map((ex) => (
            <div key={ex.name} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-slate-800">{ex.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ex.description}</p>
                </div>
                {canManage && (
                  <button
                    type="button"
                    onClick={() => useExample(ex.name, ex.content)}
                    className="shrink-0 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90"
                  >
                    Use this
                  </button>
                )}
              </div>
              <pre className="mt-3 text-xs text-slate-600 overflow-x-auto overflow-y-auto max-h-24 bg-white border border-slate-100 rounded-lg p-3 font-mono whitespace-pre-wrap break-words">
                {ex.content.slice(0, 280)}{ex.content.length > 280 ? "…" : ""}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {canManage && (
        <form ref={addFormRef} onSubmit={handleCreate} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800">Add snippet</h3>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. CTA – Contact us"
              className="w-full max-w-xs px-3 py-2 border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Content (HTML)</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="<p>Your reusable block...</p>"
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={saving || !newName.trim()}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Adding…" : "Add snippet"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {snippets.length === 0 ? (
            <li className="px-6 py-8 text-slate-500 text-sm">No snippets yet. Add one above to reuse in posts.</li>
          ) : (
            snippets.map((s) => (
              <li key={s.id} className="p-6">
                {editingId === s.id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full max-w-xs px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      required
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
                    />
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg disabled:opacity-50">
                        Save
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-800">{s.name}</p>
                      <pre className="mt-1 text-xs text-slate-500 overflow-x-auto max-h-24 overflow-y-auto bg-slate-50 p-2 rounded">
                        {s.content.slice(0, 200)}{s.content.length > 200 ? "…" : ""}
                      </pre>
                    </div>
                    {canManage && (
                      <span className="flex gap-2 shrink-0">
                        <button type="button" onClick={() => startEdit(s)} className="text-sm text-primary hover:underline">
                          Edit
                        </button>
                        <button type="button" onClick={() => setConfirmDelete(s)} className="text-sm text-red-600 hover:underline">
                          Delete
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Delete snippet"
        message={confirmDelete ? `Delete "${confirmDelete.name}"? This cannot be undone.` : ""}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
