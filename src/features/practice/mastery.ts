export type MasteryEvidence = {
  correctCount: number;
  incorrectCount: number;
  correctStreak: number;
  currentGrade: 0 | 1 | 2 | 3;
  manuallyMastered: boolean;
};

/** Games provide evidence, not a rigid review schedule.
 * A manual mastered mark wins initially, but repeated failures can lower it.
 */
export function calculateMastery(evidence: MasteryEvidence, isCorrect: boolean) {
  const correctCount = evidence.correctCount + Number(isCorrect);
  const incorrectCount = evidence.incorrectCount + Number(!isCorrect);
  const correctStreak = isCorrect ? evidence.correctStreak + 1 : 0;
  const attempts = correctCount + incorrectCount;
  const score = attempts ? Math.round((correctCount / attempts) * 100) : 0;

  let grade: 0 | 1 | 2 | 3 = evidence.currentGrade;
  let manuallyMastered = evidence.manuallyMastered;

  if (!isCorrect && grade === 3 && incorrectCount >= 3) {
    grade = 2;
    manuallyMastered = false;
  } else if (attempts >= 8 && correctStreak >= 5 && score >= 85) {
    grade = 3;
  } else if (attempts >= 4 && score >= 70 && grade < 2) {
    grade = 2;
  } else if (attempts > 0 && grade === 0) {
    grade = 1;
  }

  return { correctCount, incorrectCount, correctStreak, masteryScore: score, grade, manuallyMastered };
}
