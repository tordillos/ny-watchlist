import { Button, Text, View } from '@/components/ui'

import { router } from 'expo-router'

export default function Index() {
  return (
    <View>
      <Text>Index</Text>
      <Button onPress={() => router.push('/currency/1')}>
        <Text>Go to currency/1</Text>
      </Button>
    </View>
  )
}
