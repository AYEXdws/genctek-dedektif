import React from "react";
import { genctekLogoMark, genctekLogoWide } from "../assets/logos";
import { story } from "../data/story";

export default function DigitalCertificate({ badge, cardRef }) {
  return (
    <article className="digital-certificate" ref={cardRef}>
      <div className="certificate-paper-grain" />
      <div className="certificate-border" />
      <div className="certificate-side-mark">GENÇTEK DİJİTAL DEDEKTİFLER</div>

      <header className="certificate-header">
        <div className="certificate-brand-row">
          <img alt="GençTek logosu" src={genctekLogoWide} />
          <div className="certificate-program-logo" aria-label="GençTek Dijital Dedektifler">
            <span>GT</span>
            <strong>Dijital Dedektifler</strong>
          </div>
        </div>

        <div className="certificate-title-block">
          <span>GençTek Kırmızı Mühür Operasyonu</span>
          <h2>{story.certificate.title}</h2>
          <p>Etkinlik kapsamında düzenlenen dijital görev tamamlama belgesi</p>
        </div>
      </header>

      <section className="certificate-recipient">
        <span>Katılımcı</span>
        <strong>{badge.name}</strong>
        <p>{story.certificate.explanation}</p>
      </section>

      <section className="certificate-summary">
        <div>
          <span>Dedektif Derecesi</span>
          <strong>{badge.detectiveRank}</strong>
        </div>
        <div>
          <span>Toplam Puan</span>
          <strong>{badge.totalScore} / 1000</strong>
        </div>
        <div>
          <span>Görev Durumu</span>
          <strong>4 / 4 Tamamlandı</strong>
        </div>
        <div>
          <span>Dedektif Notu</span>
          <strong>{badge.hintCount} / 4 Kullanıldı</strong>
        </div>
      </section>

      <section className="certificate-mission-strip" aria-label="Tamamlanan alanlar">
        <span>Tamamlanan Görev Alanları</span>
        <div className="mission-ribbon">
          {badge.completedAreas.map((area, index) => (
            <div className="mission-ribbon-item" key={area}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <strong>{area}</strong>
              <small>Alan doğrulandı</small>
            </div>
          ))}
        </div>
      </section>

      <section className="certificate-meta">
        <div>
          <span>Etkinlik</span>
          <strong>{badge.event}</strong>
        </div>
        <div>
          <span>Operasyon</span>
          <strong>{badge.operation}</strong>
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

      <footer className="certificate-footer">
        <div className="certificate-stamp" aria-hidden="true">
          <img alt="" src={genctekLogoMark} />
          <span>KIRMIZI MÜHÜR</span>
          <strong>Tamamlandı</strong>
        </div>
        <div className="certificate-closing">
          <p>{story.certificate.footer}</p>
          <small>GençTek Dijital Dedektifler deneyimi için otomatik oluşturulmuştur.</small>
        </div>
      </footer>
    </article>
  );
}
