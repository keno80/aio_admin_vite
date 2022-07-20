// @unocss-include

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getToken } from "@/utils/auth";
import Layout from '@/Layout/index.vue'

const routes: RouteRecordRaw[] = [
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
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/article',
    meta: { title: '博客后台管理', icon: 'i-carbon:sun' },
    children: [
      {
        path: '/blog/article',
        name: 'article',
        component: () => import('@/views/blog/index.vue'),
        meta: { title: '文章列表', icon: 'i-carbon:sun' },
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: '测试页面', icon: 'i-carbon:moon' },
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import('@/views/test1/index.vue'),
        meta: { title: '测试页面1', icon: 'i-carbon:moon' },
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/test2/index.vue'),
        meta: { title: '测试页面2', icon: 'i-carbon:moon' },
      }
    ]
  },
  {
    path: '/login',
    meta: { title: '登录', hidden: true },
    component: () => import('@/views/login/index.vue'),
    children: []
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (getToken() || to.path === '/login') {
    next()
  } else {
    next({
      path: '/login',
      replace: true,
      query: {
        redirect: to.fullPath
      }
    })
  }
})

export default router