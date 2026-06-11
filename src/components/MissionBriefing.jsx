import React from "react";

export default function MissionBriefing({ completedCount, onStartTask, task }) {
  return (
    <section className="mission-briefing">
      <article className={`briefing-card briefing-card-${task.type}`}>
        <div className="briefing-visual" aria-hidden="true">
          <div className="briefing-orbit">
            <span />
            <span />
            <span />
          </div>
          {task.type === "crypto" && (
            <div className="briefing-art crypto-art">
              <b>A</b>
              <b>Ç</b>
              <b>Ğ</b>
              <b>?</b>
            </div>
          )}
          {task.type === "source" && (
            <div className="briefing-art source-art">
              <b>system.log</b>
              <b>archive.cache</b>
              <b>source.layer</b>
            </div>
          )}
          {task.type === "identity" && (
            <div className="briefing-art identity-art">
              <b>GT</b>
              <span />
              <span />
            </div>
          )}
          {task.type === "physical" && (
            <div className="briefing-art physical-art">
              <b />
              <span />
            </div>
          )}
        </div>
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
