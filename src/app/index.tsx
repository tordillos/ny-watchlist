import { Button, Text, View } from '@/components/ui'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const getTodos = async () => {
  return fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
    res.json()
  )
}

export default function Index() {
  const query = useQuery<Todo[]>({ queryKey: ['todos'], queryFn: getTodos })

  return (
    <View className="flex-1">
      <FlashList
        data={query.data}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        estimatedItemSize={200}
      />
      <Button>
        <Text>Button</Text>
      </Button>
    </View>
  )
}
