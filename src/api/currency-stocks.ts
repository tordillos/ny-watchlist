import { CurrencyStock } from '@/types/api'
import { generateStocks } from './lib/util'

function getCurrencyStocks(
  startDate: string,
  days: number,
  base: number = 50
): CurrencyStock[] {
  const stocks = generateStocks(startDate, days, base)

  return stocks
}

export default getCurrencyStocks
