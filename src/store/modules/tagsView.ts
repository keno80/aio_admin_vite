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
    setCommon(tags: string[]) {
      this.tags = tags
      sessionStorage.tags = JSON.stringify(tags)
    },
    addTag(tag: { path: string, title: string }) {
      if (this.tags.some((item: { path: string }) => item.path === tag.path)) return
      this.setCommon([...this.tags, tag])
    },
    setCurrent(path: string) {
      this.currentTag = path
      sessionStorage.currentTag = path
    },
    removeTag(path: string) {
      if (path === this.currentTag) {
        const index = this.tags.findIndex((item: { path: string }) => item.path === path)
        index > 0 ? router.push(this.tags[index - 1].path) : router.push(this.tags[index + 1].path)
      }
      const restTag = this.tags.filter((tag: { path: string; }) => tag.path !== path)
      this.setCommon(restTag)
    },
    removeOtherTags(path: string) {
      this.setCommon(this.tags.filter((item: { path: string; }) => item.path === path));
      if (path !== this.currentTag) {
        router.push(this.tags[this.tags.length - 1].path)
      }
    },
    removeAll() {
      this.setCommon([])
      sessionStorage.currentTag = ''
      router.push('/')
    }
  }
})