import React, { useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import DigitalCertificate from "./DigitalCertificate";

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

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
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

    setError("");
    onCreateBadge(cleanName);
  };

  const getFileName = () => {
    return `genctek-dijital-dedektif-belgesi-${badge.badgeId}.png`;
  };

  const getCaptureOptions = (card) => {
    const rect = card.getBoundingClientRect();
    const width = Math.ceil(card.scrollWidth || rect.width);
    const height = Math.ceil(card.scrollHeight || rect.height);

    return {
      cacheBust: true,
      height,
      pixelRatio: 3,
      backgroundColor: "#071421",
      style: {
        height: `${height}px`,
        maxWidth: "none",
        transform: "none",
        width: `${width}px`
      },
      width
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

      const options = getCaptureOptions(card);
      let blob = await toBlob(card, options);
      let dataUrl = "";

      if (!blob) {
        dataUrl = await toPng(card, options);
        blob = dataUrlToBlob(dataUrl);
      } else {
        dataUrl = await blobToDataUrl(blob);
      }

      setImageBlob(blob);
      setImageUrl(dataUrl);
      return { blob, dataUrl };
    } catch {
      setError(
        "İndirme başlatılamadı. Görsel olarak aç seçeneğini deneyebilirsin."
      );
      return null;
    } finally {
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
          text: "GençTek Dijital Dedektif Görev Belgesi",
          title: "GençTek Dijital Belge"
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

    imageWindow.document.title = badge.badgeId;
    imageWindow.document.body.style.background = "#071421";
    imageWindow.document.body.style.margin = "0";
    imageWindow.document.body.style.minHeight = "100vh";
    imageWindow.document.body.style.display = "grid";
    imageWindow.document.body.style.placeItems = "center";
    imageWindow.document.body.style.padding = "16px";
    imageWindow.document.body.textContent = "Belge hazırlanıyor...";

    const image = await getCertificateImage();
    if (!image) {
      imageWindow.close();
      return;
    }

    const img = imageWindow.document.createElement("img");
    img.alt = "GençTek Dijital Dedektif Görev Belgesi";
    img.src = image.dataUrl;
    img.style.background = "#071421";
    img.style.display = "block";
    img.style.height = "auto";
    img.style.maxWidth = "100%";

    imageWindow.document.body.textContent = "";
    imageWindow.document.body.appendChild(img);
    setDownloadMessage(
      "Görsel yeni sekmede açıldı. Mobilde görsele basılı tutarak kaydedebilirsin."
    );
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
          {downloadMessage && <p className="download-status">{downloadMessage}</p>}
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
