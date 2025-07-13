import { Text, View } from '@/components/ui'
import useFavoritesStore from '@/stores/favorites.store'

function FavoritesScreen() {
  const { favorites } = useFavoritesStore()

  return (
    <View className="m-safe">
      <Text>Favorites</Text>
      <Text>{favorites.map((favorite) => favorite).join(', ')}</Text>
    </View>
  )
}

export { FavoritesScreen }
