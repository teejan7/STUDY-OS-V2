export const MODULES: Record<string, string[]> = {
  CST401: [
    'M1 Introduction: AI, intelligent agents, rationality, environments, agent structure',
    'M2 Problem solving: uninformed and informed search, heuristics',
    'M3 Complex environments: minimax, alpha-beta, CSP',
    'M4 Knowledge and reasoning: propositional logic, FOL, unification, chaining, resolution',
    'M5 Machine learning: decision trees, hypothesis selection, linear regression/classification'
  ],
  CST463: [
    'M1 WWW and HTML5: URL/MIME, forms, tables, multimedia',
    'M2 CSS and JavaScript: selectors, box model, media queries, DOM, events',
    'M3 PHP basics: types, arrays, strings, regex, functions',
    'M4 PHP + MySQL: forms, cookies, sessions, CRUD',
    'M5 JSON and Laravel: JSON schema, MVC, routing, middleware, controllers, views'
  ],
  CET455: [
    'M1 Occupational health and toxicology: diseases, exposure limits, industrial hygiene',
    'M2 Chemical hazards, biological hazards, noise',
    'M3 Construction safety, electrical hazards, radiation',
    'M4 Air pollution, water pollution, waste management',
    'M5 Safe working environment: inspection, first aid, PPE, role of individual'
  ],
  MCN401: [
    'M1 Safety introduction: definitions, accident theories, safety organization, committee',
    'M2 Personal protection: PPE, frequency/severity rates, housekeeping, 5S, work permits, confined space',
    'M3 Construction safety: scaffolds, excavation, demolition, NBC, ergonomics',
    'M4 Machine hazards: guarding, welding, material handling, wire ropes',
    'M5 Hazard identification: fire, Dow index, PHA, HAZOP, chemical hazards, MSDS'
  ]
};

export const SUBJECTS = [
  { code: 'CST401', name: 'Artificial Intelligence', credits: 3, examDate: '2026-11-23' },
  { code: 'CST463', name: 'Web Programming', credits: 3, examDate: '2026-11-25' },
  { code: 'CET455', name: 'Environment Health and Safety', credits: 3, examDate: '2026-11-27' },
  { code: 'MCN401', name: 'Industrial Safety Engineering', credits: 0, examDate: '2026-12-02' },
  { code: 'CSL411', name: 'Compiler Lab', credits: 2, examDate: '2026-11-09' }
] as const;
