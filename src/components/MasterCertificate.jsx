import React from "react";
import { getCertificateNameLayout } from "../utils/certificate";

export default function MasterCertificate({ badge, cardRef }) {
  const displayName = badge.name.trim().toLocaleUpperCase("tr-TR");
  const nameLayout = getCertificateNameLayout(displayName);
  const nameClass =
    nameLayout.fontSize < 24
      ? "compact-name"
      : nameLayout.fontSize < 31 || nameLayout.lines.length > 1
        ? "wide-name"
        : "";

  return (
    <article className="master-certificate template-certificate" ref={cardRef}>
      <img
        alt="GençTek Usta Dedektif Belgesi şablonu"
        className="certificate-template-image"
        src="/assets/usta-dedektif-belgesi-template.png"
      />
      <strong className={`template-recipient-name ${nameClass}`}>
        {nameLayout.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </strong>
    </article>
  );
}
