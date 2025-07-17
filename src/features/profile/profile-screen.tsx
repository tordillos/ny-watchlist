import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Muted,
  Text,
  View,
} from '@/components/ui'
import { Linking } from 'react-native'

const GITHUB_AVATAR_URI = 'https://avatars.githubusercontent.com/u/59704452?v=4'

const LINKEDIN_URL =
  'https://www.linkedin.com/in/pedro-blázquez-hernández-01201b1b8'

const GITHUB_URL = 'https://github.com/tordillos'

function ProfileScreen() {
  const handleLinkedInPress = () => {
    Linking.openURL(LINKEDIN_URL)
  }

  const handleGithubPress = () => {
    Linking.openURL(GITHUB_URL)
  }

  return (
    <View className="m-safe flex-1 gap-5 p-5">
      <View className="flex flex-row items-center gap-5">
        <Avatar alt="Pedro B.H." className="h-24 w-24">
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          <AvatarFallback>
            <Text>PB</Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex flex-col ">
          <Text className="text-4xl font-bold">Pedro BH</Text>
          <Text>Fronted developer</Text>
          <Muted>tordillos2@gmail.com</Muted>
        </View>
      </View>
      <Button variant="outline" onPress={handleLinkedInPress} className="mt-10">
        <Text>LinkedIn</Text>
      </Button>
      <Button variant="outline" onPress={handleGithubPress}>
        <Text>Github</Text>
      </Button>
    </View>
  )
}

export { ProfileScreen }
