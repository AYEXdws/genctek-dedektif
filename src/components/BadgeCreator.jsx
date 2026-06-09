import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import DigitalCertificate from "./DigitalCertificate";

export default function BadgeCreator({ savedName = "", badge, onCreateBadge }) {
  const [name, setName] = useState(savedName);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPreparing, setIsPreparing] = useState(false);
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

  const createCertificateImage = async () => {
    if (!cardRef.current || !badge) return "";

    setIsPreparing(true);
    setError("");

    try {
      await document.fonts?.ready;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const width = Math.ceil(card.scrollWidth || rect.width);
      const height = Math.ceil(card.scrollHeight || rect.height);
      const dataUrl = await toPng(card, {
        cacheBust: true,
        height,
        pixelRatio: 2.5,
        backgroundColor: "#071421",
        style: {
          height: `${height}px`,
          maxWidth: "430px",
          transform: "none",
          width: `${width}px`
        },
        width
      });

      setImageUrl(dataUrl);
      return dataUrl;
    } catch {
      setError(
        "İndirme başlatılamadı. Görsel olarak aç seçeneğini deneyebilirsin."
      );
      return "";
    } finally {
      setIsPreparing(false);
    }
  };

  const downloadCard = async () => {
    const dataUrl = imageUrl || (await createCertificateImage());
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.download = `genctek-dijital-dedektif-belgesi-${badge.badgeId}.png`;
    link.href = dataUrl;
    link.click();
  };

  const openImage = async () => {
    const dataUrl = imageUrl || (await createCertificateImage());
    if (!dataUrl) return;

    const imageWindow = window.open();
    if (imageWindow) {
      imageWindow.document.write(
        `<title>${badge.badgeId}</title><img alt="GençTek Dijital Dedektif Görev Belgesi" src="${dataUrl}" style="max-width:100%;height:auto;display:block;margin:0 auto;background:#071421;" />`
      );
      imageWindow.document.close();
    } else {
      setError(
        "Görsel açılamadı. Tarayıcı açılır pencere iznini kontrol edebilirsin."
      );
    }
  };

  return (
    <div className="badge-creator">
      {!badge && (
        <form className="identity-form" onSubmit={handleCreate}>
          <h2>Dijital Görev Belgesini Oluştur</h2>
          <label htmlFor="detective-name">Ad Soyad:</label>
          <input
            id="detective-name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Ad Soyad"
            value={name}
          />
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" type="submit">
            BELGEYİ OLUŞTUR
          </button>
        </form>
      )}

      {badge && (
        <>
          <DigitalCertificate badge={badge} cardRef={cardRef} />
          {isPreparing && <p className="download-status">Belge hazırlanıyor...</p>}
          {error && <p className="form-error">{error}</p>}
          <div className="certificate-actions">
            <button className="primary-button" onClick={downloadCard} type="button">
              📥 Dijital Belgeyi İndir
            </button>
            <button className="secondary-button" onClick={openImage} type="button">
              🖼 Görsel Olarak Aç / Kaydet
            </button>
          </div>
        </>
      )}
    </div>
  );
}
