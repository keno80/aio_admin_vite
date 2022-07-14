<script lang="ts" setup>
import { toggleDark } from '@/composables/dark'
import { appStore } from '@/store/app';

const store = appStore()

const handleSidebarCollapse = () => {
  store.sidebarCollapse = !store.sidebarCollapse
}

</script>

<template>
  <div class="header" h-60px>
    <div class="header-content" flex h-50px mt-20px mx-16px>
      <div class="left" bg-white dark:bg-black-22 h-40px px-20px mr-16px rounded-4px>
        <div class="i-line-md:menu-fold-right" h10 cursor-pointer hover:text-indigo @click="handleSidebarCollapse"
          v-if="store.sidebarCollapse"></div>
        <div class="i-line-md:menu-fold-left" h10 cursor-pointer hover:text-indigo @click="handleSidebarCollapse"
          v-else></div>
      </div>
      <div class="right" bg-white dark:bg-black-22 ml-auto h-40px px-20px rounded-4px>
        <div i-line-md:sunny-outline-twotone-loop dark:i-line-md-moon-twotone cursor-pointer hover:text-indigo
          @click="toggleDark()" style="height: 2.5em"></div>
      </div>
    </div>

  </div>
</template>