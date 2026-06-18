import React from "react";
import {
  CERTIFICATE_HEIGHT,
  CERTIFICATE_WIDTH,
  getCertificateNameLayout,
  getCertificateNamePosition
} from "../utils/certificate";

export default function MasterCertificate({ badge, cardRef }) {
  const displayName = badge.name.trim().toLocaleUpperCase("tr-TR");
  const nameLayout = getCertificateNameLayout(displayName);
  const namePosition = getCertificateNamePosition(nameLayout);

  return (
    <article className="master-certificate template-certificate" ref={cardRef}>
      <img
        alt="GençTek Usta Dedektif Belgesi şablonu"
        className="certificate-template-image"
        src="/assets/usta-dedektif-belgesi-template.png"
      />
      <svg
        aria-label={`Belge sahibi: ${displayName}`}
        className="certificate-name-layer"
        preserveAspectRatio="none"
        role="img"
        viewBox={`0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}`}
      >
        <defs>
          <filter id="certificate-name-shadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="2" floodColor="#000000" floodOpacity="0.9" stdDeviation="4" />
          </filter>
        </defs>
        <text
          className="template-recipient-name"
          filter="url(#certificate-name-shadow)"
          fontSize={nameLayout.fontSize}
          x={namePosition.centerX}
          y={namePosition.firstY}
        >
          {nameLayout.lines.map((line, index) => (
            <tspan
              dy={index === 0 ? 0 : namePosition.lineHeight}
              key={line}
              x={namePosition.centerX}
            >
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </article>
  );
}
