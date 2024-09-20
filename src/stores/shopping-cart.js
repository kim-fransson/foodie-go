import { defineStore } from 'pinia'
import { useRestaurants } from './restaurants'

export const useShoppingCartStore = defineStore('shopping-cart', {
  state: () => {
    return { items: [], totalItemAmountLimit: 9 }
  },
  getters: {
    getItemCountById: (state) => {
      return (dishId) => state.items.find((item) => item.id === dishId)?.amount || 0
    },
    getNumberOfItems: (state) => state.items.reduce((acc, curr) => acc + curr.amount, 0),
    getCheckoutSummary: (state) => {
      const restaurants = useRestaurants()
      const restaurantIDItemsMap = new Map()

      // Loop over items and group by restaurant (origin)
      for (let i = 0; i < state.items.length; i++) {
        let item = state.items[i]
        let array = restaurantIDItemsMap.get(item.origin) || []
        array.push(item)
        restaurantIDItemsMap.set(item.origin, array)
      }

      let deliveryCost = 0
      let subtotal = 0
      const restaurantNameItemsMap = new Map()

      // Calculate subtotal and delivery cost
      restaurantIDItemsMap.forEach((value, key) => {
        let restaurant = restaurants.items.find((res) => res.id === key)
        if (restaurant) {
          restaurantNameItemsMap.set(restaurant.name, value)
          deliveryCost += restaurant.deliveryFee
          subtotal += value.reduce((acc, curr) => acc + curr.amount * curr.price, 0)
        }
      })

      return {
        restaurantNameItemsMap,
        subtotal: subtotal.toFixed(2),
        deliveryCost: deliveryCost.toFixed(2),
        total: (subtotal + deliveryCost).toFixed(2)
      }
    }
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
