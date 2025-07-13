export type Currency = {
  code: string
  name: string
  logo: string
  priceUsd: number
  changePercent24Hr: number
}

export type CurrencySort = 'name' | 'price' | 'change'

export interface CurrencyStock extends Record<string, unknown> {
  date: string
  high: number
  low: number
  open: number
  close: number
}
