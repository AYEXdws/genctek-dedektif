import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import genctekLogoMark from "../assets/genctek-logo-mark.jpg";
import genctekLogoWide from "../assets/genctek-logo-wide.jpg";
import { story } from "../data/story";

export default function DigitalCertificate({ badge, cardRef }) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(badge.verificationUrl, {
      margin: 1,
      width: 210,
      color: { dark: "#071421", light: "#ffffff" }
    }).then(setQrUrl);
  }, [badge.verificationUrl]);

  return (
    <article className="digital-certificate" ref={cardRef}>
      <div className="certificate-watermark">GT</div>
      <div className="certificate-frame" />

      <header className="certificate-header">
        <div className="certificate-logo-wide">
          <img alt="GençTek logosu" src={genctekLogoWide} />
        </div>
        <div className="certificate-title-block">
          <p>GENÇTEK DİJİTAL GÖREV SİSTEMİ</p>
          <h2>{story.certificate.title}</h2>
          <span>AMASYA · 2026</span>
        </div>
      </header>

      <section className="certificate-name">
        <span>Katılımcı</span>
        <strong>{badge.name}</strong>
        <p>{story.certificate.explanation}</p>
      </section>

      <div className="certificate-main-grid">
        <section className="certificate-details">
          <div>
            <span>Belge ID</span>
            <strong>{badge.badgeId}</strong>
          </div>
          <div>
            <span>Seviye</span>
            <strong>Dijital Dedektif</strong>
          </div>
          <div>
            <span>Görev Durumu</span>
            <strong>4/4 Tamamlandı</strong>
          </div>
          <div>
            <span>Arşiv Bütünlüğü</span>
            <strong>%100</strong>
          </div>
          <div>
            <span>Etkinlik</span>
            <strong>{badge.event}</strong>
          </div>
          <div>
            <span>Konum</span>
            <strong>{badge.location}</strong>
          </div>
          <div>
            <span>Tarih</span>
            <strong>{badge.date}</strong>
          </div>
        </section>

        <section className="certificate-areas">
          <span>Tamamlanan Alanlar</span>
          <ul>
            {badge.completedAreas.map((area) => (
              <li key={area}>
                <b>✓</b>
                {area}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="certificate-footer">
        <div className="digital-seal">
          <img alt="GençTek amblem" src={genctekLogoMark} />
          <span>GENÇTEK</span>
          <strong>Dijital Mühür</strong>
        </div>
        <div className="certificate-qr">
          {qrUrl && <img alt="QR doğrulama kodu" src={qrUrl} />}
          <div>
            <span>QR Doğrulama</span>
            <small>{badge.verificationUrl}</small>
          </div>
        </div>
      </footer>

      <p className="certificate-note">{story.certificate.footer}</p>
    </article>
  );
}
