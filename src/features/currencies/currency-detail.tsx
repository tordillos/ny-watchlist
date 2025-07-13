import { H3, View } from '@/components/ui'
import { useColorScheme } from '@/hooks/useColorScheme'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useDerivedValue } from 'react-native-reanimated'
import { CartesianChart, useChartPressState } from 'victory-native'

import { formatDate } from '@/api/lib/util'
import { AnimatedText } from '@/components/ui/reanimated'
import { STOCK_THEME } from '@/lib/constants'
import { CurrencyStock } from '@/types/api'
import { ScrollView } from 'react-native-gesture-handler'
import { ActiveValueIndicator, StockArea } from './components'
import { useCurrency, useCurrencyStocks } from './hooks'

const initChartPressState = { x: 0, y: { high: 0 } }

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()

  const { data: stocks, isSuccess, isLoading } = useCurrencyStocks(id as string)

  const { data: currency } = useCurrency(id as string)

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
    if (!isFirstPressActive) return 'Single or multi-touch the chart'

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
    if (!isFirstPressActive) return '—'

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

  const chartData: CurrencyStock[] = isLoading ? [] : (stocks ?? [])

  return (
    <ScrollView className="m-5 flex-1">
      <View className="flex-1 gap-2">
        <H3>{currency?.name}</H3>
        <AnimatedText
          text={activeHigh}
          className="w-full text-left text-2xl font-bold text-foreground"
        />
        <AnimatedText
          text={activeDate}
          className="w-full text-left text-foreground"
        />
      </View>
      <View className="h-96 w-full flex-1 py-5">
        {isSuccess && (
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
        )}
      </View>
    </ScrollView>
  )
}

export { CurrencyDetailScreen }
