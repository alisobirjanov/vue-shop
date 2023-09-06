<template>
  <div class=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
    <input type="search" placeholder="Search products"
      class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <div class="select">
      <select class="text-sm outline-none focus:outline-none bg-transparent" :value="value"
        @input="emit('change-category', ($event.target as HTMLSelectElement).value)">
        <option value="all">All categories</option>
        <option v-for="categorie in categories" :key="categorie.value" :value="categorie.value"
          :selected="value === categorie.value">
          {{ categorie.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['change-category', 'on-search', 'update:modelValue'])
interface Category {
  title: string,
  value: string
}
defineProps<{
  categories: Category[],
  value: string,
  modelValue: string
}>()
</script>