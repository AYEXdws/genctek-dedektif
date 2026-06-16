import React from "react";
import { digitalDetectivesLogo, genctekLogoWide } from "../assets/logos";

export default function AppHeader({ onReset }) {
  return (
    <header className="app-header" aria-label="GençTek üst panel">
      <div className="app-header-logos">
        <img alt="GençTek logosu" src={genctekLogoWide} />
        <img
          alt="GençTek Dijital Dedektifler logosu"
          src={digitalDetectivesLogo}
        />
      </div>

      <button className="reset-button" onClick={onReset} type="button">
        Baştan Başla
      </button>
    </header>
  );
}
