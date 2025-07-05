import { Button, Text, View } from '@/components/ui'
import { router } from 'expo-router'

function ProfileScreen() {
  const handleLogout = () => {
    router.replace('/')
  }

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </View>
  )
}

export { ProfileScreen }
