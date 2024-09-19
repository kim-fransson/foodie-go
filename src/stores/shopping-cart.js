import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shopping-cart', {
  state: () => {
    return { items: [], totalItemAmountLimit: 9 }
  },
  getters: {
    getItemCountById: (state) => {
      return (dishId) => state.items.find((item) => item.id === dishId)?.amount || 0
    },
    getNumberOfItems: (state) => state.items.reduce((acc, curr) => acc + curr.amount, 0)
  },
  actions: {
    addItem(restaurant, dish, amount = 1) {
      if (amount >= this.totalItemAmountLimit) {
        return
      }

      const index = this.items.findIndex((item) => item.id === dish.id)

      if (index !== -1) {
        const newTotalAmount = this.items[index].amount + amount
        if (newTotalAmount <= this.totalItemAmountLimit) {
          this.items[index].amount = newTotalAmount
        }
      } else {
        this.items.push({
          id: dish.id,
          amount,
          name: dish.title,
          price: dish.price,
          origin: restaurant
        })
      }
    },
    removeItem(id) {
      const index = this.items.findIndex((item) => item.id === id)

      if (index !== -1) {
        const newTotalAmount = this.items[index].amount - 1
        if (newTotalAmount >= 0) {
          this.items[index].amount = this.items[index].amount - 1
        }
      }
    }
  }
})
