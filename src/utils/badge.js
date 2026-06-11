export function createBadgeId() {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `GT-2026-${number}`;
}

export function createBadgePayload(name, badgeId, summary = {}) {
  return {
    name,
    badgeId,
    event: "GençTek Dijital Dedektifler",
    operation: "Kırmızı Mühür Operasyonu",
    location: "Amasya",
    date: "19 Haziran 2026",
    totalScore: summary.totalScore ?? 0,
    detectiveRank: summary.detectiveRank ?? "Aday Dedektif",
    hintCount: summary.hintCount ?? 0,
    verificationUrl: `https://genctek.org/dedektif/${badgeId}`,
    completedAreas: [
      "Kriptografi",
      "Kaynak Katmanı",
      "Kimlik İzleri",
      "Fiziksel Veri / Üretim ve Tasarım"
    ]
  };
}
