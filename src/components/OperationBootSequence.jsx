import React, { useEffect, useMemo, useState } from "react";
import { genctekLogoMark } from "../assets/logos";

const stages = [
  {
    key: "wake",
    kicker: "Aşama 01",
    title: "GENÇTEK GÖREV SİSTEMİ",
    subtitle: "Bağlantı kuruluyor...",
    lines: [
      "görev oturumu hazırlanıyor",
      "arşiv bağlantısı kontrol ediliyor",
      "kırmızı mühür durumu okunuyor"
    ],
    duration: 1800
  },
  {
    key: "seal",
    kicker: "Aşama 02",
    title: "KIRMIZI MÜHÜR",
    subtitle: "Bütünlük kaybı tespit edildi.",
    lines: [
      "Kripto Katmanı",
      "Görünmeyen Katman",
      "Kimlik İzleri",
      "Fiziksel Veri"
    ],
    duration: 2100
  },
  {
    key: "detective",
    kicker: "Aşama 03",
    title: "DİJİTAL DEDEKTİF OTURUMU",
    subtitle: "Aktif ediliyor...",
    lines: [
      "Yetki Seviyesi: Görev Katılımcısı",
      "Puan Sistemi: Aktif",
      "Toplam Puan: 1000",
      "Dedektif Notu Bedeli: -90"
    ],
    duration: 2100
  },
  {
    key: "ready",
    kicker: "Aşama 04",
    title: "OPERASYON DOSYASI HAZIR",
    subtitle: "Kırmızı Mühür'ü yeniden oluşturmak için dört görevi tamamla.",
    lines: [
      "operasyon rotası oluşturuldu",
      "görev dosyaları hazır",
      "dedektif protokolü aktif"
    ],
    duration: 1800
  }
];

export default function OperationBootSequence({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);
  const activeStage = stages[stageIndex];
  const isReady = stageIndex === stages.length - 1;

  const litSegments = useMemo(() => {
    if (activeStage.key === "seal") return activeStage.lines.length;
    if (activeStage.key === "ready") return 4;
    return Math.min(stageIndex + 1, 4);
  }, [activeStage, stageIndex]);

  useEffect(() => {
    if (isReady) {
      const finalTimer = window.setTimeout(onComplete, activeStage.duration);
      return () => window.clearTimeout(finalTimer);
    }

    const timer = window.setTimeout(() => {
      setStageIndex((current) => Math.min(current + 1, stages.length - 1));
    }, activeStage.duration);

    return () => window.clearTimeout(timer);
  }, [activeStage.duration, activeStage.key, isReady, onComplete]);

  return (
    <section className="boot-screen" aria-live="polite">
      <button className="boot-skip" onClick={onComplete} type="button">
        Geç
      </button>

      <div className={`boot-panel boot-stage-${activeStage.key}`}>
        <div className="boot-visual" aria-hidden="true">
          <div className="boot-seal" style={{ "--lit-segments": litSegments }}>
            <img alt="" src={genctekLogoMark} />
            {[0, 1, 2, 3].map((segment) => (
              <span
                className={segment < litSegments ? "active" : ""}
                key={segment}
              />
            ))}
          </div>
        </div>

        <div className="boot-copy">
          <span className="screen-kicker">{activeStage.kicker}</span>
          <h2>{activeStage.title}</h2>
          <p>{activeStage.subtitle}</p>
        </div>

        <div className="boot-lines">
          {activeStage.lines.map((line, index) => (
            <div key={line} style={{ "--line-index": index }}>
              <span />
              <strong>{line}</strong>
            </div>
          ))}
        </div>

        {isReady && (
          <button className="primary-button" onClick={onComplete} type="button">
            GÖREV DOSYALARINI AÇ
          </button>
        )}
      </div>
    </section>
  );
}
