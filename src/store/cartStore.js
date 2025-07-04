import { defineStore } from 'pinia'

export const useCartStore = defineStore('store', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(item) {
      if (!this.items.find(i => i.id === item.id)) {
        this.items.push(item)
      }
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clearItems() {
      this.items = []
    }
  }
})
