<script lang="ts" setup>
import Sidebar from './Sidebar/index.vue'
import Header from './Header.vue'
import { appStore } from '@/store/modules/app';

const app = appStore()
</script>

<template>
  <div class="app_main" flex flex-1 h-full w-full flex-row>
    <div class="left h-[calc(100vh-32px)]" :class="[app.sidebarCollapse ? `w-60px` : `w-260px`]" my-16px ml-16px rounded-4px
      duration-150 shadow-el-light>
      <Sidebar />
    </div>
    <div class="right" flex flex-col flex-1 h-full w-full>
      <Header />
      <div class="content" mx-16px mt-16px mb-60px bg-white dark:bg-black-22 rounded-4px p-3>
        <router-view v-slot="{ Component, route }">
          <transition name="el-fade-in-linear">
            <component :is="Component" v-if="app.isReload" :key="route.path"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>