// @unocss-include

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/Layout/index.vue'

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    meta: { title: '登录', hidden: true },
    component: () => import('@/views/login/index.vue'),
    children: []
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'i-carbon:dashboard' },
      }
    ]
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/article',
    meta: { title: '博客后台管理', icon: 'i-carbon:sun', role: ['admin'] },
    children: [
      {
        path: '/blog/article',
        name: 'article',
        component: () => import('@/views/blog/index.vue'),
        meta: { title: '文章列表', icon: 'i-carbon:sun', role: ['admin'] },
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: '测试页面', icon: 'i-carbon:moon', role: ['admin'] },
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import('@/views/test1/index.vue'),
        meta: { title: '测试页面1', icon: 'i-carbon:moon', role: ['admin'] },
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/test2/index.vue'),
        meta: { title: '测试页面2', icon: 'i-carbon:moon', role: ['admin'] },
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes
})

export const resetRouter = () => {
  router.getRoutes().forEach(route => {
    const name: any = route.name
    router.hasRoute(name) && router.removeRoute(name)
  })

  baseRoutes.forEach(route => {
    const name: any = route.name
    !router.hasRoute(name) && router.addRoute(route)
  })
}

export default router