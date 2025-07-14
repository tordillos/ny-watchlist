import { useColorScheme } from '@/hooks/useColorScheme'
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { NAV_THEME } from '@/lib/constants'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Appearance, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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

const queryClient = new QueryClient()

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme()

  usePlatformSpecificSetup()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <BottomSheetModalProvider>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
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
