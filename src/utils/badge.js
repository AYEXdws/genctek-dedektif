export function createBadgePayload(name, summary = {}) {
  return {
    name,
    event: "GençTek Dijital Dedektifler",
    operation: "Kırmızı Mühür Operasyonu",
    location: "Amasya",
    date: "19 Haziran 2026",
    totalScore: summary.totalScore ?? 0,
    detectiveRank: summary.detectiveRank ?? "Aday Dedektif",
    hintCount: summary.hintCount ?? 0,
    completedAreas: [
      "Kriptografi",
      "Kaynak Kod Analizi",
      "Kimlik İzleri",
      "Fiziksel Veri / Üretim ve Tasarım"
    ]
  };
}
