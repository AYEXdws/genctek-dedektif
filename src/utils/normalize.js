const turkishMap = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u"
};

export function normalizeInput(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (char) => turkishMap[char] || char)
    .replace(/\s+/g, "");
}

export function normalizeEmail(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (char) => turkishMap[char] || char);
}

export function normalizeLoose(value = "") {
  return normalizeInput(value).replace(/[{}_.-]/g, "");
}

export function normalizeFlag(value = "") {
  return normalizeInput(value)
    .replace(/^genctek/, "")
    .replace(/[{}]/g, "")
    .replace(/[_-]/g, "");
}

function isCorrectCrypto(value) {
  return normalizeInput(value) === "genctek";
}

function isCorrectSource(value) {
  const normalized = normalizeFlag(value);
  return normalized === "gorunmeyenyuz";
}

function isCorrectIdentity(value) {
  const email = normalizeInput(value?.email || "");
  const taskKey = normalizeInput(value?.taskKey || "");

  return (
    email === "ahmet.kurulay@gorev.genctek" &&
    taskKey === "ahmet0406merkur"
  );
}

function isCorrectPhysical(task, value) {
  return normalizeLoose(value) === normalizeLoose(task.expectedCode);
}

export function isCorrectAnswer(task, value) {
  if (task.type === "crypto") return isCorrectCrypto(value);
  if (task.type === "source") return isCorrectSource(value);
  if (task.type === "identity") return isCorrectIdentity(value);
  if (task.type === "physical") return isCorrectPhysical(task, value);
  return false;
}

export function isCorrectGateWord(value) {
  return normalizeInput(value) === "gorunmeyenyuz";
}

export function isCorrectMailCredentials({ email = "", key = "" }) {
  return (
    normalizeEmail(email) === "ahmet.kurulay@gorev.genctek" &&
    normalizeInput(key) === "ahmet0406merkur"
  );
}
