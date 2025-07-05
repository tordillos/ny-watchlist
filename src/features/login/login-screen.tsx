import { Button, Text, View } from '@/components/ui'
import { router } from 'expo-router'
import React from 'react'

function LoginScreen() {
  return (
    <View className="flex-1">
      <Button
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
