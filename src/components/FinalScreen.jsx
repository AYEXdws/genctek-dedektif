import React, { useEffect, useState } from "react";
import { story } from "../data/story";
import { taskAreas } from "../data/tasks";

export default function FinalScreen({ children, onCreateIdentity }) {
  const [progress, setProgress] = useState(25);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const values = [25, 50, 75, 100];
    const timers = values.map((value, index) =>
      window.setTimeout(() => {
        setProgress(value);
        if (value === 100) setReady(true);
      }, index * 620)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section className="final-screen">
      <div className="final-core">
        <p>{story.final.loadingText}</p>
        <h2>{story.final.loadingTitle}</h2>
        <div className="restore-meter">
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>%{progress}</strong>
      </div>

      {ready && (
        <div className="final-ready">
          <h2>{story.final.completeTitle}</h2>
          <p>{story.final.completeText}</p>
          <ul>
            {taskAreas.map((area) => (
              <li key={area}>✓ {area}</li>
            ))}
          </ul>
          {children || (
            <button
              className="primary-button"
              onClick={onCreateIdentity}
              type="button"
            >
              {story.final.action}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
