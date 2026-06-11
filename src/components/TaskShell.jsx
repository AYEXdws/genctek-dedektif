import React from "react";

export default function TaskShell({ children, onBackToBriefing, task }) {
  return (
    <article className="task-shell">
      <div className="task-heading">
        <div className="task-topline">
          <p>{task.area}</p>
          <button className="back-button" onClick={onBackToBriefing} type="button">
            GÖREV DOSYASINA DÖN
          </button>
        </div>
        <h2>{task.title}</h2>
        <span>{task.objective}</span>
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
