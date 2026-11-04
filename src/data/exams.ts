export type ExamKind = 'theory' | 'lab';
export interface Exam { code: string; name: string; short: string; date: string | null; slot: string; time: string | null; modules: number; kind: ExamKind; credits: number; note?: string }
export const EXAMS: readonly Exam[] = [
  { code: 'CST401', name: 'Artificial Intelligence', short: 'AI', date: '2026-11-23', slot: 'A', time: '09:30', modules: 5, kind: 'theory', credits: 3 },
  { code: 'CST463', name: 'Web Programming', short: 'WEB', date: '2026-11-25', slot: 'B', time: '09:30', modules: 5, kind: 'theory', credits: 3, note: 'Program Elective II' },
  { code: 'CET455', name: 'Environment Health and Safety', short: 'EHS', date: '2026-11-27', slot: 'C', time: '09:30', modules: 5, kind: 'theory', credits: 3, note: 'Open Elective' },
  { code: 'MCN401', name: 'Industrial Safety Engineering', short: 'ISE', date: '2026-11-30', slot: 'D', time: '09:30', modules: 5, kind: 'theory', credits: 0, note: 'Mandatory non-credit (MCN)' },
  { code: 'CSL411', name: 'Compiler Lab', short: 'LAB', date: '2026-11-10', slot: '-', time: null, modules: 0, kind: 'lab', credits: 2, note: 'External lab exam' }
] as const;
