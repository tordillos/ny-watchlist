import { Currency } from '@/types/api'
import { CURRENCIES } from './lib/constants'
import { randomPercentChange, randomUSD } from './lib/util'

async function getCurrency(code: string): Promise<Currency> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currency = CURRENCIES.find((currency) => currency.code === code)

  if (!currency) {
    throw new Error('Currency not found')
  }

  return {
    ...currency,
    priceUsd: randomUSD(),
    changePercent24Hr: randomPercentChange(),
  }
}

export default getCurrency
