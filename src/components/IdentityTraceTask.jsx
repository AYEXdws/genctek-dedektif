import React, { useState } from "react";
import MissionFile from "./MissionFile";
import { MAIL_ROUTE, MAIL_TRACE_PHRASE, missionFiles } from "../data/chain";
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
      setFeedback("İz doğrulanamadı. İç postadaki doğru mesajı tekrar incele.");
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
          <h1>KIRMIZI İPLİ KART</h1>
        </div>

        <MissionFile file={missionFiles.identity} />

        <div className="trace-copy">
          <p>Tebrikler Dedektif!</p>
          <p>
            Yaptığın araştırmalar sonucunda sistem yöneticisine ait personel
            kimlik kartına ulaştın. Ancak görev henüz tamamlanmadı...
          </p>
          <p>
            Dijital güvenlik ekibinin hazırladığı raporlara göre bu personel,
            güvenlik eğitimlerini yeterince ciddiye almamış ve kişisel
            bilgilerini parola oluştururken kullanmış olabilir.
          </p>
          <p>Önündeki kimlik kartını dikkatlice incele.</p>
          <p>
            Kimlik kartındaki bilgilerden yararlanarak sistem yöneticisinin
            e-posta hesabında kullandığı parolayı tahmin et.
          </p>
        </div>

        <button className="secondary-button trace-action-button" onClick={openMail} type="button">
          İç Posta Kapısını Aç
        </button>

        <form className="chain-form" onSubmit={submitTrace}>
          <label htmlFor="mail-trace">İç postada bulduğun son izi yaz:</label>
          <input
            autoComplete="off"
            id="mail-trace"
            maxLength={96}
            onChange={(event) => setMailTrace(event.target.value)}
            placeholder="Maildeki kısa iz cümlesi"
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
