import { ThemeToggle } from '@/components'
import { Button, Text, View } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'

const getTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
    res.json()
  )
}

export default function Index() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  return (
    <View className="bg-background">
      {query.data?.map((todo: any) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
      <Button>
        <Text>Example</Text>
      </Button>
      <Text>Example</Text>
      <ThemeToggle />
    </View>
  )
}
