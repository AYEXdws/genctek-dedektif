import React, { useState } from "react";

export default function AlgorithmSimulator({ commands, onSelectStep }) {
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const startSimulation = () => {
    setRunning(true);
    setActiveStep(0);

    commands.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveStep(index + 1);
        if (index === commands.length - 1) {
          window.setTimeout(() => setRunning(false), 450);
        }
      }, index * 520);
    });
  };

  return (
    <div className="algorithm-simulator">
      <div className="sim-map" aria-label="Robot algoritma simülasyonu">
        <span className={`sim-robot step-${Math.min(activeStep, 4)}`}>R</span>
        <span className="sim-core">Veri Çekirdeği</span>
        <span className="sim-line horizontal" />
        <span className="sim-line vertical" />
        <span className={activeStep === 4 ? "wrong-turn active" : "wrong-turn"}>
          Hatalı Dönüş
        </span>
      </div>

      <button
        className="secondary-button"
        disabled={running}
        onClick={startSimulation}
        type="button"
      >
        Simülasyonu Başlat
      </button>

      <ol className="command-list selectable">
        {commands.map((command, index) => (
          <li
            className={activeStep === index + 1 ? "active" : ""}
            key={`${command}-${index}`}
          >
            <button onClick={() => onSelectStep(String(index + 1))} type="button">
              <span>{index + 1}</span>
              {command}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
