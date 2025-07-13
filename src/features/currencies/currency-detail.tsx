import { useLocalSearchParams } from 'expo-router'
import React from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { CurrencyDetailChart } from './components'
import { useCurrency, useCurrencyStocks } from './hooks'

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()

  const { data: stocks, isSuccess: isStocksSuccess } = useCurrencyStocks(
    id as string
  )

  const { data: currency, isSuccess: isCurrencySuccess } = useCurrency(
    id as string
  )

  const isSuccess = isStocksSuccess && isCurrencySuccess

  return (
    <ScrollView className="m-5 flex-1">
      {isSuccess && <CurrencyDetailChart stocks={stocks} currency={currency} />}
    </ScrollView>
  )
}

export { CurrencyDetailScreen }
