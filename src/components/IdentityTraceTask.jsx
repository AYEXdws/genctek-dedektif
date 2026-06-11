import React, { useState } from "react";

export default function IdentityTraceTask({ task }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = task.identityCards[activeIndex];

  return (
    <div className="identity-task">
      <div className="identity-tabs">
        {task.identityCards.map((card, index) => (
          <button
            className={activeIndex === index ? "active" : ""}
            key={card.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            {card.title}
          </button>
        ))}
      </div>

      <section className="identity-card">
        <span>Simüle Görev Kimliği</span>
        <h3>{activeCard.title}</h3>
        {activeCard.lines && (
          <dl>
            {activeCard.lines.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {activeCard.text && <p>{activeCard.text}</p>}
      </section>
    </div>
  );
}
