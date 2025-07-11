export type Currency = {
  code: string
  name: string
  logo: string
  priceUsd: number
  changePercent24Hr: number
}

export type CurrencySort = 'name' | 'price' | 'change'
