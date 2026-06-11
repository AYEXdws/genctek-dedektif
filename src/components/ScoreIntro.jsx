import React from "react";
import { SCORE_CONFIG } from "../data/scoring";
import { story } from "../data/story";

export default function ScoreIntro({ onContinue }) {
  return (
    <section className="score-intro">
      <div className="score-card">
        <span className="screen-kicker">Operasyon Brifingi</span>
        <h2>{story.scoring.title}</h2>
        <div className="score-total">
          <strong>{SCORE_CONFIG.total}</strong>
          <span>Toplam Puan</span>
        </div>
        <div className="score-rules">
          {story.scoring.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <button className="primary-button" onClick={onContinue} type="button">
          {story.scoring.action}
        </button>
      </div>
    </section>
  );
}
