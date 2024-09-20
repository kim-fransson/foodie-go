import { closeDrawer, openDrawer } from '@/utils/daisy-ui'
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => {
    return {
      drawerElement: undefined,
      title: '',
      content: undefined
    }
  },
  actions: {
    registerDrawer(drawer) {
      this.drawerElement = drawer
    },
    close() {
      closeDrawer(this.drawerElement)
    },
    open(title, content) {
      this.title = title
      this.content = content
      openDrawer(this.drawerElement)
    }
  }
})
