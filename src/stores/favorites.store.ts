import MMKVStorage from '@/lib/mmkv/storage'
import { create } from 'zustand'

import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite !== id),
        })),
    }),
    {
      name: 'favorites-storage',
      storage: MMKVStorage,
    }
  )
)

export default useFavoritesStore
