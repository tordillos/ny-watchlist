import { Circle, Line as SkiaLine, vec } from '@shopify/react-native-skia'
import React from 'react'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>
  yPosition: SharedValue<number>
  bottom: number
  top: number
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
    </>
  )
}

export { ActiveValueIndicator }
