import React, { useEffect, useState } from "react";
import { isCorrectAnswer } from "../utils/normalize";
import CryptoTask from "./CryptoTask";
import IdentityTraceTask from "./IdentityTraceTask";
import LayerScanner from "./LayerScanner";
import PhysicalTask from "./PhysicalTask";
import TaskShell from "./TaskShell";

const emptyAnswers = {
  email: "",
  taskKey: "",
  value: ""
};

export default function TaskCard({
  hintUsed,
  onBackToBriefing,
  onSolved,
  onUseHint,
  task
}) {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [feedback, setFeedback] = useState("");
  const [confirmHint, setConfirmHint] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    setAnswers(emptyAnswers);
    setFeedback("");
    setConfirmHint(false);
    setCaptured(false);
  }, [task.id]);

  const answerValue =
    task.type === "identity"
      ? { email: answers.email, taskKey: answers.taskKey }
      : answers.value;

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!isCorrectAnswer(task, answerValue)) {
      setFeedback("Veri doğrulanamadı. İpucunu tekrar incele.");
      return;
    }

    setCaptured(true);
    setFeedback("VERİ DOĞRULANDI. Mühür parçası kurtarıldı.");
    window.setTimeout(() => onSolved(task.id), 520);
  };

  const openHint = () => {
    if (hintUsed) return;
    setConfirmHint(true);
  };

  const confirmHintUse = () => {
    onUseHint(task.id);
    setConfirmHint(false);
  };

  return (
    <TaskShell onBackToBriefing={onBackToBriefing} task={task}>
      {task.type === "crypto" && <CryptoTask task={task} />}
      {task.type === "source" && <LayerScanner />}
      {task.type === "identity" && <IdentityTraceTask task={task} />}
      {task.type === "physical" && <PhysicalTask task={task} />}

      <div className="hint-zone">
        <button
          className="hint-button"
          disabled={hintUsed}
          onClick={openHint}
          type="button"
        >
          {hintUsed ? "Dedektif Notu Açıldı" : "Dedektif Notu Aç (-90 Puan)"}
        </button>
        {confirmHint && (
          <div className="hint-confirm">
            <p>
              Bu dedektif notunu açarsan görev puanından 90 puan düşülür.
              Devam etmek istiyor musun?
            </p>
            <div>
              <button className="secondary-button" onClick={confirmHintUse} type="button">
                NOTU AÇ
              </button>
              <button
                className="ghost-button"
                onClick={() => setConfirmHint(false)}
                type="button"
              >
                VAZGEÇ
              </button>
            </div>
          </div>
        )}
        {hintUsed && <p className="hint-text">{task.hint}</p>}
      </div>

      <form className="answer-form" onSubmit={submitAnswer}>
        {task.type === "identity" ? (
          <>
            <label htmlFor={`email-${task.id}`}>E-postası</label>
            <input
              autoComplete="off"
              id={`email-${task.id}`}
              onChange={(event) =>
                setAnswers((current) => ({
                  ...current,
                  email: event.target.value
                }))
              }
              placeholder="gorev@gorev.genctek"
              value={answers.email}
            />
            <label htmlFor={`key-${task.id}`}>Görev Şifresi</label>
            <input
              autoComplete="off"
              id={`key-${task.id}`}
              onChange={(event) =>
                setAnswers((current) => ({
                  ...current,
                  taskKey: event.target.value
                }))
              }
              placeholder="Görev şifresi"
              value={answers.taskKey}
            />
          </>
        ) : (
          <>
            <label htmlFor={`answer-${task.id}`}>Veri doğrulama alanı</label>
            <input
              autoComplete="off"
              id={`answer-${task.id}`}
              onChange={(event) =>
                setAnswers((current) => ({
                  ...current,
                  value: event.target.value
                }))
              }
              placeholder={task.placeholder}
              value={answers.value}
            />
          </>
        )}
        <button className="primary-button" disabled={captured} type="submit">
          {task.type === "identity" ? "KİMLİĞİ DOĞRULA" : "VERİYİ DOĞRULA"}
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
