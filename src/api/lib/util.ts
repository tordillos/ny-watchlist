import { CurrencyStock } from '@/types/api'

export function randomUSD() {
  return Math.round(Math.random() * 100000 * 100) / 100
}

export function randomPercentChange() {
  return Math.random() * 200 - 100
}

export const formatDate = (ms: number) => {
  'worklet'

  const date = new Date(ms)
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
  }
  const formattedDate = date.toLocaleDateString('en-GB', options)

  return formattedDate
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function generateStocks(
  startDate: string,
  days: number,
  base: number = 50
): CurrencyStock[] {
  const stocks: CurrencyStock[] = []
  let prevClose = base

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const open = prevClose + randomBetween(-1, 1)
    let high = open + randomBetween(0, 2)
    let low = open - randomBetween(0, 2)
    let close = open + randomBetween(-1, 1)

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
