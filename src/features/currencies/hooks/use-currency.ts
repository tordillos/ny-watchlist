import getCurrency from '@/api/currency-by-code'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { Currency } from '@/types/api'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const useCurrency = (
  code: string,
  options?: Omit<
    UseQueryOptions<Currency, Error, Currency, readonly unknown[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: [queryKeys.currency, code],
    queryFn: () => getCurrency(code),
    refetchInterval: REFRESH_INTERVAL,
    ...options,
  })

export { useCurrency }
