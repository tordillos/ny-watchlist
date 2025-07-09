import data from '@/api/currency-stocks.json'
import { View } from '@/components/ui'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
  Circle,
  Group,
  LinearGradient,
  matchFont,
  Path,
  Skia,
  Line as SkiaLine,
  Text as SkiaText,
  vec,
} from '@shopify/react-native-skia'
import { format } from 'date-fns'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { TextStyle } from 'react-native'
import Reanimated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {
  CartesianChart,
  ChartBounds,
  PointsArray,
  useAreaPath,
  useChartPressState,
  useLinePath,
} from 'victory-native'

import { TextInput, type TextInputProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
const appColors = {
  tint: '#f04d21',
  androidHeader: { dark: '#262626', light: '#fafafa' },
  viewBackground: { dark: '#404040', light: '#f5f5f5' },
  text: { dark: '#fafafa', light: '#262626' },
  cardBackground: { dark: '#525252', light: '#fff' },
  cardBorder: { dark: '#a1a1aa', light: '#a1a1aa' },
  success: { dark: '#7ee17e', light: '#085408' },
  error: { dark: '#c84c4c', light: '#9e1a1a' },
  infoCardActive: { dark: '#c4b5fd', light: '#8b5cf6' },
  buttonBackgroundColor: { dark: '#737373', light: '#e7e7e7' },
  buttonBorderColor: { dark: '#a3a3a3', light: 'white' },
  buttonUnderlayColor: { dark: '#8b5cf6', light: '#ddd6fe' },
} as const

const initChartPressState = { x: 0, y: { high: 0 } }

function CurrencyDetailScreen() {
  const { id } = useLocalSearchParams()

  const { isDarkColorScheme: isDark } = useColorScheme()

  const colorPrefix = isDark ? 'dark' : 'light'

  const fontFamily = 'Helvetica'
  const fontStyle = {
    fontFamily,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
  }

  const font = matchFont(fontStyle)

  const textColor = isDark ? appColors.text.dark : appColors.text.light
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

  // Color the active high display based on the delta
  const activeHighStyle = useAnimatedStyle<TextStyle>(() => {
    const s: TextStyle = { fontSize: 24, fontWeight: 'bold', color: textColor }

    // One-touch
    if (!isSecondPressActive) return s
    s.color = isDeltaPositive.value
      ? appColors.success[colorPrefix]
      : appColors.error[colorPrefix]

    return s
  })

  // Indicator color based on delta
  const indicatorColor = useDerivedValue<string>(() => {
    if (!(isFirstPressActive && isSecondPressActive)) return appColors.tint
    return isDeltaPositive.value
      ? appColors.success[colorPrefix]
      : appColors.error[colorPrefix]
  })

  return (
    <ScrollView className="flex-1">
      <View className="h-96 w-full flex-1 py-5">
        <CartesianChart
          data={data}
          xKey="date"
          yKeys={['high']}
          chartPressState={[firstTouch, secondTouch]}
          axisOptions={{
            font,
            tickCount: 5,
            labelOffset: { x: 12, y: 8 },
            labelPosition: { x: 'outset', y: 'outset' },
            axisSide: { x: 'bottom', y: 'left' },
            formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
            formatYLabel: (v) => `$${v}`,
            lineColor: isDark ? '#71717a' : '#d4d4d8',
            labelColor: textColor,
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
                    lineColor={isDark ? '#71717a' : '#d4d4d8'}
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
                    lineColor={isDark ? '#71717a' : '#d4d4d8'}
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

      <View
        style={{
          paddingBottom: 16,
          paddingTop: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          width: '100%',
        }}
      >
        <AnimatedText
          text={activeDate}
          style={{
            // fontSize: 16,
            color: textColor,
          }}
        />
        <AnimatedText
          text={activeHigh}
          className="w-full text-center text-2xl text-foreground"
        />
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
      ? appColors.success[colorPrefix]
      : appColors.error[colorPrefix]
  })

  return (
    <>
      {/* Base */}
      <Group clip={backgroundClip} opacity={isWindowActive ? 0.3 : 1}>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(top, bottom)}
            colors={
              isWindowActive
                ? [
                    appColors.cardBorder[colorPrefix],
                    `${appColors.cardBorder[colorPrefix]}33`,
                  ]
                : [appColors.tint, `${appColors.tint}33`]
            }
          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={2}
          color={
            isWindowActive ? appColors.cardBorder[colorPrefix] : appColors.tint
          }
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
                  ? [appColors.tint, `${appColors.tint}33`]
                  : isDeltaPositive.value
                    ? [
                        appColors.success[colorPrefix],
                        `${appColors.success[colorPrefix]}33`,
                      ]
                    : [
                        appColors.error[colorPrefix],
                        `${appColors.error[colorPrefix]}33`,
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
  // Text label
  const activeValueDisplay = useDerivedValue(
    () => '$' + activeValue.value.toFixed(2)
  )

  const fontFamily = 'Helvetica'
  const fontStyle = {
    fontFamily,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
  }

  const font = matchFont(fontStyle)

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
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay.value}
        x={xPosition.value}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  )
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const formatDate = (ms: number) => {
  'worklet'

  const date = new Date(ms)
  const M = MONTHS[date.getMonth()]
  const D = date.getDate()
  const Y = date.getFullYear()
  return `${M} ${D}, ${Y}`
}

const AnimText = Reanimated.createAnimatedComponent(TextInput)
Reanimated.addWhitelistedNativeProps({ text: true })

type AnimatedTextProps = Omit<TextInputProps, 'editable' | 'value'> & {
  text: SharedValue<string>
  style?: React.ComponentProps<typeof AnimText>['style']
}

export function AnimatedText({ text, ...rest }: AnimatedTextProps) {
  const animProps = useAnimatedProps(() => {
    return {
      text: text.value,
    }
  })

  return (
    <AnimText
      {...rest}
      value={text.value}
      // @ts-ignore
      animatedProps={animProps}
      editable={false}
    />
  )
}

export { CurrencyDetailScreen }
