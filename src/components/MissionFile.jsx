import React from "react";

export default function MissionFile({ file }) {
  if (!file) return null;

  return (
    <aside className="mission-file" aria-label={`${file.title} görev dosyası`}>
      <div>
        <span>{file.code}</span>
        <strong>{file.title}</strong>
      </div>
      <small>{file.field}</small>
      {file.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </aside>
  );
}
