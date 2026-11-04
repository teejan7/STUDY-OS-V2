import { SUBJECTS } from './data/subjects';

const safeGet = (key: string) => { try { return window.localStorage.getItem(key); } catch { return null; } };
const safeSet = (key: string, value: string) => { try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ } };
const id = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

export function migrateStudyOS() {
  if (typeof window === 'undefined') return;
  if (safeGet('studyos.schema') !== '2') {
    for (const name of ['notes', 'questions', 'flashcards', 'reminders', 'progress', 'files']) {
      const old = safeGet(`studyos_${name}`);
      if (old !== null && safeGet(`studyos.s6.${name}`) === null) safeSet(`studyos.s6.${name}`, old);
    }
    safeSet('studyos.schema', '2');
  }
  if (safeGet('studyos.s7.examDataCorrected') !== 'true') {
    try {
      const stored = JSON.parse(safeGet('studyos.s7.subjects') ?? '[]');
      const canonical = new Map(SUBJECTS.map((subject) => [subject.code, subject]));
      if (Array.isArray(stored)) {
        safeSet('studyos.s7.subjects', JSON.stringify(stored.map((subject) => canonical.has(subject.code) ? { ...subject, ...canonical.get(subject.code) } : subject)));
      }
    } catch { /* invalid stored subjects are handled by the app defaults */ }
    safeSet('studyos.s7.examDataCorrected', 'true');
  }
  if (safeGet('studyos.s7.seeded') === 'true') return;
  safeSet('studyos.s7.reminders', JSON.stringify([
    ['Start AI revision', '2026-11-03'], ['AI Module 3 and 4 done', '2026-11-10'], ['AI mock paper', '2026-11-19'], ['Compiler Lab: 7 important programs viva-ready', '2026-11-15'], ['Web Programming full revision', '2026-11-24']
  ].map(([title, datetime]) => ({ id: id(), title, subjectCode: title.startsWith('AI') ? 'CST401' : title.startsWith('Web') ? 'CST463' : 'CSL411', datetime: `${datetime}T09:00`, priority: 'medium', done: false }))));
  safeSet('studyos.s7.subjects', JSON.stringify(SUBJECTS));
  safeSet('studyos.s7.seeded', 'true');
}
