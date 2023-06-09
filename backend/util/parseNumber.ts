export default function (num: string, fallback: number) {
  const n = parseFloat(num);
  if (!isNaN(n)) return n;
  return fallback;
}
