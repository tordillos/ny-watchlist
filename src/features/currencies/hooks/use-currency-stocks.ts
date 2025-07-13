import getCurrencyStocks from '@/api/currency-stocks'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'

const useCurrencyStocks = (code: string) =>
  useQuery({
    queryKey: [queryKeys.currency, 'stocks', code],
    queryFn: () => getCurrencyStocks('2025-01-01', 365),
    refetchInterval: REFRESH_INTERVAL,
  })

export { useCurrencyStocks }
