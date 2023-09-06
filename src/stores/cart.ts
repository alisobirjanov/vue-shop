import { defineStore } from 'pinia';
import type { Product } from '~/type'

interface IProduct extends Product {
  quantity: number;
}

interface Store {
  products: IProduct[]
}

export const useCartStore = defineStore('cart', {
  state: () =>
    ({
      products: [],
    } as Store),
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
    addToCart(product: IProduct) {
      this.products.push(product);
    },
    incrementQuantity(id: number) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity(id: number) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.quantity -= 1;
        if (product.quantity === 0) {
          this.products = this.products.filter((p) => p.id !== id);
        }
      }
    },
  },
});
