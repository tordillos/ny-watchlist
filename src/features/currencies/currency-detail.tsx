import { useLocalSearchParams } from 'expo-router'
import React from 'react'

import { ErrorFallback } from '@/components'
import { ScrollView } from 'react-native-gesture-handler'
import { CurrencyDetailChart, CurrencyDetailChartSkeleton } from './components'
import { useCurrency, useCurrencyStocks } from './hooks'

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()

  const {
    data: stocks,
    isSuccess: isStocksSuccess,
    isPending: isStocksPending,
    isError: isStocksError,
    refetch: refetchStocks,
  } = useCurrencyStocks(id as string)

  const {
    data: currency,
    isSuccess: isCurrencySuccess,
    isPending: isCurrencyPending,
    isError: isCurrencyError,
    refetch: refetchCurrency,
  } = useCurrency(id as string)

  const isSuccess = isStocksSuccess && isCurrencySuccess
  const isPending = isStocksPending || isCurrencyPending
  const isError = isStocksError || isCurrencyError

  const handleTryAgain = () => {
    refetchStocks()
    refetchCurrency()
  }

  return (
    <ScrollView className="m-5 flex-1">
      {isPending && <CurrencyDetailChartSkeleton />}
      {isSuccess && <CurrencyDetailChart stocks={stocks} currency={currency} />}
      {isError && <ErrorFallback onTryAgain={handleTryAgain} />}
    </ScrollView>
  )
}

export { CurrencyDetailScreen }
