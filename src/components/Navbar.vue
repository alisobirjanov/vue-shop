<template>
  <header class="p-5 flex items-center">
    <div class="mx-2 w-10">
      <RouterLink to="/">
        <img class="og tm" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=500" alt="Your Company">
      </RouterLink>
    </div>

    <div class="w-full">
      <SearchBar :value="category" :categories="store.getCategories" @change-category="changeCategory"
        @update:model-value="onSearch" v-model="search" />
    </div>

    <div class="px-5 py-2">
      <RouterLink to="/cart" class="flex items-center" type="button">
        <div>
          <svg
            class="w-7"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z">
            </path>
          </svg>
        </div>
        <span>{{ cartStore.getProducts.length }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '~/components/SearchBar.vue'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { debounce } from '~/utils'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const cartStore = useCartStore()

const category = computed(() => route.query.category?.toString() || 'all')
const search = ref('')

store.fetchCategories()

function changeCategory(category: string) {
  if (category === 'all') {
    store.fetchProductsList()
    router.push({ path: '/', query: { category: undefined, skip: undefined } })
  } else {
    store.fetchProductsOfCategory(category)
    router.push({ path: '/', query: { category, skip: undefined } })
  }
  search.value = ''
}

const onSearch = debounce((text: string) => {
  const query: Record<string, any> = {
    category: undefined,
    skip: undefined,
  }
  if (text) {
    query.search = text
  }
  router.push({
    path: '/',
    query
  })
  store.searchProducts(text)
}, 500)

setTimeout(() => {
  search.value = route.query.search?.toString() || ''
}, 200)

</script>