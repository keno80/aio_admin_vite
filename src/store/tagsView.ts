import { defineStore } from "pinia";
import router from "@/router";

const tags = sessionStorage.tags ? JSON.parse(sessionStorage.tags) : []
const currentTag = sessionStorage.currentTag

export const tagStore = defineStore('tagStore', {
  state: () => {
    return {
      tags: tags,
      currentTag: currentTag || ''
    }
  },
  getters: {},
  actions: {
    addTag(tag: { path: string, title: string }) {
      if (this.tags.some((item: { path: string }) => item.path === tag.path)) return
      this.tags.push(tag)
      sessionStorage.tags = JSON.stringify(this.tags)
    },
    setCurrent(path: string) {
      this.currentTag = path
      sessionStorage.currentTag = path
    },
    removeTag(path: string) {
      if (path === this.currentTag) {
        const index = this.tags.findIndex((item: { path: string }) => item.path === path)
        console.log(index);
        console.log(this.tags[index - 1].path);
        
        
        index > 0 ? router.push(this.tags[index - 1].path) : router.push(this.tags[index + 1].path)
      }
      const restTag = this.tags.filter((tag: { path: string; }) => tag.path !== path)
      this.tags = restTag
      sessionStorage.tags = JSON.stringify(restTag)
    }
  }
})