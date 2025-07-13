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
