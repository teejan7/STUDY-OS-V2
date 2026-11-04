import type { SubjectTopics } from '../types';

import { MODULES } from './subjects';
export const DEFAULT_TOPICS: SubjectTopics[] = Object.entries(MODULES).map(([subjectCode, modules]) => ({
  subjectCode,
  modules: Object.fromEntries(modules.map((label, index) => [`M${index + 1}`, [label]]))
}));
