<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { appStore } from '@/store/app';
import Sider from './sider.vue'

const router = useRouter()
const allRoutes = computed(() => router.options.routes)
const store = appStore()

</script>

<template>
  <el-scrollbar class="h-[calc(100vh-32px)]">
    <el-menu default-active="2" router :collapse="store.sidebarCollapse" class="h-[calc(100vh-32px)]"
      style="border: none" rounded-4px>
      <Sider v-for="(routes, index) in allRoutes" :key="index" :routes="routes" :hideTitle="store.sidebarCollapse" />
    </el-menu>
  </el-scrollbar>
</template>