<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { appStore } from '@/store/modules/app';
import { permissionStore } from '@/store/modules/permission';
import Sider from './sider.vue'

const router = useRouter()
const route = useRoute()
// const allRoutes = computed(() => router.options.routes)
const store = appStore()
const permission = permissionStore()
const currentRoute = computed(() => route.path)
const allRoutes = computed(() => permission.routes) 

</script>

<template>
  <el-scrollbar class="h-[calc(100vh-32px)]" bg-white dark:bg-black-22 rounded-4px>
    <el-menu :default-active="currentRoute" router :collapse="store.sidebarCollapse" class="h-[calc(100vh-32px)]"
      style="border: none" rounded-4px>
      <Sider v-for="(routes, index) in allRoutes" :key="index" :routes="routes" :hideTitle="store.sidebarCollapse" />
    </el-menu>
  </el-scrollbar>
</template>