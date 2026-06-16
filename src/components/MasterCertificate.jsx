import React from "react";
import {
  digitalDetectivesMark,
  genctekLogoWide
} from "../assets/logos";
import { certificateDetails } from "../data/chain";

export default function MasterCertificate({ badge, cardRef }) {
  const displayName = badge.name.trim().toLocaleUpperCase("tr-TR");
  const nameClass =
    displayName.length > 26
      ? "compact-name"
      : displayName.length > 18
        ? "wide-name"
        : "";

  return (
    <article className="master-certificate" ref={cardRef}>
      <div className="master-watermark">GT</div>
      <div className="master-border" />

      <header className="master-certificate-header">
        <img alt="GençTek logosu" src={genctekLogoWide} />
        <div>
          <span>GENÇTEK</span>
          <strong>{certificateDetails.title}</strong>
        </div>
      </header>

      <section className="master-recipient">
        <span>Katılımcı</span>
        <strong className={nameClass}>{displayName}</strong>
        <p>
          Bu belge, GençTek Dijital Dedektifler: Kırmızı Mühür Operasyonu
          kapsamında tüm izleri takip ederek son göreve ulaşan katılımcı için
          oluşturulmuştur.
        </p>
      </section>

      <section className="master-details">
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
        <div>
          <span>Belge ID</span>
          <strong>{badge.id}</strong>
        </div>
      </section>

      <section className="completed-tracks" aria-label="Tamamlanan izler">
        <span>Tamamlanan İzler</span>
        {badge.completedAreas.map((area, index) => (
          <div key={area}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <strong>{area}</strong>
          </div>
        ))}
      </section>

      <footer className="master-footer">
        <div className="red-seal">
          <img alt="" src={digitalDetectivesMark} />
          <span>KIRMIZI MÜHÜR</span>
          <strong>Tamamlandı</strong>
        </div>
        <p>{certificateDetails.footer}</p>
      </footer>
    </article>
  );
}
