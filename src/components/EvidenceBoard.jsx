import React from "react";

export default function EvidenceBoard({ profile }) {
  const important = new Set(["Favori Gezegen", "Proje ID"]);

  return (
    <div className="evidence-board">
      {Object.entries(profile).map(([label, value]) => (
        <div className={important.has(label) ? "important" : ""} key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
      <p>Örnek format: Gezegen_42</p>
    </div>
  );
}
