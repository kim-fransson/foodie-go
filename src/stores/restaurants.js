import { defineStore } from 'pinia'

export const useRestaurants = defineStore('restaurants', {
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    async registerRestaurants() {
      try {
        await fetch('/api/restaurants')
          .then((res) => res.json())
          .then((json) => (this.items = json.restaurants))
      } catch (error) {
        // nothing 😈
      }
    }
  }
})
