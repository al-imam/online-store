function capitalize(word: string | null | undefined) {
  if (word === null || word === undefined) return "";
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export default capitalize;
