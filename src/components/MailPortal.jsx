import React, { useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import MissionFile from "./MissionFile";
import { inboxMessages, mailboxMessage, missionFiles } from "../data/chain";
import { digitalDetectivesLogo, genctekLogoWide } from "../assets/logos";
import { isCorrectMailCredentials } from "../utils/normalize";

const verificationLines = [
  "Kimlik izleri doğrulanıyor...",
  "Görev şifresi kontrol ediliyor...",
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
  const [selectedMessageId, setSelectedMessageId] = useState(
    mailOpened ? mailboxMessage.id : inboxMessages[0]?.id
  );

  const selectedMessage = useMemo(
    () =>
      inboxMessages.find((message) => message.id === selectedMessageId) ||
      inboxMessages[0],
    [selectedMessageId]
  );

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

  const selectMessage = (message) => {
    setSelectedMessageId(message.id);

    if (message.id === mailboxMessage.id) {
      onMailOpened();
    }
  };

  return (
    <main className="app-shell mail-shell">
      <AppHeader onReset={onReset} />

      {!authenticated && !isVerifying && (
        <section className="mail-login-page">
          <div className="mail-login-copy">
            <div className="mail-product-bar">
              <img alt="GençTek logosu" src={genctekLogoWide} />
              <span>İÇ POSTA SİSTEMİ</span>
            </div>
            <span>GENÇTEK İÇ İLETİŞİM</span>
            <h1>Görev Postası</h1>
            <MissionFile file={missionFiles.identity} />
            <p>
              Bazı kapılar kodla değil, izlerle açılır Dedektif. Kırmızı ipli
              karttan topladığın bilgileri burada dene; doğru izler birleşirse
              iç posta odası sessizce açılır.
            </p>
            <p>
              Her bilgi anahtar değildir. Bazıları yalnızca seni yavaşlatmak için
              kartın üzerinde durur.
            </p>
          </div>

          <form className="mail-auth-card" onSubmit={submitCredentials}>
            <div>
              <span>Oturum Doğrulama</span>
              <strong>genctek.gov.tr</strong>
            </div>
            <p className="mail-auth-note">
              Fiziksel karttaki kurumsal e-posta ve kartın taşıdığı görev
              şifresi bu oturumu açar.
            </p>

            <label htmlFor="mail-email">E-postası</label>
            <input
              autoComplete="off"
              id="mail-email"
              maxLength={80}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="karttaki e-posta"
              value={email}
            />

            <label htmlFor="mail-key">Görev Şifresi</label>
            <input
              autoComplete="off"
              id="mail-key"
              maxLength={80}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Karttan çıkardığın görev şifresi"
              type="password"
              value={key}
            />

            {error && <p className="form-error">{error}</p>}

            <button className="primary-button" type="submit">
              İÇ POSTAYA GİR
            </button>
          </form>
        </section>
      )}

      {isVerifying && (
        <section className="mail-verification" aria-live="polite">
          <img alt="" src={digitalDetectivesLogo} />
          {verificationLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      )}

      {authenticated && (
        <section className="mail-client" aria-label="GençTek iç iletişim paneli">
          <header className="mail-client-topbar">
            <div>
              <img alt="GençTek logosu" src={genctekLogoWide} />
              <img
                alt="GençTek Dijital Dedektifler logosu"
                src={digitalDetectivesLogo}
              />
            </div>
            <strong>GençTek İç Posta</strong>
            <span>ahmet.kurulay@genctek.gov.tr</span>
          </header>

          <aside className="mail-sidebar">
            <img alt="GençTek logosu" src={genctekLogoWide} />
            <strong>İç İletişim</strong>
            <nav aria-label="Posta klasörleri">
              <button className="active" type="button">
                Gelen Kutusu <span>{inboxMessages.length}</span>
              </button>
              <button type="button">Arşiv <span>4</span></button>
              <button type="button">Sistem Notları <span>7</span></button>
              <button type="button">Taslaklar <span>0</span></button>
            </nav>
          </aside>

          <section className="mail-list-panel">
            <header className="mail-client-header">
              <div>
                <span>genctek.gov.tr</span>
                <h1>Gelen Kutusu</h1>
              </div>
              <strong>{mailboxMessage.status === "Okunmamış" && !mailOpened ? "1 okunmamış" : "Tüm mesajlar okundu"}</strong>
            </header>

            <div className="mail-search">Kırmızı Mühür Operasyonu kayıtları</div>

            <div className="mail-message-list">
              {inboxMessages.map((message) => {
                const isSelected = message.id === selectedMessage?.id;
                const isTargetUnread = message.id === mailboxMessage.id && !mailOpened;

                return (
                  <button
                    className={`mail-list-row ${isSelected ? "selected" : ""} ${
                      isTargetUnread ? "unread" : ""
                    }`}
                    key={message.id}
                    onClick={() => selectMessage(message)}
                    type="button"
                  >
                    <span>{message.from}</span>
                    <strong>{message.subject}</strong>
                    <small>{message.preview}</small>
                    <b>{message.time}</b>
                  </button>
                );
              })}
            </div>
          </section>

          <article className="mail-reading-pane">
            <header>
              <span>{selectedMessage.tag}</span>
              <h2>{selectedMessage.subject}</h2>
              <p>{selectedMessage.from}</p>
            </header>

            <div className="mail-body">
              {selectedMessage.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <small>{selectedMessage.note}</small>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
