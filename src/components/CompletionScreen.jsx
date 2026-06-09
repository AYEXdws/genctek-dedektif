import React from "react";

export default function CompletionScreen({
  completedCount,
  integrity,
  isFinal,
  onContinue,
  task
}) {
  return (
    <section className="completion-screen">
      <div className="completion-mark">✓</div>
      <p>Kanıt doğrulandı</p>
      <h2>{task.recoveredText}</h2>
      <div className="completion-stats">
        <span>Arşiv bütünlüğü güncellendi</span>
        <strong>%{integrity}</strong>
      </div>
      <div className="completion-flag">
        <span>Doğrulanan kanıt</span>
        <strong>{task.flag}</strong>
      </div>
      <button className="primary-button" onClick={onContinue} type="button">
        {isFinal ? "FİNAL EKRANINA GEÇ" : "SONRAKİ GÖREVE GEÇ"}
      </button>
      <small>{completedCount}/4 veri parçası kurtarıldı.</small>
    </section>
  );
}
