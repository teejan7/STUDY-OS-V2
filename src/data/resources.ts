export type ResourceKind = 'youtube' | 'notes' | 'syllabus' | 'papers';
export interface SeedResource { id: string; subjectCode: string; label: string; url: string; kind: ResourceKind }

export const RESOURCES: SeedResource[] = [
  { id: 'youtube-cst401-ai-lecture', subjectCode: 'CST401', label: 'Artificial Intelligence - YouTube Lecture', url: 'https://youtu.be/lnyY4xjn86c?si=dHn7g2LKhDDMCFP5', kind: 'youtube' },
  { id: 'notes-cst401', subjectCode: 'CST401', label: 'AI Notes (Google Drive)', url: 'https://drive.google.com/drive/folders/1SViuwyOO91WdVPxscfsVDf9EbTWRZUEK?usp=drive_link', kind: 'notes' },
  { id: 'syllabus-cst401', subjectCode: 'CST401', label: 'Artificial Intelligence Syllabus', url: 'https://drive.google.com/file/d/1P0TQho3-4YB-r4ElDNFJ4mZtnMCzhmPG/view?usp=drive_link', kind: 'syllabus' },
  { id: 'pyq-cst401', subjectCode: 'CST401', label: 'KTU Model Question Papers', url: 'https://drive.google.com/drive/folders/1Hu_tzy4DonFd6Hg3HX4oHabkcDLmRUEC?usp=drive_link', kind: 'papers' },
  { id: 'notes-cst463', subjectCode: 'CST463', label: 'Web Programming Notes (Google Drive)', url: 'https://drive.google.com/drive/folders/1iPnEK8JLUctaO4QM2P29jwjsQ41npu0r?usp=drive_link', kind: 'notes' },
  { id: 'syllabus-cst463', subjectCode: 'CST463', label: 'Web Programming Syllabus', url: 'https://drive.google.com/file/d/1Hm1H7_DY9-V5LTYWSkIK1f6a6lKzkLXT/view?usp=drive_link', kind: 'syllabus' },
  { id: 'pyq-cst463', subjectCode: 'CST463', label: 'KTU Model Question Papers', url: 'https://drive.google.com/drive/folders/1eguutNZtQYbN-qZMfMVuWJY0E-8gFZTW?usp=drive_link', kind: 'papers' },
  { id: 'notes-mcn401', subjectCode: 'MCN401', label: 'ISE Notes (Google Drive)', url: 'https://drive.google.com/drive/folders/1wpxgDSQ0a9KgQS_vyD8IVkN3ectpPJka?usp=drive_link', kind: 'notes' },
  { id: 'syllabus-mcn401', subjectCode: 'MCN401', label: 'Industrial Safety Engineering Syllabus', url: 'https://drive.google.com/file/d/1vql0mZNWvGH6lgB1_vZur63BEVeuQ2xk/view?usp=drive_link', kind: 'syllabus' },
  { id: 'pyq-mcn401', subjectCode: 'MCN401', label: 'KTU Model Question Papers', url: 'https://drive.google.com/drive/folders/1MEKo348owOFp3N7MY4TqP_BJoi9MxRKX?usp=drive_link', kind: 'papers' },
  { id: 'youtube-mcn401-ise', subjectCode: 'MCN401', label: 'ISE YouTube Playlist', url: 'https://youtube.com/playlist?list=PLw_YSaGvHWbl7ZFBJlZMML3kILZmuMHsh&si=lzljw5kGjqz9K23v', kind: 'youtube' },
  { id: 'notes-cet455', subjectCode: 'CET455', label: 'EHS Notes (Google Drive)', url: 'https://drive.google.com/drive/folders/1EI2BtouJbtFT-igEJgzvuYYsGJZ-qj-O?usp=drive_link', kind: 'notes' },
  { id: 'syllabus-cet455', subjectCode: 'CET455', label: 'Environment Health and Safety Syllabus', url: 'https://drive.google.com/file/d/1Q0SVZrltteoZGqLTdT-XjRzlEHjZ_Ua3/view?usp=drive_link', kind: 'syllabus' },
  { id: 'pyq-cet455', subjectCode: 'CET455', label: 'KTU Model Question Papers', url: 'https://drive.google.com/drive/folders/1L-Wb0fZb_lJr1aEW-PFojdcb5Cfgpuq1?usp=drive_link', kind: 'papers' }
];
