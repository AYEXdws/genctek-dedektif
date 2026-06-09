import React from "react";

export default function ProgressPanel({ activeArea, completedCount, integrity }) {
  return (
    <header className="progress-panel">
      <div className="progress-copy">
        <div>
          <span>Dijital Dedektif</span>
          <strong>Aktif</strong>
        </div>
        <div>
          <span>Aktif Alan</span>
          <strong>{activeArea}</strong>
        </div>
        <div>
          <span>Veri Parçaları</span>
          <strong>{completedCount}/4</strong>
        </div>
        <div>
          <span>Arşiv Bütünlüğü</span>
          <strong>%{integrity}</strong>
        </div>
      </div>

      <div className="segment-track" aria-label={`${completedCount}/4 görev tamamlandı`}>
        {[0, 1, 2, 3].map((index) => (
          <span
            className={index < completedCount ? "complete" : index === completedCount ? "current" : ""}
            key={index}
          />
        ))}
      </div>
    </header>
  );
}
