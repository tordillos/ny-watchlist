import { Stack } from 'expo-router'

import { useColorScheme } from '@/hooks/useColorScheme'
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { NAV_THEME } from '@/lib/constants'
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Appearance, Platform } from 'react-native'

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
}

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
})

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme()

  usePlatformSpecificSetup()

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack />
    </ThemeProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background')
  }, [])
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light')
  }, [])
}

function noop() {}
