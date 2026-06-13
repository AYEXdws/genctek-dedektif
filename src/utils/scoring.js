import { DETECTIVE_RANKS, SCORE_CONFIG } from "../data/scoring";

export function getTaskScore(hintUsed) {
  return SCORE_CONFIG.perTask - (hintUsed ? SCORE_CONFIG.hintPenalty : 0);
}

export function getTotalScore(taskScores = {}, validTaskIds = []) {
  const ids = validTaskIds.length ? validTaskIds : Object.keys(taskScores);

  return ids.reduce((total, taskId) => {
    const score = Number(taskScores[taskId]);
    if (!Number.isFinite(score)) return total;

    const safeScore = Math.max(0, Math.min(score, SCORE_CONFIG.perTask));
    return total + safeScore;
  }, 0);
}

export function getDetectiveRank(score) {
  return (
    DETECTIVE_RANKS.find((rank) => score >= rank.min)?.title ||
    DETECTIVE_RANKS[DETECTIVE_RANKS.length - 1].title
  );
}

export function getHintCount(hintUsage = {}) {
  return Object.values(hintUsage).filter(Boolean).length;
}
