import { BottomSheetBackdrop as Backdrop } from '@gorhom/bottom-sheet'
import { useSharedValue } from 'react-native-reanimated'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

type BottomSheetBackdropProps = Omit<
  BottomSheetDefaultBackdropProps,
  'animatedIndex' | 'opacity' | 'pressBehavior'
>

const BottomSheetBackdrop = (props: BottomSheetBackdropProps) => {
  const animatedIndex = useSharedValue(0)

  return (
    <Backdrop
      animatedIndex={animatedIndex}
      disappearsOnIndex={-1}
      opacity={0.5}
      pressBehavior={'close'}
      {...props}
    />
  )
}
export { BottomSheetBackdrop }
