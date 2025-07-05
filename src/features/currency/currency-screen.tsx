import { Text } from '@/components/ui'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'

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

function CurrencyScreen() {
  const query = useQuery<Todo[]>({ queryKey: ['todos'], queryFn: getTodos })

  return (
    <FlashList
      contentContainerClassName="pt-safe mx-5"
      data={query.data}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      estimatedItemSize={200}
    />
  )
}

export { CurrencyScreen }
