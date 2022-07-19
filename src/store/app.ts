import { defineStore } from "pinia";
import { nextTick } from "vue";

export const appStore = defineStore('appStore', {
  state: () => {
    return {
      sidebarCollapse: false,
      isReload: true
    }
  },
  getters: {},
  actions: {
    async reload() {
      this.isReload = false
      await nextTick()
      this.isReload = true
    }
  }
})