import React from "react";

export default function MissionBriefing({ completedCount, onStartTask, task }) {
  return (
    <section className="mission-briefing">
      <article className="briefing-card">
        <div className="briefing-stamp">DOSYA {task.number}</div>
        <span className="screen-kicker">{task.briefTitle}</span>
        <h2>{task.briefSubtitle}</h2>
        <div className="briefing-copy">
          {task.briefText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="briefing-lesson">
          <span>Bu görev sana şunu gösterir</span>
          <strong>{task.lesson}</strong>
        </div>
        <button className="primary-button" onClick={onStartTask} type="button">
          GÖREVİ AÇ
        </button>
        <small>{completedCount}/4 mühür parçası kurtarıldı.</small>
      </article>
    </section>
  );
}
