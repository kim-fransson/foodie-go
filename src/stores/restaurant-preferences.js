import { defineStore } from 'pinia'

export const useRestaurantPreferences = defineStore('restaurant-preferences', {
  state: () => {
    return {
      // filters
      minRating: 0,
      freeDelivery: false,
      openNow: false,
      foodType: '',
      searchQuery: '',

      // sorting
      sortBy: 'recommended'
    }
  }
})
