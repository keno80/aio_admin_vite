<script lang="ts" setup>
import { computed } from 'vue';
import Sidebar from './Sidebar/index.vue'
import Header from './Header.vue'
import { appStore } from '@/store/app';

const store = appStore()
const width = computed(() => store.sidebarCollapse ? '60px' : '260px')
</script>

<template>
  <div class="app_main" flex flex-1 h-full w-full flex-row>
    <div class="left h-[calc(100vh-32px)]" :class="`w-${width}`" my-16px ml-16px rounded-4px>
      <Sidebar />
    </div>
    <div class="right" flex flex-col flex-1 h-full w-full>
      <Header />
      <div class="content" mx-16px mt-16px mb-60px>
        <router-view />
      </div>
    </div>
  </div>
</template>