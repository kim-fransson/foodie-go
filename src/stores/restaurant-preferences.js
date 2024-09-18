import { defineStore } from 'pinia'

export const useRestaurantPreferences = defineStore('restaurant-preferences', {
  state: () => {
    return {
      // filters
      minRating: 0,
      freeDelivery: false,
      openNow: false,

      // sorting
      sortBy: 'recommended'
    }
  },
  getters: {
    formattedMinRating: (state) => Math.round(state.minRating * 2) / 2
  },
  actions: {
    setMinRating(value) {
      this.minRating = Math.round(value * 2) / 2
    }
  }
})
