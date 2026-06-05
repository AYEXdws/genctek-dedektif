export const turkishAlphabet = [
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z"
];

export function caesarEncrypt(text, shift) {
  return text
    .toLocaleUpperCase("tr-TR")
    .split("")
    .map((char) => {
      const index = turkishAlphabet.indexOf(char);
      if (index === -1) return char;
      return turkishAlphabet[(index + shift) % turkishAlphabet.length];
    })
    .join("");
}
