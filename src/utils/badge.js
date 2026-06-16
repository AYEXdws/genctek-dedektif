import { certificateDetails } from "../data/chain";

export function createBadgeId() {
  const existingId = localStorage.getItem("genctek-usta-belge-id");
  if (existingId) return existingId;

  const id = `GT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  localStorage.setItem("genctek-usta-belge-id", id);
  return id;
}

export function createBadgePayload(name, badgeId = createBadgeId()) {
  return {
    id: badgeId,
    name,
    event: certificateDetails.event,
    operation: certificateDetails.operation,
    location: certificateDetails.location,
    date: certificateDetails.date,
    completedAreas: certificateDetails.completedTracks
  };
}
