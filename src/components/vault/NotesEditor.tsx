import { useEffect, useMemo, useState } from 'react';
import { Note } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface NotesEditorProps {
  subjectCode: string;
  notes: Note[];
  modules: string[];
  onSave: (note: Note) => void;
  editingNote?: Note | null;
  onUpdate?: (note: Note) => void;
  onCancelEdit?: () => void;
}

export default function NotesEditor({ subjectCode, modules, onSave, editingNote, onUpdate, onCancelEdit }: NotesEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [module, setModule] = useState('');

  useEffect(() => {
    setTitle(editingNote?.title ?? '');
    setContent(editingNote?.content ?? '');
    setModule(editingNote?.module ?? '');
  }, [editingNote]);

  const preview = useMemo(() => content, [content]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    const note = { id: editingNote?.id ?? uuidv4(), subjectCode, module: module || modules[0] || 'General', title: title.trim(), content: content.trim(), createdAt: editingNote?.createdAt ?? new Date().toISOString() };
    if (editingNote && onUpdate) onUpdate(note); else onSave(note);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">{editingNote ? 'Edit note' : 'New note'}</div>
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <label className="flex flex-col gap-2 text-sm">
          Subject
          <input className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" value={subjectCode} disabled />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Module
          <select className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text" value={module} onChange={(event) => setModule(event.target.value)}>
            <option value="">General</option>
            {modules.map((moduleName) => (
              <option key={moduleName} value={moduleName}>{moduleName}</option>
            ))}
          </select>
        </label>
      </div>
      <input
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
      />
      <textarea
        rows={6}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note in markdown-style text..."
      />
      <div className="flex gap-2"><button onClick={handleSubmit} className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/80">Save note</button>{editingNote && <button type="button" onClick={onCancelEdit} className="rounded-lg border border-border bg-bg px-4 py-2 text-sm text-text">Cancel</button>}</div>
      <div className="rounded-xl border border-border bg-bg p-4 text-sm">
        <div className="text-xs uppercase tracking-[0.18em] text-muted">Preview</div>
        <div className={`mt-3 whitespace-pre-wrap text-text ${preview ? '' : 'text-muted'}`}>{preview || 'Start typing to preview...'}</div>
      </div>
    </div>
  );
}
