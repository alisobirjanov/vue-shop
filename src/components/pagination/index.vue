<template>
  <ul class="isolate inline-flex -space-x-px rounded-md shadow-sm">
    <PageItem v-for="button in buttons" @click="changePage(button.page)"
      :class="button.active ? 'text-white ring-indigo-600 bg-indigo-600' : 'text-gray-900 ring-gray-300 hover:bg-gray-50'">
       {{ button.ellipsis ? '...' : button.page }}
    </PageItem>
  </ul>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import PageItem from './PageItem.vue'
import usePaginator from 'vue-use-paginator'

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 10
  },
  pageRange: {
    type: Number,
    default: 2
  },
  page: {
    type: Number
  }
})

const emit = defineEmits(['page-change'])

const {
  page,
  numItems,
  buttons,

} = usePaginator({
  pageSize: props.perPage,
  numItems: props.total,
  numButtons: 100,
})


function changePage(page1) {
  page.value = page1
  emit('page-change', page1)
}

watch(() => props.total, (val) => {
  numItems.value = val
})

watch(() => props.page, (val) => {
  page.value = val || 1
}, {immediate: true})
</script>
