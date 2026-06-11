import React, { useEffect, useState } from "react";
import { story } from "../data/story";
import { taskAreas } from "../data/tasks";

export default function FinalScreen({
  detectiveRank,
  hintCount,
  onCreateIdentity,
  totalScore
}) {
  const [progress, setProgress] = useState(25);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const values = [25, 50, 75, 100];
    const timers = values.map((value, index) =>
      window.setTimeout(() => {
        setProgress(value);
        if (value === 100) setReady(true);
      }, index * 620)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section className="final-screen">
      <div className="final-core">
        <p>{story.final.loadingText}</p>
        <h2>{story.final.loadingTitle}</h2>
        <div className="seal-build" aria-hidden="true">
          <span style={{ "--seal-progress": `${progress}%` }} />
          <strong>%{progress}</strong>
        </div>
      </div>

      {ready && (
        <div className="final-ready">
          <h2>{story.final.completeTitle}</h2>
          <p>{story.final.completeText}</p>
          <div className="final-score-grid">
            <div>
              <span>Toplam Puan</span>
              <strong>{totalScore} / 1000</strong>
            </div>
            <div>
              <span>Dedektif Derecesi</span>
              <strong>{detectiveRank}</strong>
            </div>
            <div>
              <span>İpucu Kullanımı</span>
              <strong>{hintCount} / 4</strong>
            </div>
            <div>
              <span>Tamamlanan Görevler</span>
              <strong>4 / 4</strong>
            </div>
          </div>
          <ul>
            {taskAreas.map((area) => (
              <li key={area}>✓ {area}</li>
            ))}
          </ul>
          <button
            className="primary-button"
            onClick={onCreateIdentity}
            type="button"
          >
            {story.final.action}
          </button>
        </div>
      )}
    </section>
  );
}
