<script setup lang="ts">
import { toggleDark } from '@/composables/dark'
</script>

<template>
  <div>
    <el-button type="primary" @click="toggleDark()">黑暗模式</el-button>
  </div>
</template>