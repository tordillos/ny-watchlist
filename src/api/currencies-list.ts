import { Currency, CurrencySort } from '@/types/api'
import { randomPercentChange, randomUSD } from './lib/util'

async function getCurrenciesList(sortBy?: CurrencySort): Promise<Currency[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currencies = [
    {
      code: 'BTC',
      name: 'Bitcoin',
      logo: 'https://picsum.photos/id/236/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'ETH',
      name: 'Ethereum',
      logo: 'https://picsum.photos/id/238/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'SOL',
      name: 'Solana',
      logo: 'https://picsum.photos/id/239/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'BNB',
      name: 'Binance Coin',
      logo: 'https://picsum.photos/id/240/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'ADA',
      name: 'Cardano',
      logo: 'https://picsum.photos/id/241/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'XRP',
      name: 'XRP',
      logo: 'https://picsum.photos/id/242/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'DOGE',
      name: 'Dogecoin',
      logo: 'https://picsum.photos/id/243/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'DOT',
      name: 'Polkadot',
      logo: 'https://picsum.photos/id/244/200/300',
      priceUsd: 25.31,
      changePercent24Hr: -2.7,
    },
    {
      code: 'AVAX',
      name: 'Avalanche',
      logo: 'https://picsum.photos/id/100/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'MATIC',
      name: 'Polygon',
      logo: 'https://picsum.photos/id/101/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'LTC',
      name: 'Litecoin',
      logo: 'https://picsum.photos/id/247/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'TRX',
      name: 'TRON',
      logo: 'https://picsum.photos/id/248/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'LINK',
      name: 'Chainlink',
      logo: 'https://picsum.photos/id/249/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'UNI',
      name: 'Uniswap',
      logo: 'https://picsum.photos/id/250/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
    {
      code: 'ATOM',
      name: 'Cosmos',
      logo: 'https://picsum.photos/id/251/200/300',
      priceUsd: randomUSD(),
      changePercent24Hr: randomPercentChange(),
    },
  ]

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
