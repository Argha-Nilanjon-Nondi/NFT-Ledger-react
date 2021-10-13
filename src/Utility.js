export function capitalizeSentence(string) {
  let sentence = "";
  let first = string[0]
  sentence += first.toUpperCase();
  sentence += string.slice(1);
  return sentence;
}
