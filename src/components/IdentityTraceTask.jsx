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
            Satırların arasından süzülen mesaj, artık ekrandan dışarı bakmanı
            istiyor, Dedektif.
          </p>
          <p>
            Sıradaki hedefin, sistem yöneticisine ait personel kimlik kartını
            bulmak. Kalabalığın içinde birbirine benzeyen pek çok kart var.
            Sadece 'kırmızı ipi' hatırla; doğru olana giden rehberin o olacak.
          </p>
          <p>
            Kartı bulduğunda asıl görev başlıyor.
          </p>
          <p>
            Güvenlik raporlarına göre, bu yönetici parola oluştururken
            'kolaylık' tuzağına düşmüş ve doğrudan kişisel bilgilerini
            kullanmış.
          </p>
          <p>
            Şimdi elindeki kimlik kartını dikkatlice incele. Karttaki verilerden
            yola çıkarak yöneticinin e-posta parolasını tahmin et, e-postalarında
            gizlenmiş notu bul ve sisteme sız. Zaman işliyor.
          </p>
        </div>

        <button className="secondary-button trace-action-button" onClick={openMail} type="button">
          E-postaya Git
        </button>

        <form className="chain-form" onSubmit={submitTrace}>
          <label htmlFor="mail-trace">E-postada bulduğun notu yaz:</label>
          <input
            autoComplete="off"
            id="mail-trace"
            maxLength={96}
            onChange={(event) => setMailTrace(event.target.value)}
            placeholder="E-postada gizlenmiş not"
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
