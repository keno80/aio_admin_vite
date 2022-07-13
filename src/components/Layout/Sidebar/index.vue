<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { appStore } from '@/store/app';
import { storeToRefs } from 'pinia'
import Sider from './sider.vue'

const router = useRouter()
const allRoutes = computed(() => router.options.routes)
const store = appStore()
console.log(store.sidebarCollapse);


</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" router :collapse="store.sidebarCollapse">
    <Sider v-for="(routes, index) in allRoutes" :key="index" :routes="routes" />
  </el-menu>
</template>