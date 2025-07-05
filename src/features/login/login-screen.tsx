import { Button, Text, View } from '@/components/ui'
import { Lead } from '@/components/ui/typography'
import { router } from 'expo-router'
import React from 'react'

function LoginScreen() {
  return (
    <View className="m-safe flex-1 items-center justify-center gap-5 px-5 ">
      <Text className="text-center text-3xl font-bold">Welcome! 👋</Text>
      <Lead className="text-center">
        Access your personalized watchlist by signing in below
      </Lead>

      <Button
        className="w-full"
        onPress={() => {
          router.replace('/(auth)')
        }}
      >
        <Text>Login</Text>
      </Button>
    </View>
  )
}

export { LoginScreen }
