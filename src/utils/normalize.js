const turkishMap = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u"
};

export function normalizeInput(value) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (char) => turkishMap[char] || char)
    .replace(/\s+/g, "");
}

export function normalizeFlag(value) {
  return normalizeInput(value).replace(/[{}]/g, "").replace(/_/g, "-");
}

export function isCorrectAnswer(task, value) {
  const normalized = normalizeInput(value);

  if (task.answerType === "crypto") {
    return normalized === "genctek";
  }

  if (task.answerType === "source") {
    return normalizeFlag(value) === normalizeFlag("GençTek{Kaynak_Katmani}");
  }

  if (task.answerType === "trace") {
    const compact = normalized.replace("gt-", "");
    return compact === "saturn_42" || compact === "saturn-42";
  }

  if (task.answerType === "algorithm") {
    return ["4", "4.", "dorduncu", "dort", "adim4", "4.adim"].includes(
      normalized
    );
  }

  return false;
}
