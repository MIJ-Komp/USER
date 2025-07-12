import { defineStore } from 'pinia'

export const useCartStore = defineStore('store', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(item) {
      const existItemIdx = this.items.findIndex(i => i.productId === item.productId && i.productSkuId === item.productSkuId)

      if(existItemIdx != -1) {
        this.items[existItemIdx].qty += 1;
      } else {
        this.items.push(item);
      }

      this.saveToLocalStorage()
    },
    removeItem(productId, productSkuId) {
      this.items = this.items.filter(i => i.productId !== productId && i.productSkuId !== productSkuId)
      this.saveToLocalStorage()
    },
    clearItems() {
      this.items = []
      this.saveToLocalStorage()
    },
    changeQty(productId, productSkuId, qty) {
      const existItemIdx = this.items.findIndex(i => i.productId === productId && i.productSkuId === productSkuId)
      if(existItemIdx != -1) {
        if(!(this.items[existItemIdx].qty == 1 && qty == -1)){
          this.items[existItemIdx].qty += qty;
        }
      }
      this.saveToLocalStorage()
    },
    initFromLocalStorage() {
      const stored = localStorage.getItem('cart_items')
      if (stored) {
        this.items = JSON.parse(stored)
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cart_items", JSON.stringify(this.items))
    }
  }
})
