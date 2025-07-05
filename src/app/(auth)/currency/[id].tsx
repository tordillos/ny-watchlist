import { Text, View } from '@/components/ui'
import { useLocalSearchParams } from 'expo-router'

export default function CurrencyId() {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>CurrencyId {id}</Text>
    </View>
  )
}
