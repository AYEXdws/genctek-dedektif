import React, { useState } from "react";
import { sourceFiles } from "../data/tasks";

export default function LogExplorer() {
  const fileNames = Object.keys(sourceFiles);
  const [activeFile, setActiveFile] = useState(fileNames[0]);

  return (
    <div className="log-explorer">
      <div className="file-tabs" aria-label="Kaynak dosyaları">
        {fileNames.map((file) => (
          <button
            className={activeFile === file ? "active" : ""}
            key={file}
            onClick={() => setActiveFile(file)}
            type="button"
          >
            {file}
          </button>
        ))}
      </div>
      <pre className="log-output">
        {sourceFiles[activeFile].map((line) => (
          <span key={line}>{line}</span>
        ))}
      </pre>
    </div>
  );
}
