<script lang="ts" setup>
const props = defineProps({
  routes: {
    type: Object,
    required: true,
    default: () => { }
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
})

const routes = props.routes

</script>

<template>
  <template v-if="routes.children.length <= 1">
    <template v-if="routes.meta.hidden !== true">
      <el-menu-item :index="props.routes.path">
        <div :class="[routes.children.length !== 0 ? routes.children[0].meta.icon : routes.meta.icon]" px-2></div>
        <span v-show="!props.hideTitle" overflow-hidden>
          {{ routes.children.length !== 0 ? routes.children[0].meta.title : routes.meta.title }}
        </span>
      </el-menu-item>
    </template>

  </template>

  <template v-else>
    <el-sub-menu :index="routes.path" :class="{ sub: props.hideTitle }">
      <template #title>
        <div :class="routes.meta.icon" px-2></div>
        <span v-show="!props.hideTitle" overflow-hidden>{{ routes.meta.title }}</span>
      </template>
      <el-menu-item v-for="child in routes.children" :index="child.path">
        <div :class="child.meta.icon" px-2></div>
        <span>{{ child.meta.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
.sub {
  ::v-deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}
</style>