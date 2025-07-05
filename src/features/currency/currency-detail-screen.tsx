import { Text, View } from '@/components/ui'
import { useLocalSearchParams } from 'expo-router'

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>CurrencyId {id}</Text>
    </View>
  )
}

export { CurrencyDetailScreen }
