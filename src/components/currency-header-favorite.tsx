import { Star } from '@/components/icons'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import useFavoritesStore from '@/stores/favorites.store'

type CurrencyHeaderFavoriteProps = {
  id: string
}

const CurrencyHeaderFavorite = ({ id }: CurrencyHeaderFavoriteProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const isFavorite = favorites.includes(id)

  const handlePress = () => {
    if (isFavorite) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <Button size="icon" variant="link" onPress={handlePress}>
      <Star className={cn('text-primary', isFavorite && 'fill-primary')} />
    </Button>
  )
}

export { CurrencyHeaderFavorite }
