import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import { TextProps } from 'react-native'

type PercentChangeProps = TextProps & {
  value: number
  className?: string
}

const PercentChange = ({ value, className, ...props }: PercentChangeProps) => {
  const isPositive = value >= 0
  return (
    <Text
      className={cn(
        isPositive ? 'text-primary' : 'text-destructive',
        className
      )}
      {...props}
    >
      {isPositive && '+'}
      {value.toFixed(2)}%
    </Text>
  )
}

export { PercentChange }
