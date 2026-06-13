import React from "react";
import { genctekLogoMark, genctekLogoWide } from "../assets/logos";

export default function IdentityTraceTask({ task }) {
  const [identityCard, personalNotes] = task.identityCards;

  return (
    <div className="identity-task">
      <section className="genctek-id-card" aria-label="GençTek kimlik kartı">
        <div className="id-card-strip" aria-hidden="true" />
        <header>
          <img alt="GençTek logosu" src={genctekLogoWide} />
          <span>Kırmızı Mühür Operasyonu</span>
        </header>

        <div className="id-card-body">
          <div className="id-photo">
            <img alt="GençTek amblem" src={genctekLogoMark} />
          </div>
          <div className="id-person">
            <span>Simüle Görev Kimliği</span>
            <strong>Ahmet Cemal Kurulay</strong>
            <small>Siber Güvenlik Birimi</small>
          </div>
        </div>

        <dl>
          {identityCard.lines.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <footer>
          <span>GENÇTEK GÖREV KARTI</span>
          <strong>GT-SEC / 2026</strong>
        </footer>
      </section>

      <section className="identity-card">
        <span>{personalNotes.title}</span>
        <dl>
          {personalNotes.lines.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
