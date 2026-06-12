import React, { useEffect, useMemo, useState } from "react";
import { genctekLogoMark } from "../assets/logos";

const closeStages = [
  {
    key: "collect",
    kicker: "Kapanış 01",
    title: "MÜHÜR PARÇALARI TOPLANIYOR",
    subtitle: "Dört görevden gelen veri parçaları hizalanıyor.",
    lines: ["Kripto verisi alındı", "Kaynak katmanı doğrulandı"],
    duration: 1900
  },
  {
    key: "align",
    kicker: "Kapanış 02",
    title: "KIRMIZI MÜHÜR HİZALANIYOR",
    subtitle: "Kimlik izleri ve fiziksel veri son halkaya bağlanıyor.",
    lines: ["Kimlik izleri eşleşti", "Fiziksel veri bağlandı"],
    duration: 2100
  },
  {
    key: "seal",
    kicker: "Kapanış 03",
    title: "OPERASYON KAPANIŞI",
    subtitle: "Kırmızı Mühür final doğrulamaya hazırlanıyor.",
    lines: ["Arşiv bütünlüğü: %100", "Final dosyası hazırlanıyor"],
    duration: 2100
  }
];

export default function OperationCloseSequence({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);
  const activeStage = closeStages[stageIndex];
  const isLastStage = stageIndex === closeStages.length - 1;

  const litSegments = useMemo(() => {
    if (activeStage.key === "collect") return 2;
    if (activeStage.key === "align") return 4;
    return 4;
  }, [activeStage.key]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isLastStage) {
        onComplete();
        return;
      }

      setStageIndex((current) => Math.min(current + 1, closeStages.length - 1));
    }, activeStage.duration);

    return () => window.clearTimeout(timer);
  }, [activeStage.duration, activeStage.key, isLastStage, onComplete]);

  return (
    <section className="boot-screen close-screen" aria-live="polite">
      <button className="boot-skip" onClick={onComplete} type="button">
        Geç
      </button>

      <div className={`boot-panel close-panel close-stage-${activeStage.key}`}>
        <div className="boot-visual" aria-hidden="true">
          <div className="boot-seal close-seal" style={{ "--lit-segments": litSegments }}>
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
      </div>
    </section>
  );
}
