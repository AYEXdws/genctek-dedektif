import { DETECTIVE_RANKS, SCORE_CONFIG } from "../data/scoring";

export function getTaskScore(hintUsed) {
  return SCORE_CONFIG.perTask - (hintUsed ? SCORE_CONFIG.hintPenalty : 0);
}

export function getTotalScore(taskScores = {}) {
  return Object.values(taskScores).reduce((total, score) => total + score, 0);
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
