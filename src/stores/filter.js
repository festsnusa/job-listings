import { defineStore } from 'pinia'

export default defineStore('filter', {
  state: () => {
    return {
      currentFilter: [],
    };
  },
  persist: true,
})