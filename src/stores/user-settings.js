import { defineStore } from 'pinia'

export const useUserSettingsStore = defineStore('user-settings', {
  state: () => {
    return {
      orderFulfillment: 'DELIVERY'
    }
  }
})
