import getCurrenciesList from '@/api/get-currencies-list'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { Currency, CurrencySort } from '@/types/api'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

const useFavoritesCurrencies = (
  sortBy?: CurrencySort,
  options?: Omit<
    UseQueryOptions<Currency[], Error, Currency[], readonly unknown[]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: [queryKeys.currenciesList, sortBy],
    queryFn: () => getCurrenciesList(sortBy),
    refetchInterval: REFRESH_INTERVAL,
    ...options,
  })
}

export { useFavoritesCurrencies }
