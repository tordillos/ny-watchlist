import { Text, View } from '@/components/ui'
import { Stack } from 'expo-router'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center">
        <Text>This screen does not exist.</Text>
      </View>
    </>
  )
}
