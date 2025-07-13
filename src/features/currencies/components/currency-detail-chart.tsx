import { H2, Muted, Skeleton, View } from '@/components/ui'
import { useColorScheme } from '@/hooks/useColorScheme'
import * as Haptics from 'expo-haptics'
import React from 'react'
import { useDerivedValue } from 'react-native-reanimated'
import { CartesianChart, useChartPressState } from 'victory-native'

import { formatDate } from '@/api/lib/util'
import { AnimatedText } from '@/components/ui/reanimated'
import { STOCK_THEME } from '@/lib/constants'
import { Currency, CurrencyStock } from '@/types/api'
import { ActiveValueIndicator, StockArea } from '../components'
import { PercentChange } from './percent-change'

const initChartPressState = { x: 0, y: { high: 0 } }

interface CurrencyDetailChartProps {
  stocks: CurrencyStock[]
  currency: Currency
}

const CurrencyDetailChart = ({
  stocks,
  currency,
}: CurrencyDetailChartProps) => {
  const { isDarkColorScheme: isDark } = useColorScheme()

  const colorPrefix = isDark ? 'dark' : 'light'

  const { state: firstTouch, isActive: isFirstPressActive } =
    useChartPressState(initChartPressState)

  const { state: secondTouch, isActive: isSecondPressActive } =
    useChartPressState(initChartPressState)

  // On activation of gesture, play haptic feedback
  React.useEffect(() => {
    if (isFirstPressActive) Haptics.selectionAsync().catch(() => null)
  }, [isFirstPressActive])

  React.useEffect(() => {
    if (isSecondPressActive) Haptics.selectionAsync().catch(() => null)
  }, [isSecondPressActive])

  // Active date display
  const activeDate = useDerivedValue(() => {
    if (!isFirstPressActive) return ''

    // One-touch only
    if (!isSecondPressActive) return formatDate(firstTouch.x.value.value)
    // Two-touch
    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch
    const late = early === firstTouch ? secondTouch : firstTouch

    return `${formatDate(early.x.value.value)} - ${formatDate(
      late.x.value.value
    )}`
  })

  // Active high display
  const activeHigh = useDerivedValue(() => {
    if (!isFirstPressActive) return `$${currency.priceUsd}`

    // One-touch
    if (!isSecondPressActive)
      return '$' + firstTouch.y.high.value.value.toFixed(2)

    // Two-touch
    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch
    const late = early === firstTouch ? secondTouch : firstTouch

    return `$${early.y.high.value.value.toFixed(
      2
    )} – $${late.y.high.value.value.toFixed(2)}`
  })

  // Determine if the selected range has a positive delta, which will be used to conditionally pick colors.
  const isDeltaPositive = useDerivedValue(() => {
    if (!isSecondPressActive) return true

    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch
    const late = early === firstTouch ? secondTouch : firstTouch
    return early.y.high.value.value < late.y.high.value.value
  })

  // Indicator color based on delta
  const indicatorColor = useDerivedValue<string>(() => {
    if (!(isFirstPressActive && isSecondPressActive)) return STOCK_THEME.tint
    return isDeltaPositive.value
      ? STOCK_THEME.success[colorPrefix]
      : STOCK_THEME.error[colorPrefix]
  })

  const chartData: CurrencyStock[] = stocks ?? []

  return (
    <View className="flex-1">
      <View className="flex-1 gap-2">
        <View className="flex-row items-center gap-2">
          <H2 className="pb-0">{currency.name}</H2>
          <Muted>| {currency.code}</Muted>
        </View>
        <AnimatedText
          text={activeHigh}
          className="flex-1 text-left text-3xl font-bold text-foreground"
        />
        <PercentChange
          className="text-md font-bold"
          value={currency.changePercent24Hr}
        />

        <AnimatedText
          text={activeDate}
          className="w-full text-left text-muted-foreground"
        />
      </View>
      <View className="h-96 w-full flex-1 py-5">
        <CartesianChart
          data={chartData}
          xKey="date"
          yKeys={['high']}
          // @ts-ignore
          chartPressState={[firstTouch, secondTouch]}
          axisOptions={{
            tickCount: 5,
            labelOffset: { x: 0, y: 0 },
            labelPosition: { x: 'inset', y: 'inset' },
            formatXLabel: (ms) => '',
            formatYLabel: (v) => '',
            lineColor: '#00000000',
          }}
          renderOutside={({ chartBounds }) => (
            <>
              {isFirstPressActive && (
                <>
                  <ActiveValueIndicator
                    xPosition={firstTouch.x.position}
                    yPosition={firstTouch.y.high.position}
                    bottom={chartBounds.bottom}
                    top={chartBounds.top}
                    lineColor={STOCK_THEME.lineColor[colorPrefix]}
                    indicatorColor={indicatorColor}
                  />
                </>
              )}
              {isSecondPressActive && (
                <>
                  <ActiveValueIndicator
                    xPosition={secondTouch.x.position}
                    yPosition={secondTouch.y.high.position}
                    bottom={chartBounds.bottom}
                    top={chartBounds.top}
                    lineColor={STOCK_THEME.lineColor[colorPrefix]}
                    indicatorColor={indicatorColor}
                    topOffset={16}
                  />
                </>
              )}
            </>
          )}
        >
          {/* 👇 render function exposes various data, such as points. */}
          {({ chartBounds, points }) => (
            <>
              <StockArea
                points={points.high}
                isWindowActive={isFirstPressActive && isSecondPressActive}
                isDeltaPositive={isDeltaPositive}
                startX={firstTouch.x.position}
                endX={secondTouch.x.position}
                {...chartBounds}
              />
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  )
}

function CurrencyDetailChartSkeleton() {
  return (
    <View className="flex-1 gap-5">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-60 w-full" />
    </View>
  )
}

export { CurrencyDetailChart, CurrencyDetailChartSkeleton }
