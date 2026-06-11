import React, { useEffect, useState } from "react";
import { isCorrectAnswer } from "../utils/normalize";
import { turkishAlphabet } from "../utils/crypto";
import AlgorithmSimulator from "./AlgorithmSimulator";
import EvidenceBoard from "./EvidenceBoard";
import LogExplorer from "./LogExplorer";
import TaskShell from "./TaskShell";

export default function TaskCard({ canGoBack = false, onBack, task, onSolved }) {
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
      setFeedback("Veri doğrulanamadı. İpucunu tekrar incele.");
      return;
    }

    setCaptured(true);
    setFeedback("Veri doğrulandı. Veri parçası kurtarıldı.");
    window.setTimeout(() => onSolved(task.id), 650);
  };

  return (
    <TaskShell canGoBack={canGoBack} onBack={onBack} task={task}>
      {task.encryptedText && (
        <div className="crypto-panel">
          <div>
            <span>Türk alfabesi</span>
            <strong>{turkishAlphabet.join(" ")}</strong>
          </div>
          <div>
            <span>{task.encryptedLabel}</span>
            <strong className="cipher-text">{task.encryptedText}</strong>
          </div>
          <div>
            <span>Yöntem</span>
            <strong>{task.shiftText}</strong>
          </div>
        </div>
      )}

      {task.answerType === "source" && <LogExplorer />}

      {task.profile && (
        <EvidenceBoard
          exampleFormat={task.exampleFormat}
          profile={task.profile}
        />
      )}

      {task.commands && (
        <AlgorithmSimulator commands={task.commands} onSelectStep={setAnswer} />
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
        <label htmlFor={`answer-${task.id}`}>Veri doğrulama alanı</label>
        <input
          autoComplete="off"
          id={`answer-${task.id}`}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={task.placeholder}
          value={answer}
        />
        <button className="primary-button" disabled={captured} type="submit">
          VERİYİ DOĞRULA
        </button>
      </form>

      {feedback && (
        <div className={captured ? "feedback success" : "feedback"}>
          <p>{feedback}</p>
          {captured && <small>Başarı ekranı hazırlanıyor...</small>}
        </div>
      )}
    </TaskShell>
  );
}
