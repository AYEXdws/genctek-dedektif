export const CERTIFICATE_WIDTH = 1346;
export const CERTIFICATE_HEIGHT = 898;
export const CERTIFICATE_PIXEL_RATIO = 2;
export const CERTIFICATE_OUTPUT_WIDTH =
  CERTIFICATE_WIDTH * CERTIFICATE_PIXEL_RATIO;
export const CERTIFICATE_OUTPUT_HEIGHT =
  CERTIFICATE_HEIGHT * CERTIFICATE_PIXEL_RATIO;
export const CERTIFICATE_TEMPLATE_SRC =
  "/assets/usta-dedektif-belgesi-template.png";

const NAME_BOX = {
  centerX: 673,
  centerY: 494,
  maxWidth: 540,
  maxHeight: 58
};

function normalizeDisplayName(value = "") {
  return String(value).trim().replace(/\s+/g, " ").toLocaleUpperCase("tr-TR");
}

function measureSpacedText(context, text, letterSpacing) {
  if (!text) return 0;
  return (
    context.measureText(text).width + Math.max(0, text.length - 1) * letterSpacing
  );
}

function drawSpacedText(context, text, centerX, y, letterSpacing) {
  const width = measureSpacedText(context, text, letterSpacing);
  let x = centerX - width / 2;

  for (const char of text) {
    context.fillText(char, x, y);
    x += context.measureText(char).width + letterSpacing;
  }
}

function getLineCandidates(words) {
  if (words.length <= 1) return [[words.join(" ")]];

  const candidates = [[words.join(" ")]];

  for (let index = 1; index < words.length; index += 1) {
    candidates.push([
      words.slice(0, index).join(" "),
      words.slice(index).join(" ")
    ]);
  }

  return candidates;
}

function chooseBestLayout(context, candidates, fontSize, lineHeight, letterSpacing, maxWidth) {
  let best = null;

  for (const lines of candidates) {
    if (lines.length > 2) continue;

    const lineWidths = lines.map((line) =>
      measureSpacedText(context, line, letterSpacing)
    );
    const fitsWidth = lineWidths.every((width) => width <= maxWidth);

    if (!fitsWidth) continue;

    const widestLine = Math.max(...lineWidths);
    const narrowestLine = Math.min(...lineWidths);
    const balancePenalty =
      lines.length === 1 ? 0 : Math.abs(widestLine - narrowestLine);
    const score =
      lines.length * 100000 +
      balancePenalty * 8 +
      Math.abs(maxWidth * 0.72 - widestLine);

    if (!best || score < best.score) {
      best = {
        fontSize,
        letterSpacing,
        lineHeight,
        lines,
        score
      };
    }
  }

  return best;
}

export function getCertificateNameLayout(name, scale = 1) {
  const displayName = normalizeDisplayName(name);
  const words = displayName.split(" ").filter(Boolean);
  const candidates = getLineCandidates(words);
  const scratchCanvas = document.createElement("canvas");
  const context = scratchCanvas.getContext("2d");
  const maxWidth = NAME_BOX.maxWidth * scale;
  const maxHeight = NAME_BOX.maxHeight * scale;

  let bestLayout = {
    fontSize: 18 * scale,
    letterSpacing: 1.2 * scale,
    lineHeight: 22 * scale,
    lines: [displayName]
  };

  for (let fontSize = 36 * scale; fontSize >= 18 * scale; fontSize -= scale) {
    const lineHeight = fontSize * 1.14;
    const letterSpacing = Math.max(0.7 * scale, fontSize * 0.055);

    context.font = `900 ${fontSize}px Georgia, "Times New Roman", serif`;

    const oneLineHeight = fontSize;
    const twoLineHeight = lineHeight * 2;
    const heightAllowedCandidates = candidates.filter((lines) =>
      lines.length === 1 ? oneLineHeight <= maxHeight : twoLineHeight <= maxHeight
    );
    const best = chooseBestLayout(
      context,
      heightAllowedCandidates,
      fontSize,
      lineHeight,
      letterSpacing,
      maxWidth
    );

    if (best) {
      const { score, ...layout } = best;
      return layout;
    }
  }

  return bestLayout;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (!canvas.toBlob) {
      try {
        const dataUrl = canvas.toDataURL("image/png");
        const [header, data] = dataUrl.split(",");
        const mimeType = header.match(/:(.*?);/)?.[1] || "image/png";
        const binary = window.atob(data);
        const bytes = new Uint8Array(binary.length);

        for (let index = 0; index < binary.length; index += 1) {
          bytes[index] = binary.charCodeAt(index);
        }

        resolve(new Blob([bytes], { type: mimeType }));
      } catch (error) {
        reject(error);
      }
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Belge görseli oluşturulamadı."));
      }
    }, "image/png");
  });
}

export async function renderCertificateImage(name) {
  const template = await loadImage(CERTIFICATE_TEMPLATE_SRC);
  const canvas = document.createElement("canvas");
  const scale = CERTIFICATE_PIXEL_RATIO;

  canvas.width = CERTIFICATE_OUTPUT_WIDTH;
  canvas.height = CERTIFICATE_OUTPUT_HEIGHT;

  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(template, 0, 0, canvas.width, canvas.height);

  const layout = getCertificateNameLayout(name, scale);
  const centerX = NAME_BOX.centerX * scale;
  const centerY = NAME_BOX.centerY * scale;
  const totalHeight =
    layout.lines.length === 1
      ? layout.fontSize
      : layout.lineHeight * (layout.lines.length - 1) + layout.fontSize;
  const firstY =
    centerY - totalHeight / 2 + layout.fontSize / 2 + (layout.lines.length > 1 ? 2 * scale : 0);

  context.save();
  context.font = `900 ${layout.fontSize}px Georgia, "Times New Roman", serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#f7f0e9";
  context.shadowColor = "rgba(0, 0, 0, 0.92)";
  context.shadowBlur = 14 * scale;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 3 * scale;

  layout.lines.forEach((line, index) => {
    drawSpacedText(
      context,
      line,
      centerX,
      firstY + index * layout.lineHeight,
      layout.letterSpacing
    );
  });

  context.restore();

  const dataUrl = canvas.toDataURL("image/png");
  const blob = await canvasToBlob(canvas);

  return { blob, dataUrl };
}
