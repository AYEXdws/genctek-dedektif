import React, { useState } from "react";
import { hiddenPagePath, GATE_WORD } from "../data/chain";
import { caesarEncrypt } from "../utils/crypto";
import { isCorrectGateWord } from "../utils/normalize";

const encryptedGateWord = caesarEncrypt(GATE_WORD, 3);

export default function CryptoGate({ onSolved, solved }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hintOpen, setHintOpen] = useState(false);

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!isCorrectGateWord(answer)) {
      setFeedback("İz doğrulanamadı. Harflerin yer değiştirdiğini tekrar düşün.");
      return;
    }

    setFeedback("");
    onSolved();
  };

  return (
    <section className="chain-card crypto-gate" aria-label="Antik Şifre görevi">
      <div className="chain-card-heading">
        <span>GÖREV 1 / Kriptografi</span>
        <h1>ANTİK ŞİFRE</h1>
      </div>

      <div className="chain-copy">
        <p>Güvenli iletişim, bilginin en büyük kalkanıdır Dedektif.</p>
        <p>
          Elimize anlamsız harflerden oluşan şifreli bir kelime ulaştı. Bu kelime
          eski ama etkili bir yöntemle, Sezar Şifrelemesi ile gizlendi.
        </p>
        <p>
          Harfler alfabede yer değiştirdi. Bu kilidi açtığında bir bayrak değil,
          ikinci kapının adını bulacaksın.
        </p>
      </div>

      <div className="cipher-panel">
        <span>Şifreli kelime</span>
        <strong>{encryptedGateWord}</strong>
        <small>Türk alfabesi düzeni kullanıldı.</small>
      </div>

      {!solved && (
        <>
          <form className="chain-form" onSubmit={submitAnswer}>
            <label htmlFor="gate-word">Çözdüğün kapı adını yaz:</label>
            <input
              autoComplete="off"
              id="gate-word"
              maxLength={32}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="gorunmeyenyuz"
              value={answer}
            />
            <button className="primary-button" type="submit">
              İZİ DOĞRULA
            </button>
          </form>

          <button
            className="note-button"
            onClick={() => setHintOpen((current) => !current)}
            type="button"
          >
            Dedektif Notu Aç
          </button>

          {hintOpen && (
            <p className="detective-note">
              Harfler kaybolmadı Dedektif. Sadece sandığından üç adım daha
              geride duruyorlar.
            </p>
          )}

          {feedback && <p className="form-error">{feedback}</p>}
        </>
      )}

      {solved && (
        <div className="success-panel">
          <span>İZ DOĞRULANDI</span>
          <h2>İkinci kapının adı bulundu: {GATE_WORD}</h2>
          <p>Bulduğun kelimeyi sitenin adresinde kullan.</p>
          <code>{hiddenPagePath}</code>
          <p>
            Bu görev bilgisayar üzerinden daha rahat yapılır. Sayfa kaynağını
            incelemen gerekecek.
          </p>
          <a
            className="primary-button link-button"
            href={hiddenPagePath}
            rel="noopener noreferrer"
            target="_blank"
          >
            GÖRÜNMEYEN YÜZ SAYFASINI AÇ
          </a>
        </div>
      )}
    </section>
  );
}
