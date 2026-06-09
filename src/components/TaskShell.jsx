import React from "react";

const guideItems = [
  ["Görev Amacı", "purpose"],
  ["Neden?", "why"],
  ["Nasıl?", "how"],
  ["Sonuç", "result"]
];

export default function TaskShell({ task, children }) {
  return (
    <article className="task-shell">
      <div className="task-heading">
        <p>{task.area}</p>
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
          <span>Aktif İşlem</span>
          <strong>{task.panelTitle}</strong>
        </div>
        {children}
      </div>
    </article>
  );
}
