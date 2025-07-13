export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(160 65% 52%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(220 26% 14%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(220 26% 14%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(160 65% 52%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
}

export const STOCK_THEME = {
  tint: '#35d49f',
  text: { dark: '#fafafa', light: '#09090b' },
  success: { dark: '#35d49f', light: '#35d49f' },
  error: { dark: '#dc2828', light: '#ef4444' },
  lineColor: { dark: '#71717a', light: '#d4d4d8' },
} as const

export const REFRESH_INTERVAL = 5000
