import React from "react";
import cryptoBriefing from "../assets/brief-crypto.png";
import identityBriefing from "../assets/brief-identity.png";
import physicalBriefing from "../assets/brief-physical.png";
import sourceBriefing from "../assets/brief-source.png";

const briefingImages = {
  crypto: cryptoBriefing,
  identity: identityBriefing,
  physical: physicalBriefing,
  source: sourceBriefing
};

export default function MissionBriefing({ completedCount, onStartTask, task }) {
  return (
    <section className="mission-briefing">
      <article className={`briefing-card briefing-card-${task.type}`}>
        <div className="briefing-visual" aria-hidden="true">
          <img alt="" src={briefingImages[task.type]} />
          <span className="briefing-image-shine" />
        </div>
        <div className="briefing-stamp">DOSYA {task.number}</div>
        <span className="screen-kicker">{task.briefTitle}</span>
        <h2>{task.briefSubtitle}</h2>
        <div className="briefing-copy">
          {task.briefText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button className="primary-button" onClick={onStartTask} type="button">
          GÖREVİ AÇ
        </button>
        <small>{completedCount}/4 mühür parçası kurtarıldı.</small>
      </article>
    </section>
  );
}
