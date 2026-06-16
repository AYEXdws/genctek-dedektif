import React from "react";

export default function MasterCertificate({ badge, cardRef }) {
  const displayName = badge.name.trim().toLocaleUpperCase("tr-TR");
  const nameClass =
    displayName.length > 26
      ? "compact-name"
      : displayName.length > 18
        ? "wide-name"
        : "";

  return (
    <article className="master-certificate template-certificate" ref={cardRef}>
      <img
        alt=""
        className="template-background-probe"
        src="/assets/usta-dedektif-belgesi-template.png"
      />
      <strong className={`template-recipient-name ${nameClass}`}>
        {displayName}
      </strong>
    </article>
  );
}
