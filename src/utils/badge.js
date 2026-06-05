export function createBadgeId() {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `GT-2026-${number}`;
}

export function createBadgePayload(name, badgeId) {
  return {
    name,
    badgeId,
    event: "GençTek Dijital Dedektifler",
    location: "Amasya",
    date: "19 Haziran 2026",
    verificationUrl: `https://genctek.org/dedektif/${badgeId}`,
    completedAreas: [
      "Kriptografi",
      "Kaynak Katmanı",
      "Dijital İz Analizi",
      "Algoritma ve Yazılım"
    ]
  };
}
