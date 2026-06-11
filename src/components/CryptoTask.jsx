import React from "react";
import { turkishAlphabet } from "../utils/crypto";

export default function CryptoTask({ task }) {
  return (
    <div className="crypto-panel">
      <div>
        <span>Türk alfabesi</span>
        <strong>{turkishAlphabet.join(" ")}</strong>
      </div>
      <div>
        <span>{task.encryptedLabel}</span>
        <strong className="cipher-text">{task.encryptedText}</strong>
      </div>
      <div>
        <span>Yöntem</span>
        <strong>{task.shiftText}</strong>
      </div>
    </div>
  );
}
