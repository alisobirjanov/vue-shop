import { defineStore } from 'pinia';
import axios from 'axios';
import { capitalizeFirstLetter } from '~/utils';

import type { Product } from '~/types';

const http = axios.create({
  baseURL: 'https://dummyjson.com',
});

interface State {
  products: Product[];
  categories: string[];
  total: number;
  limit: number;
}

interface Response {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useProductsStore = defineStore('products', {
  state: () =>
    ({
      products: [],
      categories: [],
      total: 0,
      limit: 20,
    } as State),
  getters: {
    getTotal(state) {
      return state.total;
    },
    getCategories(state) {
      return state.categories.map((item: string) => {
        const title = item.split('-');
        title[0] = capitalizeFirstLetter(title[0]);
        return {
          title: title.join(' '),
          value: item,
        };
      });
    },
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
    fetchProductsList(skip: number = 0) {
      return http<Response>('/products', {
        params: {
          skip,
          limit: this.limit,
        },
      }).then((res) => {
        this.products = res.data.products;
        this.total = res.data.total;
        return res;
      });
    },
    fetchProductsOfCategory(category: string, skip = 0) {
      return http<Response>(`/products/category/${category}`, {
        params: {
          skip,
          limit: this.limit,
        },
      }).then((res) => {
        this.products = res.data.products;
        this.total = res.data.total;
        return res;
      });
    },
    fetchCategories() {
      return http<string[]>('/products/categories').then((res) => {
        this.categories = res.data as any;
        return res.data;
      });
    },
    searchProducts(search: string, skip: number = 0) {
      return http<Response>(`/products/search?q=${search}`, {
        params: {
          skip,
          limit: this.limit,
        },
      }).then((res) => {
        this.products = res.data.products;
        this.total = res.data.total;
        return res.data;
      });
    },
  },
});
