import { ArrowUpAZ } from '@/components/icons'
import { Button, H3, RadioGroup, RadioGroupItem, View } from '@/components/ui'
import { BottomSheetBackdrop } from '@/components/ui/bottom-sheet/bottom-sheet-backdrop'
import { useFiltersStore } from '@/stores/filters.store'
import { CurrencySort } from '@/types/api'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Label } from '@react-navigation/elements'
import { useTheme } from '@react-navigation/native'
import React from 'react'

function SortBottomSheet() {
  const { colors } = useTheme()

  const { sortBy, setSortBy } = useFiltersStore()

  const onValueChange = (value: string) => {
    setSortBy(value as CurrencySort)
    handleCloseBottomSheet()
  }

  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present()
  }

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.dismiss()
  }

  const onPress = () => {
    handleOpenBottomSheet()
  }

  return (
    <>
      <Button size="icon" variant="ghost" onPress={onPress}>
        <ArrowUpAZ className="text-foreground" />
      </Button>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['30%']}
        enableDynamicSizing={false}
        index={0}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetView className="gap-5 p-5">
          <H3>Order by</H3>
          <RadioGroup
            value={sortBy}
            onValueChange={onValueChange}
            className="gap-3"
          >
            <RadioGroupItemWithLabel
              value="name"
              label="Name"
              onLabelPress={onValueChange}
            />
            <RadioGroupItemWithLabel
              value="price"
              label="Price"
              onLabelPress={onValueChange}
            />
            <RadioGroupItemWithLabel
              value="change"
              label="% Change"
              onLabelPress={onValueChange}
            />
          </RadioGroup>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

function RadioGroupItemWithLabel({
  value,
  label,
  onLabelPress,
}: {
  label: string
  value: CurrencySort
  onLabelPress: (value: CurrencySort) => void
}) {
  return (
    <View className={'flex-row items-center gap-3'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label
        nativeID={`label-for-${value}`}
        onPress={() => onLabelPress(value)}
      >
        {label}
      </Label>
    </View>
  )
}

export { SortBottomSheet }
