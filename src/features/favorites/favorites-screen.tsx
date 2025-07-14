import { ErrorFallback } from '@/components'
import { EmptyState } from '@/components/empty-state'
import { H3, View } from '@/components/ui'
import useFavoritesStore from '@/stores/favorites.store'
import { useFiltersStore } from '@/stores/filters.store'
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { RefreshControl } from 'react-native'

import { CurrencyCard, CurrencyCardSkeleton } from './components'
import { useFavoritesCurrencies } from './hooks'

function FavoritesScreen() {
  const { favorites } = useFavoritesStore()
  const { sortBy } = useFiltersStore()

  const [refreshing, setRefreshing] = React.useState(false)

  const { data, refetch, isPending, isError, isSuccess } =
    useFavoritesCurrencies(sortBy)

  const favoritesCurrencies = React.useMemo(
    () => data?.filter((currency) => favorites.includes(currency.code)),
    [data, favorites]
  )

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
          {isSuccess && favoritesCurrencies?.length === 0 && (
            <View className="h-[70vh]">
              <EmptyState />
            </View>
          )}
        </>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      data={favoritesCurrencies}
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
      <H3 className="mb-6">Favorites</H3>
    </View>
  )
}

export { FavoritesScreen }
