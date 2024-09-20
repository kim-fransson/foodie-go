import { defineStore } from 'pinia'

export const useRestaurants = defineStore('restaurants', {
  state: () => {
    return {
      items: [],
      loading: false
    }
  },
  actions: {
    async registerRestaurants() {
      this.loading = true
      try {
        await fetch('/api/restaurants')
          .then((res) => res.json())
          .then((json) => (this.items = json.restaurants))
      } catch (error) {
        // nothing 😈
      } finally {
        this.loading = false
      }
    }
  }
})
