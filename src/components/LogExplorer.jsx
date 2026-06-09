import React, { useState } from "react";
import { sourceFiles } from "../data/tasks";

const fileMeta = {
  "system.log": "Sistem başlatma kayıtları",
  "archive.cache": "Arşiv önbellek katmanı",
  "users.tmp": "Geçici oturum kayıtları",
  "source.layer": "Gizli kaynak katmanı"
};

export default function LogExplorer() {
  const fileNames = Object.keys(sourceFiles);
  const [activeFile, setActiveFile] = useState(fileNames[0]);

  return (
    <div className="log-explorer">
      <div className="layer-list" aria-label="Kaynak katmanı dosyaları">
        {fileNames.map((file) => (
          <button
            className={activeFile === file ? "active" : ""}
            key={file}
            onClick={() => setActiveFile(file)}
            type="button"
          >
            <span>{file}</span>
            <small>{fileMeta[file]}</small>
          </button>
        ))}
      </div>

      <div className="log-output">
        <div className="log-title">
          <span>Açık dosya</span>
          <strong>{activeFile}</strong>
        </div>
        <pre>
          {sourceFiles[activeFile].map((line) => (
            <span key={line}>{line}</span>
          ))}
        </pre>
      </div>
    </div>
  );
}
