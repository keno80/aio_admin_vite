<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const jump = () => {
  router.push('/blog')
}
</script>

<template>
  <div>
    <el-button @click="jump">按钮</el-button>
  </div>
</template>