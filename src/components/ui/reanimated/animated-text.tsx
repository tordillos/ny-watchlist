import { TextInput, type TextInputProps } from 'react-native'
import Reanimated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated'

const AnimText = Reanimated.createAnimatedComponent(TextInput)
Reanimated.addWhitelistedNativeProps({ text: true })

type AnimatedTextProps = Omit<TextInputProps, 'editable' | 'value'> & {
  text: SharedValue<string>
  style?: React.ComponentProps<typeof AnimText>['style']
}

function AnimatedText({ text, ...rest }: AnimatedTextProps) {
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

export { AnimatedText }
