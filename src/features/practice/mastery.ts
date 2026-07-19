export type MasteryGrade = 0 | 1 | 2 | 3;
export type MasteryEvidence = {
  correctCount: number;
  incorrectCount: number;
  correctStreak: number;
  failureStreak: number;
  currentGrade: MasteryGrade;
  manualGrade: MasteryGrade | null;
};

export const masteryLevels: { grade: MasteryGrade; label: string; note: string }[] = [
  { grade: 0, label: 'Baru', note: 'Belum ada bukti latihan' },
  { grade: 1, label: 'Dipelajari', note: 'Sedang membangun ingatan' },
  { grade: 2, label: 'Familiar', note: 'Mulai dikenali dengan stabil' },
  { grade: 3, label: 'Dikuasai', note: 'Bukti ingatan sudah kuat' },
];

export function evidenceGrade(correctCount: number, incorrectCount: number, correctStreak: number, failureStreak = 0): MasteryGrade {
  const attempts = correctCount + incorrectCount;
  const score = attempts ? Math.round(correctCount / attempts * 100) : 0;
  if (failureStreak >= 5) return 1;
  if (failureStreak >= 3) return 2;
  if (attempts >= 8 && correctStreak >= 5 && score >= 85) return 3;
  if (attempts >= 4 && score >= 70) return 2;
  return attempts > 0 ? 1 : 0;
}

/** Game outcomes are evidence, not a required review schedule.
 * A manual grade applies immediately, but repeated current failures release it.
 */
export function calculateMastery(evidence: MasteryEvidence, isCorrect: boolean) {
  const correctCount = evidence.correctCount + Number(isCorrect);
  const incorrectCount = evidence.incorrectCount + Number(!isCorrect);
  const correctStreak = isCorrect ? evidence.correctStreak + 1 : 0;
  const failureStreak = isCorrect ? 0 : evidence.failureStreak + 1;
  const attempts = correctCount + incorrectCount;
  const masteryScore = attempts ? Math.round(correctCount / attempts * 100) : 0;
  let manualGrade = evidence.manualGrade;
  if (failureStreak >= 3) manualGrade = null;
  const statisticalGrade = evidenceGrade(correctCount, incorrectCount, correctStreak);
  let automaticGrade = Math.max(evidence.currentGrade, statisticalGrade) as MasteryGrade;
  if (failureStreak >= 5) automaticGrade = 1;
  else if (failureStreak >= 3) automaticGrade = Math.min(automaticGrade, 2) as MasteryGrade;
  const grade = (manualGrade ?? automaticGrade) as MasteryGrade;
  return { correctCount, incorrectCount, correctStreak, failureStreak, masteryScore, grade, manualGrade, manuallyMastered: manualGrade === 3 };
}

export function masteryReason(state: { grade: number; manualGrade: number | null; correctCount: number; incorrectCount: number; correctStreak: number; failureStreak: number }) {
  if (state.manualGrade !== null) return `Dipilih manual sebagai ${masteryLevels[state.manualGrade as MasteryGrade]?.label ?? 'status ini'}.`;
  const attempts = state.correctCount + state.incorrectCount;
  if (!attempts) return 'Belum ada hasil game. Mulai latihan atau pilih status secara manual.';
  if (state.failureStreak >= 5) return `${state.failureStreak} kegagalan beruntun menurunkan status ke Dipelajari.`;
  if (state.failureStreak >= 3) return `${state.failureStreak} kegagalan beruntun membatasi status ke Familiar.`;
  if (state.grade === 3) return 'Minimal 8 percobaan, streak 5, dan akurasi 85% tercapai.';
  if (state.grade === 2) return 'Minimal 4 percobaan dan akurasi 70% tercapai.';
  return 'Sudah memiliki bukti latihan, tetapi belum cukup stabil untuk Familiar.';
}
