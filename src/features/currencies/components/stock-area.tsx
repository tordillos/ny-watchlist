import { useColorScheme } from '@/hooks/useColorScheme'
import {
  Group,
  LinearGradient,
  Path,
  Skia,
  vec,
} from '@shopify/react-native-skia'
import React from 'react'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'
import {
  ChartBounds,
  PointsArray,
  useAreaPath,
  useLinePath,
} from 'victory-native'

import { STOCK_THEME } from '@/lib/constants'

export const StockArea = ({
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
  points: PointsArray
  isWindowActive: boolean
  isDeltaPositive: SharedValue<boolean>
  startX: SharedValue<number>
  endX: SharedValue<number>
} & ChartBounds) => {
  const { isDarkColorScheme: isDark } = useColorScheme()

  const colorPrefix = isDark ? 'dark' : 'light'

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
