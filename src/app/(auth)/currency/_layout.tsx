import { Stack } from 'expo-router'
import React from 'react'

export default function Home() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Currency',
        }}
      />
    </Stack>
  )
}
