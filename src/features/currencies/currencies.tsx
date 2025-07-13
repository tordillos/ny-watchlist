import { ErrorFallback } from '@/components'
import { EmptyState } from '@/components/empty-state'
import { H3, View } from '@/components/ui'
import { useFiltersStore } from '@/stores/filters.store'
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { RefreshControl } from 'react-native'
import { CurrencyCard, CurrencyCardSkeleton } from './components'
import { SortBottomSheet } from './components/sort-bottom-sheet'
import { useCurrencies } from './hooks'

function CurrenciesScreen() {
  const { sortBy } = useFiltersStore()

  const [refreshing, setRefreshing] = React.useState(false)

  const { data, refetch, isPending, isError, isSuccess } = useCurrencies(sortBy)

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
      ListHeaderComponent={ListHeader}
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

function ListHeader() {
  return (
    <View className="flex-row  justify-between">
      <H3 className="mb-6">Stocks</H3>
      <SortBottomSheet />
    </View>
  )
}

export { CurrenciesScreen as CurrencyScreen }
