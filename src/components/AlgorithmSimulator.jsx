import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    arrow: "↑",
    col: 0,
    direction: "Yukarı",
    label: "Başlangıç",
    note: "Robot başlangıç karesinde. Veri çekirdeği sağ üstte.",
    row: 3
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Yukarı",
    label: "1. adım: İLERİ",
    note: "Robot baktığı yöne doğru bir kare ilerledi.",
    row: 2
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Yukarı",
    label: "2. adım: İLERİ",
    note: "Robot üst sıraya ulaştı. Çekirdeğe ulaşmak için sağ tarafa bakması gerekiyor.",
    row: 1
  },
  {
    arrow: "→",
    col: 0,
    direction: "Sağ",
    label: "3. adım: SAĞA DÖN",
    note: "Dönüş komutu konumu değiştirmez; robot sadece sağ tarafa bakar.",
    row: 1
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Yukarı",
    label: "4. adım: SOLA DÖN",
    note: "Sola dönüş konumu değiştirmez; sadece robotun bakışını yukarı çevirir.",
    row: 1,
    routeState: "warning"
  },
  {
    arrow: "↑",
    col: 0,
    direction: "Yukarı",
    label: "5. adım: İLERİ",
    note: "İleri komutu artık yukarı yönde çalışır ve robot izlenecek yolun dışına çıkar.",
    row: 0,
    routeState: "warning"
  }
];

const cells = Array.from({ length: 12 }, (_, index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return { col, id: `${row}-${col}`, row };
});

const intendedPath = new Set(["3-0", "2-0", "1-0", "1-1", "1-2"]);
const exitCell = "0-0";
const targetCell = "1-2";
const nextCellAfterTurn = "1-1";
const startCell = "3-0";

export default function AlgorithmSimulator({ commands, onSelectStep }) {
  const [activeStep, setActiveStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timersRef = useRef([]);
  const current = steps[activeStep] ?? steps[0];
  const activeCell = `${current.row}-${current.col}`;

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
          const finishTimerId = window.setTimeout(() => setRunning(false), 650);
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
          <div className="direction-strip" aria-label="Yön açıklaması">
            <span>↑ Yukarı</span>
            <span>→ Sağ</span>
            <span>↓ Aşağı</span>
            <span>← Sol</span>
          </div>

          <div className="route-grid">
            {cells.map((cell) => {
              const key = `${cell.row}-${cell.col}`;
              const isRobot = key === activeCell;
              const isStart = key === startCell;
              const isTarget = key === targetCell;
              const isNext = activeStep >= 3 && key === nextCellAfterTurn;
              const isExit = key === exitCell;

              return (
                <div
                  className={[
                    "route-cell",
                    intendedPath.has(key) ? "route" : "",
                    isExit ? "exit" : "",
                    isStart ? "start" : "",
                    isTarget ? "target" : "",
                    isNext ? "next-target" : "",
                    isRobot ? "active" : ""
                  ].join(" ")}
                  key={cell.id}
                >
                  {isStart && !isRobot && <small>Başlangıç</small>}
                  {isExit && !isRobot && <small>Yol dışı</small>}
                  {isTarget && !isRobot && <small>Veri Çekirdeği</small>}
                  {isNext && !isRobot && <small>Sıradaki kare</small>}
                  {isRobot && (
                    <span
                      className={[
                        "robot-token",
                        current.routeState === "warning" ? "watch" : ""
                      ].join(" ")}
                    >
                      <b>{current.arrow}</b>
                      <em>{current.direction}</em>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="route-legend" aria-label="Harita açıklaması">
            <span>
              <i className="legend-start" /> Başlangıç
            </span>
            <span>
              <i className="legend-route" /> İzlenecek yol
            </span>
            <span>
              <i className="legend-core" /> Veri çekirdeği
            </span>
            <span>
              <i className="legend-watch" /> Yön değişimi
            </span>
          </div>
        </div>

        <div className="sim-status">
          <span>{current.label}</span>
          <strong>
            Robotun baktığı yön: {current.arrow} {current.direction}
          </strong>
          <p>{current.note}</p>
          {activeStep >= 3 && (
            <div className="route-reading">
              <span>3. adımdan sonra robot sağ tarafa bakıyor.</span>
              <strong>
                İLERİ komutu, robot hangi yöne bakıyorsa o yöne hareket eder.
                Bakış yukarıya dönerse sonraki ilerleme yolu terk eder.
              </strong>
            </div>
          )}
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
              activeStep > index + 1 ? "done" : ""
            ].join(" ")}
            key={`${command}-${index}`}
          >
            <button onClick={() => onSelectStep(String(index + 1))} type="button">
              <span>{index + 1}</span>
              <strong>{command}</strong>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
