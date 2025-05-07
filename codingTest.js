function solution(brown, yellow) {
  const sum = brown + yellow;
  let divisor1 = 1, divisor2 = 2;
  for (let i = 1; i <= Math.sqrt(sum); i++) {
    if (sum % i !== 0) continue;
    if ((i - 2) * (sum / i - 2) !== yellow) continue;
    divisor1 = sum / i;
    divisor2 = i;
  }
  return [divisor1, divisor2]
}