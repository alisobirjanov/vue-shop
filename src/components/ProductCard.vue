<template>
  <div class="p-4 border-r border-b border-gray-200 sm:p-6">
    <div class="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 ">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-center object-cover" />
    </div>
    <div class="pt-10 pb-4 text-center">
      <h3 class="text-sm font-medium text-gray-900">
        <div>
          <span aria-hidden="true" />
          {{ product.title }}
        </div>
      </h3>
      <p class="mt-4 text-base font-medium text-gray-900">{{ product.price }}$</p>

    </div>
    <button class="bg-blue-700 cursor-pointer rounded-lg w-full py-2 mt-5 text-white font-bold" v-if="!productCart"
      @click="addToCart">
      Add to cart
    </button>

    <div class="flex mt-5" v-else>
      <button class="bg-blue-700 cursor-pointer rounded-lg py-2 px-4 text-white font-bold"
        @click="store.incrementQuantity(product.id)">
        +
      </button>

      <div class="grow">
        <p class="text-center">{{ productCart.quantity }}</p>
      </div>

      <button class="bg-blue-700 cursor-pointer rounded-lg py-2 px-4  text-white font-bold"
        @click="store.decrementQuantity(product.id)">
        -
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '~/types'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  product: Product
}>()

const store = useCartStore()

const productCart = computed(() => {
  return store.getProducts.find((p: Product) => p.id === props.product.id)
})

function addToCart() {
  store.addToCart({
    ...props.product,
    quantity: 1,
  })
}
</script>