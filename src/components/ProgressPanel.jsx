import React from "react";

export default function ProgressPanel({
  activeArea,
  activeTaskIndex,
  completedCount,
  currentTaskScore,
  hintUsed,
  totalScore
}) {
  return (
    <header className="progress-panel">
      <div className="progress-copy">
        <div>
          <span>Dijital Dedektif</span>
          <strong>Aktif</strong>
        </div>
        <div>
          <span>Görev</span>
          <strong>{activeTaskIndex + 1}/4</strong>
        </div>
        <div>
          <span>Alan</span>
          <strong>{activeArea}</strong>
        </div>
        <div>
          <span>Görev Puanı</span>
          <strong>{currentTaskScore}</strong>
        </div>
        <div>
          <span>Toplam Puan</span>
          <strong>{totalScore}</strong>
        </div>
        <div>
          <span>İpucu</span>
          <strong>{hintUsed ? "Kullanıldı" : "Kullanılmadı"}</strong>
        </div>
        <div>
          <span>Kırmızı Mühür</span>
          <strong>{completedCount}/4</strong>
        </div>
      </div>

      <div className="segment-track" aria-label={`${completedCount}/4 mühür parçası`}>
        {[0, 1, 2, 3].map((index) => (
          <span
            className={
              index < completedCount
                ? "complete"
                : index === completedCount
                  ? "current"
                  : ""
            }
            key={index}
          />
        ))}
      </div>
    </header>
  );
}
