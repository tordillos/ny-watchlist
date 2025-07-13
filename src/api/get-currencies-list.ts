import { Currency, CurrencySort } from '@/types/api'
import { CURRENCIES } from './lib/constants'
import { randomPercentChange, randomUSD } from './lib/util'

async function getCurrenciesList(sortBy?: CurrencySort): Promise<Currency[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currencies = [...CURRENCIES].map((currency) => ({
    ...currency,
    priceUsd: randomUSD(),
    changePercent24Hr: randomPercentChange(),
  }))

  if (sortBy === 'name') {
    return currencies.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortBy === 'price') {
    return currencies.sort((a, b) => b.priceUsd - a.priceUsd)
  }

  if (sortBy === 'change') {
    return currencies.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr)
  }

  return currencies
}

export default getCurrenciesList
