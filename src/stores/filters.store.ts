import { CurrencySort } from '@/types/api'
import { create } from 'zustand'

interface FiltersState {
  sortBy: CurrencySort
  setSortBy: (sortBy: CurrencySort) => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  sortBy: 'name',
  setSortBy: (sortBy) => set({ sortBy }),
}))
