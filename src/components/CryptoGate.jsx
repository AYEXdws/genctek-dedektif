import React, { useState } from "react";
import MissionFile from "./MissionFile";
import { GATE_WORD, missionFiles } from "../data/chain";
import { caesarEncrypt, turkishAlphabet } from "../utils/crypto";
import { isCorrectGateWord } from "../utils/normalize";

const encryptedGateWord = caesarEncrypt(GATE_WORD, 3);

export default function CryptoGate({ onSolved }) {
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

      <MissionFile file={missionFiles.crypto} />

      <div className="chain-copy">
        <p>Güvenli iletişim, bilginin en büyük kalkanıdır Dedektif.</p>
        <p>
          Kırmızı Mühür dosyasından kopan ilk iz, harfleri yer değiştirilmiş
          sessiz bir kelime olarak önümüze düştü. Kelime anlamsız görünür; ama
          her harf hâlâ kendi alfabesinin içinde nefes alır.
        </p>
        <p>
          Bu kilidi açtığında bir bayrak değil, sonraki kapının adını bulacaksın.
          Kapı ekranda belirmez; doğru kelimeyi bulan dedektif, izini nereye
          taşıyacağını da zamanla fark eder.
        </p>
      </div>

      <div className="cipher-panel">
        <span>Şifreli kelime</span>
        <strong>{encryptedGateWord}</strong>
        <small>Türk alfabesi düzeni kullanıldı.</small>
      </div>

      <div className="alphabet-panel" aria-label="Türk alfabesi">
        {turkishAlphabet.map((letter) => (
          <span key={letter}>{letter}</span>
        ))}
      </div>

      <form className="chain-form" onSubmit={submitAnswer}>
        <label htmlFor="gate-word">Çözdüğün kapı adını yaz:</label>
        <input
          autoComplete="off"
          id="gate-word"
          maxLength={32}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Kapı adı"
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
    </section>
  );
}
