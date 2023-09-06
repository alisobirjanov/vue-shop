<template>
  <div class="bg-white">
    <div class="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>
      <div>
        <ul class="border-t border-b border-gray-200 divide-y divide-gray-200" v-if="store.getProducts.length">

          <li v-for="(product) in store.getProducts" :key="product.id" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <img :src="product.thumbnail" :alt="product.title"
                class="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32" />
            </div>

            <div class="flex justify-between sm:ml-6 w-full">
              <div>
                <h3 class="text-sm">
                  <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                    {{ product.title }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ product.description }}
                </p>
                <p class="text-sm font-medium text-gray-900 my-5">{{ product.price }}</p>
              </div>

              <div>

                <div class="flex items-center mt-5">
                  <button class="bg-blue-700 cursor-pointer rounded-lg py-2 px-4 text-white font-bold"
                    @click="store.incrementQuantity(product.id)">
                    +
                  </button>

                  <div class="grow w-7">
                    <p class="text-center">{{ product.quantity }}</p>
                  </div>

                  <button class="bg-blue-700 cursor-pointer rounded-lg py-2 px-4  text-white font-bold"
                    @click="store.decrementQuantity(product.id)">
                    -
                  </button>
                </div>

              </div>
            </div>
          </li>
        </ul>

        <div v-else class="py-24">
          <p class="text-center">
            Your cart is currently no products
          </p>
          <div class="flex justify-center">
            <RouterLink to="/"
              class="bg-blue-700 cursor-pointer rounded-lg py-2 mt-5 text-white font-bold px-3 inline-block text-center">
              Go back
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const store = useCartStore()
</script>