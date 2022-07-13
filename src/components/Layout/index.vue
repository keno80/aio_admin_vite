<script lang="ts" setup>
import Sidebar from './Sidebar/index.vue'
</script>

<template>
  <div class="app_main" flex flex-1 h-full w-full flex-row>
    <div class="left h-[calc(100vh-32px)]" w-260px my-16px ml-16px rounded-4px>
      <Sidebar />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>