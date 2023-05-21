function round(num: number, round = 2) {
  if (num.toString().includes(".")) {
    return num.toFixed(round);
  }
  return num;
}

export default round;
