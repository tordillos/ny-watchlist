import { TriangleAlert } from '@/components/icons'
import { Button, H3, Text, View } from '@/components/ui'

type ErrorFallbackProps = {
  onTryAgain?: () => void
}

function ErrorFallback({ onTryAgain }: ErrorFallbackProps) {
  return (
    <View className="items-center gap-3 rounded-xl border border-destructive p-5">
      <TriangleAlert size={30} className="text-destructive" />
      <H3 className="text-center text-destructive">Error loading</H3>
      <Text className="text-center text-destructive">
        There was a problem loading this section. Please check your internet
        connection or try again in a few moments.
      </Text>
      {onTryAgain && (
        <Button
          variant="link"
          className="w-full text-destructive"
          onPress={onTryAgain}
        >
          <Text className="text-destructive">Try again</Text>
        </Button>
      )}
    </View>
  )
}

export { ErrorFallback }
