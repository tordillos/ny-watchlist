import { Star } from '@/components/icons'
import { Button, ButtonProps } from '@/components/ui'
import { cn } from '@/lib/utils'
import useFavoritesStore from '@/stores/favorites.store'

type CurrencyFavoriteProps = {
  id: string
} & ButtonProps

const CurrencyFavorite = ({ id, ...props }: CurrencyFavoriteProps) => {
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
    <Button size="icon" variant="link" onPress={handlePress} {...props}>
      <Star className={cn('text-primary', isFavorite && 'fill-primary')} />
    </Button>
  )
}

export { CurrencyFavorite }
