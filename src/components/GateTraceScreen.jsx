import React, { useState } from "react";
import { SOURCE_TRACE_PHRASE } from "../data/chain";
import { isCorrectTracePhrase } from "../utils/normalize";

export default function GateTraceScreen({ onBack, onSolved }) {
  const [trace, setTrace] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitTrace = (event) => {
    event.preventDefault();

    if (!isCorrectTracePhrase(trace, SOURCE_TRACE_PHRASE)) {
      setFeedback("İz doğrulanamadı. Görünmeyen yüzün satırlarını tekrar incele.");
      return;
    }

    setFeedback("");
    onSolved();
  };

  return (
    <section className="chain-home task-chain-stage">
      <div className="chain-card trace-card">
        <div className="chain-card-heading">
          <span>GÖREV 2 / Görünmeyen Yüz</span>
          <h1>GÖRÜNMEYEN YÜZ</h1>
        </div>

        <div className="trace-copy">
          <p>
            Harflerin arasından çıkan kelime artık sadece bir cevap değil,
            Dedektif. O kelime, bu sitenin görünür yüzüne eklenmeyi bekleyen
            sessiz bir oda adı gibi davranır.
          </p>
          <p>
            Doğru odaya ulaştığında ekranda çok şey görmeyeceksin. Çünkü bu
            defa aradığın işaret sayfanın vitrininde değil, onu ayakta tutan
            satırların arasında bekler.
          </p>
          <p className="subtle-clue">
            Bulduğun küçük cümleyi aynen geri getir. Kırmızı Mühür, yalnızca
            geri getirdiğin izi tanır.
          </p>
        </div>

        <form className="chain-form" onSubmit={submitTrace}>
          <label htmlFor="source-trace">Bulduğun kapı adını yaz:</label>
          <input
            autoComplete="off"
            id="source-trace"
            maxLength={96}
            onChange={(event) => setTrace(event.target.value)}
            placeholder="Kapı adı"
            value={trace}
          />
          <button className="primary-button" type="submit">
            İZİ DOĞRULA
          </button>
        </form>

        {feedback && <p className="form-error">{feedback}</p>}

        <button className="secondary-button" onClick={onBack} type="button">
          Antik Şifreye Dön
        </button>
      </div>
    </section>
  );
}
