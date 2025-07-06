import { Text, View } from '@/components/ui'
import { ChartCandlestick } from './icons'

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-5">
      <ChartCandlestick size={60} className="text-foreground" />
      <Text>No results found</Text>
    </View>
  )
}

export { EmptyState }
