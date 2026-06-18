import React, { useState } from "react";
import { MAIL_ROUTE, MAIL_TRACE_PHRASE } from "../data/chain";
import { isCorrectTracePhrase } from "../utils/normalize";

export default function IdentityTraceTask({ onBack, onSolved }) {
  const [mailTrace, setMailTrace] = useState("");
  const [feedback, setFeedback] = useState("");

  const openMail = () => {
    window.open(MAIL_ROUTE, "_blank", "noopener,noreferrer");
  };

  const submitTrace = (event) => {
    event.preventDefault();

    if (!isCorrectTracePhrase(mailTrace, MAIL_TRACE_PHRASE)) {
      setFeedback("İz doğrulanamadı. Postadaki doğru mesajı tekrar incele.");
      return;
    }

    setFeedback("");
    onSolved();
  };

  return (
    <section className="chain-home task-chain-stage">
      <div className="chain-card identity-trace-card">
        <div className="chain-card-heading">
          <span>GÖREV 3 / Kimlik İzleri</span>
          <h1>KİMLİK İZLERİ</h1>
        </div>

        <div className="trace-copy">
          <p>
            Satırların arasından gelen cümle artık ekrandan dışarı bakmanı
            istiyor, Dedektif.
          </p>
          <p>
            Kalabalıkta birbirine benzeyen kartlar olacak. İp yalnızca bir
            ayrıntı gibi durur; ama doğru dosya bazen en sessiz işaretle kendini
            belli eder.
          </p>
          <p>
            Doğru kimliği bulduğunda acele etme. Üzerindeki her bilgi kapıyı
            açmaz; bazıları sadece dikkatini ölçer. Gerekli izleri bir araya
            getir ve posta kapısında dene.
          </p>
        </div>

        <button className="secondary-button trace-action-button" onClick={openMail} type="button">
          Posta Kapısını Aç
        </button>

        <form className="chain-form" onSubmit={submitTrace}>
          <label htmlFor="mail-trace">Bulduğun kapı adını yaz:</label>
          <input
            autoComplete="off"
            id="mail-trace"
            maxLength={96}
            onChange={(event) => setMailTrace(event.target.value)}
            placeholder="Kapı adı"
            value={mailTrace}
          />
          <button className="primary-button" type="submit">
            İZİ DOĞRULA
          </button>
        </form>

        {feedback && <p className="form-error">{feedback}</p>}

        <button className="secondary-button" onClick={onBack} type="button">
          Görünmeyen Yüze Dön
        </button>
      </div>
    </section>
  );
}
