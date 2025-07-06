import getCurrenciesList from '@/api/currencies-list'
import { CurrencyCard, CurrencyCardSkeleton, ErrorFallback } from '@/components'
import { EmptyState } from '@/components/empty-state'
import { H3, View } from '@/components/ui'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { RefreshControl } from 'react-native'

function CurrencyScreen() {
  const [refreshing, setRefreshing] = React.useState(false)

  const { data, refetch, isPending, isError, isSuccess } = useQuery({
    queryKey: [queryKeys.currenciesList],
    queryFn: getCurrenciesList,
    refetchInterval: REFRESH_INTERVAL,
  })

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [refetch])

  return (
    <FlashList
      className="mt-safe"
      ListHeaderComponent={<H3 className="mb-6">Stocks</H3>}
      ListEmptyComponent={
        <>
          {isPending && (
            <View className="gap-6">
              <CurrencyCardSkeleton />
              <CurrencyCardSkeleton />
              <CurrencyCardSkeleton />
              <CurrencyCardSkeleton />
            </View>
          )}
          {isError && <ErrorFallback onTryAgain={() => refetch()} />}
          {isSuccess && data.length === 0 && <EmptyState />}
        </>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      data={data}
      keyExtractor={(item) => item.code}
      ItemSeparatorComponent={() => <View className="h-6" />}
      renderItem={({ item }) => <CurrencyCard currency={item} />}
      estimatedItemSize={60}
    />
  )
}

export { CurrencyScreen }
