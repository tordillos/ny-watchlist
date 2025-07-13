import data from '@/api/currency-stocks.json'
import { H3, View } from '@/components/ui'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
  Circle,
  Group,
  LinearGradient,
  Path,
  Skia,
  Line as SkiaLine,
  vec,
} from '@shopify/react-native-skia'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'
import {
  CartesianChart,
  ChartBounds,
  PointsArray,
  useAreaPath,
  useChartPressState,
  useLinePath,
} from 'victory-native'

import { formatDate } from '@/api/lib/util'
import { AnimatedText } from '@/components/ui/reanimated'
import { STOCK_THEME } from '@/lib/constants'
import { ScrollView } from 'react-native-gesture-handler'

const initChartPressState = { x: 0, y: { high: 0 } }

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()

  const { isDarkColorScheme: isDark } = useColorScheme()

  const colorPrefix = isDark ? 'dark' : 'light'

  const textColor = isDark ? STOCK_THEME.text.dark : STOCK_THEME.text.light
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

  return (
    <ScrollView className="m-5 flex-1">
      <View className="flex-1 gap-2">
        <H3>BTC - Bitcoin</H3>
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
        <CartesianChart
          data={data}
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
                    activeValue={firstTouch.y.high.value}
                    textColor={textColor}
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
                    activeValue={secondTouch.y.high.value}
                    textColor={textColor}
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
                colorPrefix={isDark ? 'dark' : 'light'}
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
    </ScrollView>
  )
}

const StockArea = ({
  colorPrefix,
  points,
  isWindowActive,
  isDeltaPositive,
  startX,
  endX,
  left,
  right,
  top,
  bottom,
}: {
  colorPrefix: 'dark' | 'light'
  points: PointsArray
  isWindowActive: boolean
  isDeltaPositive: SharedValue<boolean>
  startX: SharedValue<number>
  endX: SharedValue<number>
} & ChartBounds) => {
  const { path: areaPath } = useAreaPath(points, bottom)
  const { path: linePath } = useLinePath(points)

  const backgroundClip = useDerivedValue(() => {
    const path = Skia.Path.Make()

    if (isWindowActive) {
      path.addRect(Skia.XYWHRect(left, top, startX.value - left, bottom - top))
      path.addRect(
        Skia.XYWHRect(endX.value, top, right - endX.value, bottom - top)
      )
    } else {
      path.addRect(Skia.XYWHRect(left, top, right - left, bottom - top))
    }

    return path
  })

  const windowClip = useDerivedValue(() => {
    if (!isWindowActive) return Skia.Path.Make()

    const path = Skia.Path.Make()
    path.addRect(
      Skia.XYWHRect(startX.value, top, endX.value - startX.value, bottom - top)
    )
    return path
  })

  const windowLineColor = useDerivedValue(() => {
    return isDeltaPositive.value
      ? STOCK_THEME.success[colorPrefix]
      : STOCK_THEME.error[colorPrefix]
  })

  return (
    <>
      {/* Base */}
      <Group clip={backgroundClip} opacity={isWindowActive ? 0.3 : 1}>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={2}
          color={STOCK_THEME.tint}
        />
      </Group>
      {/* Clipped window */}
      {isWindowActive && (
        <Group clip={windowClip}>
          <Path path={areaPath} style="fill">
            <LinearGradient
              start={vec(0, 0)}
              end={vec(top, bottom)}
              colors={
                !isWindowActive
                  ? [STOCK_THEME.tint, `${STOCK_THEME.tint}33`]
                  : isDeltaPositive.value
                    ? [
                        STOCK_THEME.success[colorPrefix],
                        `${STOCK_THEME.success[colorPrefix]}33`,
                      ]
                    : [
                        STOCK_THEME.error[colorPrefix],
                        `${STOCK_THEME.error[colorPrefix]}33`,
                      ]
              }
            />
          </Path>
          <Path
            path={linePath}
            style="stroke"
            strokeWidth={2}
            color={windowLineColor}
          />
        </Group>
      )}
    </>
  )
}

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>
  yPosition: SharedValue<number>
  activeValue: SharedValue<number>
  bottom: number
  top: number
  textColor: string
  lineColor: string
  indicatorColor: SharedValue<string>
  topOffset?: number
}) => {
  const FONT_SIZE = 16
  const start = useDerivedValue(() => vec(xPosition.value, bottom))
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset)
  )

  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
    </>
  )
}

export { CurrencyDetailScreen }
