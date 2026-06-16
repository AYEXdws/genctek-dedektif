import React, { useEffect, useState } from "react";
import { mailboxMessage } from "../data/chain";
import { isCorrectMailCredentials } from "../utils/normalize";

const verificationLines = [
  "Kimlik izleri doğrulanıyor...",
  "Görev anahtarı kontrol ediliyor...",
  "İç iletişim paneli açılıyor..."
];

export default function MailPortal({
  authenticated,
  mailOpened,
  onAuthenticated,
  onMailOpened,
  onReset
}) {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!isVerifying) return undefined;

    const timeout = window.setTimeout(() => {
      setIsVerifying(false);
      onAuthenticated();
    }, 1700);

    return () => window.clearTimeout(timeout);
  }, [isVerifying, onAuthenticated]);

  const submitCredentials = (event) => {
    event.preventDefault();

    if (!isCorrectMailCredentials({ email, key })) {
      setError("Oturum doğrulanamadı. Karttaki izleri tekrar incele.");
      return;
    }

    setError("");
    setIsVerifying(true);
  };

  return (
    <main className="app-shell chain-shell">
      <button className="reset-button" onClick={onReset} type="button">
        Baştan Başla
      </button>

      <section className="chain-page mail-page">
        <div className="chain-card mail-brief">
          <span>GÖREV 3 / Yaka Kartı ve Kimlik İzleri</span>
          <h1>GENÇTEK İÇ İLETİŞİM PANELİ</h1>
          <p>Görev oturumunu doğrula.</p>
          <div className="chain-copy">
            <p>Bazı kapılar kodla değil, izlerle açılır Dedektif.</p>
            <p>
              Bir isim, bir tarih ve gökyüzüne ait bir merak... Tek başına masum
              görünen bilgiler, yan yana geldiğinde bir görev anahtarına
              dönüşebilir.
            </p>
            <p>Her bilgi iz değildir. Bazıları sadece dikkatini dağıtmak için oradadır.</p>
          </div>
        </div>

        {!authenticated && !isVerifying && (
          <form className="chain-card mail-login" onSubmit={submitCredentials}>
            <label htmlFor="mail-email">Görev E-postası:</label>
            <input
              autoComplete="off"
              id="mail-email"
              maxLength={80}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="gorev@gorev.genctek"
              value={email}
            />

            <label htmlFor="mail-key">Görev Anahtarı:</label>
            <input
              autoComplete="off"
              id="mail-key"
              maxLength={80}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Görev anahtarı"
              value={key}
            />

            {error && <p className="form-error">{error}</p>}

            <button className="primary-button" type="submit">
              OTURUMU DOĞRULA
            </button>
          </form>
        )}

        {isVerifying && (
          <section className="chain-card verification-panel" aria-live="polite">
            {verificationLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
        )}

        {authenticated && (
          <section className="chain-card inbox-panel">
            <div className="inbox-header">
              <div>
                <span>GELEN KUTUSU</span>
                <h2>1 yeni görev mesajı</h2>
              </div>
              <strong>gorev.genctek</strong>
            </div>

            <button
              className={`message-row ${mailOpened ? "read" : ""}`}
              onClick={onMailOpened}
              type="button"
            >
              <span>{mailboxMessage.from}</span>
              <strong>{mailboxMessage.subject}</strong>
              <small>{mailOpened ? "Okundu" : mailboxMessage.status}</small>
            </button>

            {mailOpened && (
              <article className="mail-message">
                <span>Konu: {mailboxMessage.subject}</span>
                {mailboxMessage.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <small>{mailboxMessage.note}</small>
              </article>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
