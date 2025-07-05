import { Tabs } from 'expo-router'
import React from 'react'

import { Heart, House, Search, User } from '@/components/icons'
import { useTheme } from '@react-navigation/native'

export default function AuthLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      initialRouteName="currency"
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
        name="currency"
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null, // hide route
        }}
      />
    </Tabs>
  )
}
