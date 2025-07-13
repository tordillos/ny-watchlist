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
  tint: '#f04d21',
  androidHeader: { dark: '#262626', light: '#fafafa' },
  viewBackground: { dark: '#404040', light: '#f5f5f5' },
  text: { dark: '#fafafa', light: '#262626' },
  cardBackground: { dark: '#525252', light: '#fff' },
  cardBorder: { dark: '#a1a1aa', light: '#a1a1aa' },
  success: { dark: '#7ee17e', light: '#085408' },
  error: { dark: '#c84c4c', light: '#9e1a1a' },
  infoCardActive: { dark: '#c4b5fd', light: '#8b5cf6' },
  buttonBackgroundColor: { dark: '#737373', light: '#e7e7e7' },
  buttonBorderColor: { dark: '#a3a3a3', light: 'white' },
  buttonUnderlayColor: { dark: '#8b5cf6', light: '#ddd6fe' },
} as const

export const REFRESH_INTERVAL = 5000
