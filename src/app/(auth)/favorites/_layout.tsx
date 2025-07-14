import { CurrencyHeaderFavorite } from '@/components'
import { Stack } from 'expo-router'
import React from 'react'

export default function Favorites() {
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
        options={({ route }) => ({
          title: (route.params as any)?.name ?? 'Currency',
          headerRight: () => (
            <CurrencyHeaderFavorite id={(route.params as any)?.id} />
          ),
        })}
      />
    </Stack>
  )
}
