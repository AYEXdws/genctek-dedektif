import React from "react";

export default function ProgressPanel({ activeArea, completedCount, integrity }) {
  return (
    <header className="progress-panel">
      <div>
        <span>Dijital Dedektif</span>
        <strong>Aktif</strong>
      </div>
      <div>
        <span>Veri Parçaları</span>
        <strong>{completedCount}/4</strong>
      </div>
      <div>
        <span>Arşiv Bütünlüğü</span>
        <strong>%{integrity}</strong>
      </div>
      <div className="wide">
        <span>Aktif Alan</span>
        <strong>{activeArea}</strong>
      </div>
    </header>
  );
}
