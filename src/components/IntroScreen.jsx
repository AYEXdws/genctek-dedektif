import React from "react";
import { story } from "../data/story";
import heroImage from "../assets/hero.png";

export default function IntroScreen({ onStart }) {
  return (
    <section className="intro-screen">
      <div className="intro-panel">
        <div className="system-visual" aria-hidden="true">
          <div className="data-ring">
            <img src={heroImage} alt="" />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="system-lines" />
        </div>

        <div className="intro-copy">
          <p className="eyebrow">{story.intro.eyebrow}</p>
          <h1>{story.intro.title}</h1>
          <h2>{story.intro.subtitle}</h2>
          <p>{story.intro.description}</p>
        </div>

        <div className="intro-status">
          {story.intro.status.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <button className="primary-button" onClick={onStart} type="button">
          OPERASYONU BAŞLAT
        </button>
      </div>
    </section>
  );
}
