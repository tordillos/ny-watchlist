import getCurrenciesList from '@/api/currencies-list'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { CurrencySort } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

const useCurrencies = (sortBy?: CurrencySort) =>
  useQuery({
    queryKey: [queryKeys.currenciesList, sortBy],
    queryFn: () => getCurrenciesList(sortBy),
    refetchInterval: REFRESH_INTERVAL,
  })

export { useCurrencies }
