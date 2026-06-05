import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import DigitalBadge from "./DigitalBadge";

export default function BadgeCreator({ savedName = "", badge, onCreateBadge }) {
  const [name, setName] = useState(savedName);
  const [error, setError] = useState("");
  const cardRef = useRef(null);

  const handleCreate = (event) => {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Ad soyad alanı boş bırakılamaz.");
      return;
    }

    setError("");
    onCreateBadge(cleanName);
  };

  const downloadCard = async () => {
    if (!cardRef.current || !badge) return;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#06111f"
    });
    const link = document.createElement("a");
    link.download = `genctek-dijital-dedektif-${badge.badgeId}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="badge-creator">
      {!badge && (
        <form className="identity-form" onSubmit={handleCreate}>
          <h2>Dijital Dedektif Kimliğini Oluştur</h2>
          <label htmlFor="detective-name">Ad Soyad:</label>
          <input
            id="detective-name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Ad Soyad"
            value={name}
          />
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" type="submit">
            KİMLİĞİ OLUŞTUR
          </button>
        </form>
      )}

      {badge && (
        <>
          <DigitalBadge badge={badge} cardRef={cardRef} />
          <button className="primary-button download" onClick={downloadCard}>
            Dijital Kimliği İndir
          </button>
        </>
      )}
    </div>
  );
}
