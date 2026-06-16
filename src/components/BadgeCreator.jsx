import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import MasterCertificate from "./MasterCertificate";

const CERTIFICATE_WIDTH = 360;
const CERTIFICATE_HEIGHT = 640;
const CERTIFICATE_PIXEL_RATIO = 3;
const MAX_NAME_LENGTH = 32;

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const mimeType = header.match(/:(.*?);/)?.[1] || "image/png";
  const binary = window.atob(data);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
}

async function waitForCertificateAssets(node) {
  await document.fonts?.ready;

  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    })
  );

  await Promise.all(images.map((image) => image.decode?.().catch(() => {})));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
}

function isIOSLikeBrowser() {
  const platform = navigator.platform || "";
  const userAgent = navigator.userAgent || "";

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function supportsAnchorDownload() {
  return (
    typeof HTMLAnchorElement !== "undefined" &&
    "download" in HTMLAnchorElement.prototype
  );
}

function getSafeName(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (char) => {
      const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
}

export default function BadgeCreator({ savedName = "", badge, onCreateBadge }) {
  const [name, setName] = useState(savedName);
  const [error, setError] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
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

    if (cleanName.length > MAX_NAME_LENGTH) {
      setError("Ad soyad en fazla 32 karakter olabilir.");
      return;
    }

    setError("");
    onCreateBadge(cleanName.replace(/\s+/g, " "));
  };

  const getFileName = () => {
    const safeId = getSafeName(badge.id) || "gt-2026";
    return `genctek-usta-dijital-dedektif-belgesi-${safeId}.png`;
  };

  const getCaptureOptions = () => {
    return {
      cacheBust: true,
      height: CERTIFICATE_HEIGHT,
      pixelRatio: CERTIFICATE_PIXEL_RATIO,
      skipAutoScale: true,
      backgroundColor: "#fffdfb",
      style: {
        aspectRatio: "auto",
        boxShadow: "none",
        height: `${CERTIFICATE_HEIGHT}px`,
        maxWidth: "none",
        minHeight: "0",
        transform: "none",
        width: `${CERTIFICATE_WIDTH}px`
      },
      width: CERTIFICATE_WIDTH
    };
  };

  const createCertificateImage = async () => {
    if (!cardRef.current || !badge) return null;

    setIsPreparing(true);
    setError("");
    setDownloadMessage("");

    try {
      const card = cardRef.current;
      await waitForCertificateAssets(card);

      card.classList.add("is-exporting");
      await new Promise((resolve) => window.requestAnimationFrame(resolve));

      const options = getCaptureOptions(card);
      const dataUrl = await toPng(card, options);
      const blob = dataUrlToBlob(dataUrl);

      setImageBlob(blob);
      setImageUrl(dataUrl);
      return { blob, dataUrl };
    } catch {
      setError(
        "İndirme başlatılamadı. Görsel olarak aç seçeneğini deneyebilirsin."
      );
      return null;
    } finally {
      cardRef.current?.classList.remove("is-exporting");
      setIsPreparing(false);
    }
  };

  const getCertificateImage = async () => {
    if (imageBlob && imageUrl) return { blob: imageBlob, dataUrl: imageUrl };
    return createCertificateImage();
  };

  const downloadCard = async () => {
    const image = await getCertificateImage();
    if (!image) return;

    const fileName = getFileName();
    const file =
      typeof File !== "undefined"
        ? new File([image.blob], fileName, { type: "image/png" })
        : null;

    if (
      file &&
      navigator.canShare?.({ files: [file] }) &&
      (isIOSLikeBrowser() || !supportsAnchorDownload())
    ) {
      try {
        await navigator.share({
          files: [file],
          text: "GençTek Usta Dijital Dedektif Belgesi",
          title: "GençTek Usta Dedektif Belgesi"
        });
        setDownloadMessage("Belge paylaşım/kaydetme ekranına gönderildi.");
        return;
      } catch (shareError) {
        if (shareError?.name !== "AbortError") {
          setError(
            "Paylaşım başlatılamadı. Görsel olarak aç seçeneğini deneyebilirsin."
          );
          return;
        }
      }
    }

    const link = document.createElement("a");
    const objectUrl = window.URL.createObjectURL(image.blob);

    link.download = fileName;
    link.href = objectUrl;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 4000);
    setDownloadMessage(
      "İndirme başlatıldı. Tarayıcı indirmeyi açmazsa Görsel Olarak Aç / Kaydet seçeneğini kullan."
    );
  };

  const openImage = async () => {
    const imageWindow = window.open("", "_blank");

    if (!imageWindow) {
      setError(
        "Görsel açılamadı. Tarayıcı açılır pencere iznini kontrol edebilirsin."
      );
      return;
    }

    imageWindow.document.title = "GençTek Usta Dijital Dedektif Belgesi";
    imageWindow.document.body.innerHTML =
      '<main id="certificate-preview-root">Belge hazırlanıyor...</main>';
    imageWindow.document.body.style.margin = "0";
    imageWindow.document.body.style.background = "#071421";

    const style = imageWindow.document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; background: #071421; }
      #certificate-preview-root {
        align-items: center;
        color: #ffffff;
        display: flex;
        justify-content: center;
        min-height: 100vh;
        overflow: auto;
        padding: 14px;
        width: 100vw;
      }
      #certificate-preview-root img {
        display: block;
        height: auto;
        max-height: calc(100vh - 28px);
        max-width: calc(100vw - 28px);
        object-fit: contain;
        width: auto;
      }
    `;
    imageWindow.document.head.appendChild(style);

    const image = await getCertificateImage();
    if (!image) {
      imageWindow.close();
      return;
    }

    const img = imageWindow.document.createElement("img");
    img.alt = "GençTek Usta Dijital Dedektif Belgesi";
    img.src = image.dataUrl;

    const previewRoot = imageWindow.document.getElementById("certificate-preview-root");
    previewRoot.textContent = "";
    previewRoot.appendChild(img);
    setDownloadMessage(
      "Görsel yeni sekmede açıldı. Mobilde görsele basılı tutarak kaydedebilirsin."
    );
  };

  return (
    <div className="badge-creator">
      {!badge && (
        <form className="identity-form" onSubmit={handleCreate}>
          <h2>Usta Dedektif Belgemi Oluştur</h2>
          <label htmlFor="detective-name">Ad Soyad:</label>
          <input
            id="detective-name"
            maxLength={MAX_NAME_LENGTH}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ad Soyad"
            value={name}
          />
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" type="submit">
            USTA DEDEKTİF BELGEMİ OLUŞTUR
          </button>
        </form>
      )}

      {badge && (
        <>
          <MasterCertificate badge={badge} cardRef={cardRef} />
          {isPreparing && <p className="download-status">Belge hazırlanıyor...</p>}
          {downloadMessage && <p className="download-status">{downloadMessage}</p>}
          {error && <p className="form-error">{error}</p>}
          <div className="certificate-actions">
            <button className="primary-button" onClick={downloadCard} type="button">
              Dijital Belgeyi İndir
            </button>
            <button className="secondary-button" onClick={openImage} type="button">
              Görsel Olarak Aç / Kaydet
            </button>
          </div>
        </>
      )}
    </div>
  );
}
