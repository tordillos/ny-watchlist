import { Skeleton, Text, View } from '@/components/ui'
import { Currency } from '@/types/api'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { PercentChange } from './percent-change'

type CurrencyCardProps = {
  currency: Currency
}
function CurrencyCard({ currency }: CurrencyCardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/(auth)/home/[id]',
      params: {
        id: currency.code,
        name: currency.name,
      },
    })
  }

  return (
    <Pressable
      onPress={handlePress}
      className="h-13 flex-row items-center justify-between gap-5"
    >
      <View className="flex-row items-center justify-center gap-5">
        <Image
          source={currency.logo}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          contentFit="cover"
          transition={1000}
        />
        <View>
          <Text className="font-bold">{currency.code}</Text>
          <Text className="text-muted-foreground">{currency.name}</Text>
        </View>
      </View>
      <View>
        <Text className="text-right text-xl font-bold">
          ${currency.priceUsd}
        </Text>
        <PercentChange
          className="text-right"
          value={currency.changePercent24Hr}
        />
      </View>
    </Pressable>
  )
}

function CurrencyCardSkeleton() {
  return (
    <View className="h-13 flex-row items-center gap-5">
      <Skeleton className="h-10 w-10 rounded-full" />
      <View className="flex-1 gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </View>
    </View>
  )
}

export { CurrencyCard, CurrencyCardSkeleton }
