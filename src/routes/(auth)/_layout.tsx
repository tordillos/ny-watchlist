import { Tabs } from 'expo-router'
import React from 'react'

import { House, Search, Star, User } from '@/components/icons'
import { useTheme } from '@react-navigation/native'

export default function AuthLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      initialRouteName="(home)"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: 'Search',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: 'Favorites',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Star color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: 'Profile',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  )
}
