import getCurrency from '@/api/currency-by-code'
import { REFRESH_INTERVAL } from '@/lib/constants'
import { queryKeys } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'

const useCurrency = (code: string) =>
  useQuery({
    queryKey: [queryKeys.currency, code],
    queryFn: () => getCurrency(code),
    refetchInterval: REFRESH_INTERVAL,
  })

export { useCurrency }
