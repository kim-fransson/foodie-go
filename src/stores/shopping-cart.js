import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shopping-cart', {
  state: () => {
    return { items: [] }
  }
})
