import { ThemeToggle } from '@/components'
import { Button, Text, View } from '@/components/ui'

export default function Index() {
  return (
    <View className="bg-background">
      <Button>
        <Text>Example</Text>
      </Button>
      <Text>Example</Text>
      <ThemeToggle />
    </View>
  )
}
