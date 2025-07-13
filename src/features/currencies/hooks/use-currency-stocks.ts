import getCurrencyStocks from '@/api/currency-stocks'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { CurrencyStock } from '@/types/api'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const useCurrencyStocks = (
  code: string,
  options?: Omit<
    UseQueryOptions<
      CurrencyStock[],
      Error,
      CurrencyStock[],
      readonly unknown[]
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: [queryKeys.currency, 'stocks', code],
    queryFn: () => getCurrencyStocks('2025-01-01', 365),
    refetchInterval: REFRESH_INTERVAL,
    ...options,
  })

export { useCurrencyStocks }
