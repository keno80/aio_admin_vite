<script lang="ts" setup>
import { watch, reactive, onMounted } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute()
let breadcrumbItem = reactive<VIEW.Breadcrumb>({
  title: '',
  path: '',
  icon: ''
})

watch(route, (val) => {
  handleBreadcrumb(val);
})

const handleBreadcrumb = (route: RouteLocationNormalizedLoaded) => {
  const { meta: { title, icon }, path } = route;
  breadcrumbItem.title = title
  breadcrumbItem.icon = icon
  breadcrumbItem.path = path
}

onMounted(() => {
  handleBreadcrumb(route)
})


</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/dashboard' }">
      <div i-carbon-dashboard inline-block pr-2></div>
      <span style="vertical-align: 5px;">Dashboard</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: breadcrumbItem.path }" v-if="breadcrumbItem.path !== '/dashboard'">
      <div :class="breadcrumbItem.icon" inline-block pr-2></div>
      <span style="vertical-align: 5px;">{{ breadcrumbItem.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>