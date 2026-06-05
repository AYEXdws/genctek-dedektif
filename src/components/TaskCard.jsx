import React, { useEffect, useState } from "react";
import { isCorrectAnswer } from "../utils/normalize";
import { turkishAlphabet } from "../utils/crypto";
import LogExplorer from "./LogExplorer";

export default function TaskCard({ task, onComplete }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hintOpen, setHintOpen] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    setAnswer("");
    setFeedback("");
    setHintOpen(false);
    setCaptured(false);
  }, [task.id]);

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!isCorrectAnswer(task, answer)) {
      setFeedback("Kanıt doğrulanamadı. İpucunu tekrar incele.");
      return;
    }

    setCaptured(true);
    setFeedback("Kanıt doğrulandı. Veri parçası kurtarıldı.");
    window.setTimeout(() => onComplete(task.id), 1100);
  };

  return (
    <article className="task-card">
      <div className="task-header">
        <p>{task.area}</p>
        <h2>{task.title}</h2>
      </div>
      <p className="task-description">{task.description}</p>

      {task.encryptedText && (
        <div className="evidence-box">
          <small>{turkishAlphabet.join(" ")}</small>
          <span>{task.encryptedLabel}</span>
          <strong>{task.encryptedText}</strong>
        </div>
      )}

      {task.answerType === "source" && <LogExplorer />}

      {task.profile && (
        <div className="profile-card">
          {Object.entries(task.profile).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <p>Örnek format: Gezegen_42</p>
        </div>
      )}

      {task.commands && (
        <div className="robot-panel">
          <div className="grid-map" aria-label="Robot görev haritası">
            <span className="robot">R</span>
            <span className="path p1" />
            <span className="path p2" />
            <span className="core">Çekirdek</span>
          </div>
          <ol className="command-list">
            {task.commands.map((command, index) => (
              <li key={`${command}-${index}`}>
                <span>{index + 1}</span>
                {command}
              </li>
            ))}
          </ol>
        </div>
      )}

      <button
        className="hint-button"
        onClick={() => setHintOpen((current) => !current)}
        type="button"
      >
        İpucu
      </button>
      {hintOpen && <p className="hint-text">{task.hint}</p>}

      <form className="answer-form" onSubmit={submitAnswer}>
        <label htmlFor={`answer-${task.id}`}>Cevap</label>
        <input
          id={`answer-${task.id}`}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={task.placeholder}
          value={answer}
        />
        <button className="primary-button" disabled={captured} type="submit">
          KANITI DOĞRULA
        </button>
      </form>

      {feedback && (
        <div className={captured ? "feedback success" : "feedback"}>
          <p>{feedback}</p>
          {captured && (
            <>
              <strong>KANIT DOĞRULANDI</strong>
              <strong>{task.recoveredText}</strong>
              <span>{task.flag}</span>
              <em>FLAG CAPTURED</em>
              <small>Sonraki göreve geçiliyor...</small>
            </>
          )}
        </div>
      )}
    </article>
  );
}
