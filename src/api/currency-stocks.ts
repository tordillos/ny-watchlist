import { CurrencyStock } from '@/types/api'

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function getCurrencyStocks(
  startDate: string,
  days: number,
  base: number = 50
): CurrencyStock[] {
  const stocks: CurrencyStock[] = []
  let prevClose = base

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Simulate open/close/high/low
    const open = prevClose + randomBetween(-1, 1)
    let high = open + randomBetween(0, 2)
    let low = open - randomBetween(0, 2)
    let close = open + randomBetween(-1, 1)

    // Ensure logical order
    high = Math.max(high, open, close)
    low = Math.min(low, open, close)

    stocks.push({
      date: date.toISOString().slice(0, 10),
      high: parseFloat(high.toFixed(4)),
      low: parseFloat(low.toFixed(4)),
      open: parseFloat(open.toFixed(4)),
      close: parseFloat(close.toFixed(4)),
    })

    prevClose = close
  }

  return stocks
}

export default getCurrencyStocks
