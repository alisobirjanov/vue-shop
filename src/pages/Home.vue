<template>
  <div class="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
    <ProductCard v-for="product in store.getProducts" :product="product" />
  </div>

  <p v-if="!store.getProducts.length" class="text-center text-xl pt-24">
    No Date
  </p>
  <div v-else class="flex justify-center py-10">
    <Pagination v-if="store.getTotal" :perPage="store.limit" :page="page" :total="store.getTotal"
      @page-change="changePage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '~/components/ProductCard.vue'
import Pagination from '~/components/pagination/index.vue'
import { useProductsStore } from '~/stores/products'

const store = useProductsStore()
const route = useRoute()
const router = useRouter()

const page = computed(() => {
  const skip = Number(route.query.skip) || 0
  return Math.ceil(skip / store.limit) + 1
})



function fetchProducts(skip = 0) {
  const search = route.query.search?.toString()
  const category = route.query.category?.toString()
  const query: Record<string, any> = { skip: skip ? skip : undefined }

  if (category) {
    store.fetchProductsOfCategory(category, skip)
    query.category = category
  } else if (search) {
    query.search = search
    store.searchProducts(search, skip)
  } else {
    store.fetchProductsList(skip)
  }

  router.push({
    path: '/',
    query
  })
}

const skip = Number(route.query.skip) || 0
fetchProducts(skip)

function changePage(page: number) {
  const skip = (page - 1) * store.limit
  fetchProducts(skip)
}
</script>
