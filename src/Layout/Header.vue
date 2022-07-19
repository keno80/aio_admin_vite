<script lang="ts" setup>
import { ref } from 'vue';
import { toggleDark } from '@/composables/dark'
import { appStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import TagsView from './TagsView/index.vue';

const { sidebarCollapse } = storeToRefs(appStore())
const isFull = ref<Boolean>(false)

const handleSidebarCollapse = () => {
  sidebarCollapse.value = !sidebarCollapse.value
}

const fullScreen = () => {
  let el = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
    isFull.value = false
  } else {
    el.requestFullscreen()
    isFull.value = true
  }
}

</script>

<template>
  <div class="header" h-60px>
    <div class="header-content" flex h-50px mt-16px mx-16px>
      <div class="left" h-40px mr-16px flex items-center>
        <div bg-white dark:bg-black-22 px-20px rounded-4px mr-16px shadow-el-light>
          <div :class="[sidebarCollapse ? 'i-line-md:menu-fold-right' : 'i-line-md:menu-fold-left']" h10 cursor-pointer
            hover:text-indigo @click="handleSidebarCollapse()"></div>
        </div>
        <TagsView />
      </div>
      <div class="right" bg-white dark:bg-black-22 ml-auto h-40px rounded-4px flex shadow-el-light>
        <div :class="[isFull ? 'i-fluent:full-screen-minimize-24-filled' : 'i-fluent:full-screen-maximize-24-filled']"
          cursor-pointer hover:text-indigo @click="fullScreen()" style="height: 2.5em" mx-3></div>
        <div i-line-md:sunny-outline-twotone-loop dark:i-line-md-moon-twotone cursor-pointer hover:text-indigo
          @click="toggleDark()" style="height: 2.5em" mx-3></div>
      </div>
    </div>

  </div>
</template>