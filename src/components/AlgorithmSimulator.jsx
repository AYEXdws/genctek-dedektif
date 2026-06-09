import React, { useEffect, useRef, useState } from "react";

const stepStates = [
  {
    arrow: "↑",
    col: 0,
    direction: "Kuzey",
    label: "Başlangıç",
    note: "Robot başlangıç noktasında. Veri çekirdeği sağ üst köşede.",
    row: 2
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Kuzey",
    label: "1. adım: İLERİ",
    note: "Robot kuzeye bakıyor ve bir kare yukarı ilerliyor.",
    row: 1
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Kuzey",
    label: "2. adım: İLERİ",
    note: "Robot üst sıraya ulaştı. Çekirdeğe gitmek için artık doğuya dönmesi gerekiyor.",
    row: 0
  },
  {
    arrow: "→",
    col: 0,
    direction: "Doğu",
    label: "3. adım: SAĞA DÖN",
    note: "Robot konum değiştirmedi; sadece sağa döndü ve çekirdeğin yönüne baktı.",
    row: 0
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Kuzey",
    isError: true,
    label: "4. adım: SOLA DÖN",
    note: "Hata burada: çekirdek doğudayken robot sola dönüp tekrar kuzeye bakıyor.",
    row: 0
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Kuzey",
    isError: true,
    isOffRoute: true,
    label: "5. adım: İLERİ",
    note: "Son komut robotu doğru rotadan çıkarıyor; çekirdek sağda kalıyor.",
    row: 0
  }
];

const cells = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return { col, id: `${row}-${col}`, row };
});

const correctRoute = new Set(["2-0", "1-0", "0-0", "0-1", "0-2"]);

export default function AlgorithmSimulator({ commands, onSelectStep }) {
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const timersRef = useRef([]);
  const currentStep = stepStates[activeStep] ?? stepStates[0];
  const activeCell = `${currentStep.row}-${currentStep.col}`;

  const clearTimers = () => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const startSimulation = () => {
    clearTimers();
    setRunning(true);
    setActiveStep(0);

    commands.forEach((_, index) => {
      const timerId = window.setTimeout(() => {
        setActiveStep(index + 1);
        if (index === commands.length - 1) {
          const finishTimerId = window.setTimeout(() => setRunning(false), 700);
          timersRef.current.push(finishTimerId);
        }
      }, (index + 1) * 850);
      timersRef.current.push(timerId);
    });
  };

  const nextStep = () => {
    setActiveStep((step) => Math.min(step + 1, commands.length));
  };

  const resetSimulation = () => {
    clearTimers();
    setRunning(false);
    setActiveStep(0);
  };

  return (
    <div className="algorithm-simulator">
      <div className="algorithm-layout">
        <div className="sim-map" aria-label="Robot algoritma simülasyonu">
          <div className="sim-compass" aria-label="Yön göstergesi">
            <span className="north">Kuzey ↑</span>
            <span className="east">Doğu →</span>
            <span className="south">Güney ↓</span>
            <span className="west">Batı ←</span>
          </div>

          <div className="route-grid">
            {cells.map((cell) => {
              const key = `${cell.row}-${cell.col}`;
              const isCore = cell.row === 0 && cell.col === 2;
              const isNextTarget = activeStep >= 3 && key === "0-1";
              const isRobot = key === activeCell;
              const isStart = cell.row === 2 && cell.col === 0;

              return (
                <div
                  className={[
                    "route-cell",
                    correctRoute.has(key) ? "route" : "",
                    isStart ? "start" : "",
                    isCore ? "core" : "",
                    isNextTarget ? "next-target" : "",
                    isRobot ? "active" : ""
                  ].join(" ")}
                  key={cell.id}
                >
                  {isStart && !isRobot && <small>Başlangıç</small>}
                  {isCore && !isRobot && <small>Veri Çekirdeği</small>}
                  {isNextTarget && !isRobot && <small>Doğru yön</small>}
                  {isRobot && (
                    <span
                      className={[
                        "robot-token",
                        currentStep.isError ? "error" : "",
                        currentStep.isOffRoute ? "off-route" : ""
                      ].join(" ")}
                    >
                      <b>{currentStep.arrow}</b>
                      <em>{currentStep.direction}</em>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className={activeStep >= 4 ? "wrong-route active" : "wrong-route"}>
            <span>Yanlış yön</span>
            <strong>↑</strong>
          </div>

          <div className="route-legend" aria-label="Harita açıklaması">
            <span>
              <i className="legend-start" /> Başlangıç
            </span>
            <span>
              <i className="legend-route" /> Doğru rota
            </span>
            <span>
              <i className="legend-core" /> Veri çekirdeği
            </span>
            <span>
              <i className="legend-error" /> Hatalı yön
            </span>
          </div>
        </div>

        <div className="sim-status">
          <span>{currentStep.label}</span>
          <strong>
            Robotun baktığı yön: {currentStep.direction} {currentStep.arrow}
          </strong>
          <p>{currentStep.note}</p>
          <div className={activeStep >= 4 ? "turn-comparison active" : "turn-comparison"}>
            <div>
              <span>Beklenen işlem</span>
              <strong>Çekirdeğe doğru doğuya ilerle →</strong>
            </div>
            <div>
              <span>Gerçek 4. komut</span>
              <strong>Sola dönüp kuzeye bak ↑</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="sim-controls">
        <button
          className="secondary-button"
          disabled={running}
          onClick={startSimulation}
          type="button"
        >
          Baştan Oynat
        </button>
        <button
          className="secondary-button"
          disabled={running || activeStep === commands.length}
          onClick={nextStep}
          type="button"
        >
          Bir Adım İlerle
        </button>
        <button className="ghost-button" onClick={resetSimulation} type="button">
          Sıfırla
        </button>
      </div>

      <ol className="command-list selectable">
        {commands.map((command, index) => (
          <li
            className={[
              activeStep === index + 1 ? "active" : "",
              activeStep > index + 1 ? "done" : "",
              index === 3 && activeStep >= 4 ? "error" : ""
            ].join(" ")}
            key={`${command}-${index}`}
          >
            <button onClick={() => onSelectStep(String(index + 1))} type="button">
              <span>{index + 1}</span>
              <strong>{command}</strong>
              {index === 3 && <small>Dönüş kontrolü</small>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
