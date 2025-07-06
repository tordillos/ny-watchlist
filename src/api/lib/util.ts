export function randomUSD() {
  return Math.round(Math.random() * 100000 * 100) / 100
}

export function randomPercentChange() {
  return Math.random() * 200 - 100
}
