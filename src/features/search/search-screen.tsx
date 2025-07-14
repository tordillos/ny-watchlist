import { ErrorFallback } from '@/components'
import { EmptyState } from '@/components/empty-state'
import { H3, Input, View } from '@/components/ui'
import { useFiltersStore } from '@/stores/filters.store'
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { RefreshControl } from 'react-native'

import { CurrencyCard, CurrencyCardSkeleton } from './components'
import { useFavoritesCurrencies } from './hooks'

function SearchScreen() {
  const [value, setValue] = React.useState('')

  const onChangeText = (text: string) => {
    setValue(text)
  }

  const { sortBy } = useFiltersStore()

  const [refreshing, setRefreshing] = React.useState(false)

  const { data, refetch, isPending, isError, isSuccess } =
    useFavoritesCurrencies(sortBy)

  const favoritesCurrencies = React.useMemo(
    () =>
      data?.filter(
        (currency) =>
          currency.name.toLowerCase().includes(value.toLowerCase()) ||
          currency.code.toLowerCase().includes(value.toLowerCase())
      ),
    [data, value]
  )

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [refetch])

  return (
    <View className="mt-safe flex-1">
      <ListHeader value={value} onChangeText={onChangeText} />
      <FlashList
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
    </View>
  )
}

type ListHeaderProps = {
  value: string
  onChangeText: (text: string) => void
}
function ListHeader({ value, onChangeText }: ListHeaderProps) {
  return (
    <View className="mb-5 flex-col gap-5 px-5">
      <H3>Search</H3>
      <Input
        autoCorrect={false}
        className="w-full"
        placeholder="Search currencies"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export { SearchScreen }
