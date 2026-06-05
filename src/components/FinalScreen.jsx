import React, { useEffect, useState } from "react";
import { taskAreas } from "../data/tasks";

export default function FinalScreen({ children, onCreateIdentity }) {
  const [progress, setProgress] = useState(25);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const values = [25, 50, 75, 100];
    const timers = values.map((value, index) =>
      window.setTimeout(() => {
        setProgress(value);
        if (value === 100) setReady(true);
      }, index * 650)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section className="final-screen">
      <div className="final-core">
        <p>Dört veri parçası kurtarıldı.</p>
        <h2>GençTek Arşivi yeniden oluşturuluyor...</h2>
        <div className="restore-meter">
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>%{progress}</strong>
      </div>

      {ready && (
        <div className="final-ready">
          <h2>GENÇTEK ARŞİVİ BAŞARIYLA TAMAMLANDI</h2>
          <ul>
            {taskAreas.map((area) => (
              <li key={area}>✓ {area}</li>
            ))}
          </ul>
          {children || (
            <button
              className="primary-button"
              onClick={onCreateIdentity}
              type="button"
            >
              DİJİTAL KİMLİĞİ OLUŞTUR
            </button>
          )}
        </div>
      )}
    </section>
  );
}
