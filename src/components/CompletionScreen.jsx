import React from "react";

export default function CompletionScreen({
  hintUsed,
  isFinal,
  onContinue,
  task,
  taskScore,
  totalScore
}) {
  return (
    <section className="completion-screen">
      <div className="completion-mark">✓</div>
      <p>VERİ DOĞRULANDI</p>
      <h2>{task.recoveredText}</h2>
      <div className="completion-grid">
        <div className="completion-stats">
          <span>Görev Puanı</span>
          <strong>{taskScore}</strong>
        </div>
        <div className="completion-stats">
          <span>İpucu Kullanımı</span>
          <strong>{hintUsed ? "Kullanıldı" : "Kullanılmadı"}</strong>
        </div>
        <div className="completion-stats">
          <span>Toplam Puan</span>
          <strong>{totalScore}</strong>
        </div>
      </div>
      <div className="completion-flag">
        <span>Doğrulanan veri</span>
        <strong>{task.flag}</strong>
      </div>
      {task.securityNote && (
        <div className="security-note">
          <span>Güvenlik Notu</span>
          <p>{task.securityNote}</p>
        </div>
      )}
      <button className="primary-button" onClick={onContinue} type="button">
        {isFinal ? "FİNAL EKRANINA GEÇ" : "SONRAKİ GÖREV DOSYASI"}
      </button>
    </section>
  );
}
