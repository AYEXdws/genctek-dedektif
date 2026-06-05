import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function DigitalBadge({ badge, cardRef }) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(badge.verificationUrl, {
      margin: 1,
      width: 180,
      color: { dark: "#06111f", light: "#ffffff" }
    }).then(setQrUrl);
  }, [badge.verificationUrl]);

  return (
    <article className="digital-badge" ref={cardRef}>
      <div className="badge-glow" />
      <header className="badge-top">
        <div className="logo-mark">GT</div>
        <div>
          <p>GençTek Logo Alanı</p>
          <h2>Dijital Dedektif Kimliği</h2>
        </div>
      </header>

      <section className="badge-person">
        <span>Katılımcı</span>
        <strong>{badge.name}</strong>
      </section>

      <div className="badge-grid">
        <div>
          <span>Rozet ID</span>
          <strong>{badge.badgeId}</strong>
        </div>
        <div>
          <span>Görev Durumu</span>
          <strong>4/4</strong>
        </div>
        <div>
          <span>Arşiv Bütünlüğü</span>
          <strong>%100</strong>
        </div>
        <div>
          <span>Konum</span>
          <strong>{badge.location}</strong>
        </div>
      </div>

      <div className="event-line">
        <span>Etkinlik</span>
        <strong>{badge.event}</strong>
        <small>{badge.date}</small>
      </div>

      <ul className="badge-areas">
        {badge.completedAreas.map((area) => (
          <li key={area}>✓ {area}</li>
        ))}
      </ul>

      <footer className="qr-zone">
        {qrUrl && <img alt="QR doğrulama kodu" src={qrUrl} />}
        <div>
          <span>QR Doğrulama</span>
          <small>{badge.verificationUrl}</small>
        </div>
      </footer>
    </article>
  );
}
