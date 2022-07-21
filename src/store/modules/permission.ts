import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import {baseRoutes, asyncRoutes} from "@/router";
import { toRefs } from "vue";

const hasPermission = (route: RouteRecordRaw, role: string[]) => {
  const routeRole: any = route.meta?.role ? route.meta.role : []
  if (!role.length || !routeRole.length) {
    return false
  }
  return role.some(r => routeRole.includes(r))
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], role: string[]) => {
  const item: any[] = []
  routes.forEach(route => {
    if (hasPermission(route, role)) {
      const current: any = { ...route, children: [] }
      if (route.children && route.children.length) {
        current.children = filterAsyncRoutes(route.children, role)
      } else {
        Reflect.deleteProperty(current, 'children')
      }
      item.push(current)
    }
  })
  return item
}

export const permissionStore = defineStore('permissionStore', {
  state() {
    return {
      accessRoutes: []
    }
  },
  getters: {
    routes(): RouteRecordRaw[] {      
      return baseRoutes.concat(this.accessRoutes)
    }
  },
  actions: {
    generateRoutes(role = []) {
      const accessRoutes: any = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
  }
})