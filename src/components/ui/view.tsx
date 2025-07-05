import { View as DefaultView, ViewProps } from 'react-native'

const View = ({ ...props }: ViewProps) => {
  return <DefaultView {...props} />
}

export { View }
