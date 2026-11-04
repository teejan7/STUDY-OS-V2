import { Subject } from '../../types';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { EXAMS } from '../../data/exams';

interface CountdownCardProps {
  subject: Subject;
}

export default function CountdownCard({ subject }: CountdownCardProps) {
  const exam = EXAMS.find((item) => item.code === subject.code);
  const date = subject.examDate;
  const days = date ? differenceInCalendarDays(parseISO(date), new Date()) : null;
  const previousCandidates = exam?.date ? [...EXAMS].filter((item) => item.kind === 'theory' && item.date && item.date < exam.date!).sort((a, b) => a.date!.localeCompare(b.date!)) : [];
  const previous = previousCandidates[previousCandidates.length - 1];
  const prepGap = exam?.kind === 'theory' ? previous?.date ? differenceInCalendarDays(parseISO(exam.date!), parseISO(previous.date)) - 1 : days : null;
  const tone = days === null ? 'bg-deep text-accent' : days < 7 ? 'bg-red-950 text-red-200' : days <= 14 ? 'bg-orange-950 text-orange-200' : 'bg-deep text-accent';

  return (
    <div className={`rounded-xl border-2 border-accent p-4 ${tone}`}>
      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-muted">
        <span>{subject.code}</span>
        <span>{subject.credits ? `Credits: ${subject.credits}` : 'Pass/Fail course (non-credit)'}</span>
      </div>
      <div className="mt-3 text-lg font-semibold">{subject.name}</div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-muted">Exam date</div>
          <div>{date || 'DATE TBA'}</div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-accent bg-accent/10 px-4 py-3 font-mono text-2xl font-bold text-accent">
          {days === null ? '--' : days >= 0 ? `${days}d` : 'Done'}
        </div>
      </div>
      {exam?.kind === 'theory' && <div className="mt-3 text-xs text-muted">{days !== null && days >= 0 ? `${prepGap}d prep gap` : 'Exam complete'} · {exam.time} · {exam.note ?? '100 marks / 3 hours'}</div>}
    </div>
  );
}
