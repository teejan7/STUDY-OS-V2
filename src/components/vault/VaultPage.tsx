import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Note, FileRecord, Resource, SubjectTopics, TopicProgress } from '../../types';
import NotesEditor from './NotesEditor';
import ImportantTopics from './ImportantTopics';
import { Youtube } from 'lucide-react';
import { isVisibleResource } from '../../utils/resources';

interface VaultPageProps {
  selectedSubject: string;
  subjects: { code: string; name: string }[];
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  files: FileRecord[];
  setFiles: Dispatch<SetStateAction<FileRecord[]>>;
  resources: Resource[];
  topics: SubjectTopics[];
  setTopics: Dispatch<SetStateAction<SubjectTopics[]>>;
  progress: TopicProgress[];
  setProgress: Dispatch<SetStateAction<TopicProgress[]>>;
}

export default function VaultPage({ selectedSubject, notes, setNotes, files, setFiles, resources, topics, setTopics, progress, setProgress }: VaultPageProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const subjectNotes = useMemo(() => notes.filter((note) => note.subjectCode === selectedSubject), [notes, selectedSubject]);
  const subjectResources = useMemo(() => resources.filter((resource) => resource.subjectCode === selectedSubject && isVisibleResource(resource)), [resources, selectedSubject]);
  const modules = Object.keys(topics.find((item) => item.subjectCode === selectedSubject)?.modules ?? {});

  const handleSave = (note: Note) => {
    setNotes([note, ...notes]);
  };
  const handleUpdate = (note: Note) => { setNotes((current) => current.map((item) => item.id === note.id ? note : item)); setEditingNote(null); };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-4">
          <NotesEditor subjectCode={selectedSubject} notes={notes} modules={modules} onSave={handleSave} editingNote={editingNote} onUpdate={handleUpdate} onCancelEdit={() => setEditingNote(null)} />
          <div className="rounded-xl border border-border bg-deep p-4">
            <div className="text-sm uppercase tracking-[0.18em] text-muted">Notes archive</div>
            <div className="mt-4 space-y-3">
              {subjectNotes.length ? (
                subjectNotes.map((note) => (
                  <div key={note.id} className="rounded-xl border border-border bg-bg p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-text">{note.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted"><span>{note.module}</span><button type="button" onClick={() => setEditingNote(note)} className="text-accent">Edit</button><button type="button" onClick={() => setNotes((current) => current.filter((item) => item.id !== note.id))} className="text-danger">Delete</button></div>
                    </div>
                    <div className="mt-2 text-xs text-muted">{new Date(note.createdAt).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No notes saved. Create one above.</p>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-deep p-4">
            <div className="text-sm uppercase tracking-[0.18em] text-muted">Resources</div>
            <div className="mt-4 space-y-3">
              {subjectResources.length ? (
                subjectResources.map((resource) => (
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" key={resource.id} className="flex w-full items-center justify-between rounded-xl border border-border bg-bg p-3 text-left text-sm text-text hover:bg-surface">
                    <span className="flex items-center gap-2">{resource.type === 'youtube' && <Youtube className="h-4 w-4 text-red-400" />}{resource.title}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">{resource.type}</span>
                  </a>
                ))
              ) : (
                <p className="text-sm text-muted">No resources for this subject yet.</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <ImportantTopics selectedSubject={selectedSubject} topics={topics} setTopics={setTopics} progress={progress} setProgress={setProgress} />
        </div>
      </div>
    </div>
  );
}
