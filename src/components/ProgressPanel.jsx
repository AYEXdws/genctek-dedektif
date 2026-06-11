import React from "react";

export default function ProgressPanel({
  activeArea,
  activeTaskIndex,
  completedCount,
  currentTaskScore,
  hintUsed,
  onGoToTask,
  totalScore
}) {
  const canGoBack = activeTaskIndex > 0;

  return (
    <header className="progress-panel">
      <div className="task-nav">
        <button disabled={!canGoBack} onClick={() => onGoToTask(activeTaskIndex - 1)} type="button">
          Geri Git
        </button>
        <button disabled={activeTaskIndex === 0} onClick={() => onGoToTask(0)} type="button">
          İlk Göreve Git
        </button>
      </div>

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
          <button
            aria-label={`Görev ${index + 1} dosyasına git`}
            className={
              index === activeTaskIndex
                ? "current"
                : index < completedCount
                  ? "complete"
                  : ""
            }
            disabled={index > activeTaskIndex && index >= completedCount}
            key={index}
            onClick={() => onGoToTask(index)}
            type="button"
          />
        ))}
      </div>
    </header>
  );
}
