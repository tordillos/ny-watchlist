import { Currency, CurrencySort } from '@/types/api'
import { CURRENCIES } from './lib/constants'

async function getCurrenciesList(sortBy?: CurrencySort): Promise<Currency[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (sortBy === 'name') {
    return CURRENCIES.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortBy === 'price') {
    return CURRENCIES.sort((a, b) => b.priceUsd - a.priceUsd)
  }

  if (sortBy === 'change') {
    return CURRENCIES.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr)
  }

  return CURRENCIES
}

export default getCurrenciesList
