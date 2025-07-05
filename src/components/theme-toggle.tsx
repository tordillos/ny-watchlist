import { MoonStar } from '@/components/icons/moon-start'
import { Sun } from '@/components/icons/sun'
import { useColorScheme } from '@/hooks/useColorScheme'
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { Pressable, View } from 'react-native'

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? 'light' : 'dark'
    setColorScheme(newTheme)
    setAndroidNavigationBar(newTheme)
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="active:opacity-70 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      <View className="aspect-square flex-1 items-start justify-center pt-0.5 web:px-5">
        {isDarkColorScheme ? (
          <MoonStar className="text-foreground" size={23} strokeWidth={1.25} />
        ) : (
          <Sun className="text-foreground" size={24} strokeWidth={1.25} />
        )}
      </View>
    </Pressable>
  )
}
