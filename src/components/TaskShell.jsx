import React from "react";

const guideItems = [
  ["Görev Amacı", "purpose"],
  ["Neden?", "why"],
  ["Nasıl?", "how"],
  ["Sonuç", "result"]
];

export default function TaskShell({ canGoBack = false, children, onBack, task }) {
  return (
    <article className="task-shell">
      <div className="task-heading">
        <div className="task-topline">
          <p>{task.area}</p>
          {canGoBack && (
            <button className="back-button" onClick={onBack} type="button">
              GERİ GİT
            </button>
          )}
        </div>
        <h2>{task.title}</h2>
        <span>{task.description}</span>
      </div>

      <div className="task-guide">
        {guideItems.map(([label, key]) => (
          <section key={key}>
            <span>{label}</span>
            <strong>{task.guide[key]}</strong>
          </section>
        ))}
      </div>

      <div className="operation-panel">
        <div className="operation-title">
          <span>Yapılması Gereken İşlem</span>
          <strong>{task.panelTitle}</strong>
        </div>
        {children}
      </div>
    </article>
  );
}
