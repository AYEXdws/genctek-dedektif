import React, { useState } from "react";

const stepStates = [
  {
    label: "Başlangıç",
    direction: "Kuzey",
    arrow: "↑",
    note: "Robot veri yolunun başlangıcında ve yukarı yöne bakıyor."
  },
  {
    label: "1. adım: İLERİ",
    direction: "Kuzey",
    arrow: "↑",
    note: "Robot başlangıç çizgisinden veri yoluna ilerliyor."
  },
  {
    label: "2. adım: İLERİ",
    direction: "Kuzey",
    arrow: "↑",
    note: "Robot çekirdeğe yaklaşmak için aynı yönde ilerliyor."
  },
  {
    label: "3. adım: SAĞA DÖN",
    direction: "Doğu",
    arrow: "→",
    note: "Robot sağa dönüyor ve veri çekirdeğinin bulunduğu yöne bakıyor."
  },
  {
    label: "4. adım: SOLA DÖN",
    direction: "Kuzey",
    arrow: "↑",
    note: "Hata burada: robot çekirdeğe doğru ilerlemek yerine tekrar yukarı yöne dönüyor."
  },
  {
    label: "5. adım: İLERİ",
    direction: "Kuzey",
    arrow: "↑",
    note: "Son ileri komutu robotu çekirdekten uzaklaştırıyor."
  }
];

export default function AlgorithmSimulator({ commands, onSelectStep }) {
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = stepStates[activeStep] ?? stepStates[0];

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
        <div className="sim-compass" aria-label="Yön göstergesi">
          <span>Kuzey ↑</span>
          <span>Doğu →</span>
          <span>Güney ↓</span>
          <span>Batı ←</span>
        </div>
        <span className={`sim-robot step-${Math.min(activeStep, 5)}`}>
          <b>{currentStep.arrow}</b>
          <small>{currentStep.direction}</small>
        </span>
        <span className="sim-core">Veri Çekirdeği</span>
        <span className="sim-line horizontal" />
        <span className="sim-line vertical" />
        <span className={activeStep === 4 ? "wrong-turn active" : "wrong-turn"}>
          Hatalı dönüş: 4. adım
        </span>
      </div>

      <div className="sim-status">
        <span>{currentStep.label}</span>
        <strong>
          Yön: {currentStep.direction} {currentStep.arrow}
        </strong>
        <p>{currentStep.note}</p>
        {activeStep === 4 && (
          <div className="turn-comparison">
            <span>Beklenen yön: Doğu →</span>
            <strong>Gerçek yön: Kuzey ↑</strong>
          </div>
        )}
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
