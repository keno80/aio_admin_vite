<script lang="ts" setup>
import { computed, ref } from 'vue';
import Sidebar from './Sidebar/index.vue'
import Header from './Header.vue'
import { appStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const { sidebarCollapse } = storeToRefs(appStore())
</script>

<template>
  <div class="app_main" flex flex-1 h-full w-full flex-row>
    <div class="left h-[calc(100vh-32px)]" :class="[sidebarCollapse ? `w-60px` : `w-260px`]" my-16px ml-16px rounded-4px
      duration-150>
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