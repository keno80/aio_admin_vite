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

const children = props.routes.children

</script>

<template>
  <div v-if="children.length <= 1">
    <el-menu-item :index="children[0].path">
      <div :class="children[0].meta.icon" px-2></div>
      <span v-show="!props.hideTitle" overflow-hidden>{{ children[0].meta.title }}</span>
    </el-menu-item>
  </div>

  <div v-else>
    <el-sub-menu :index="props.routes.path" :class="{ sub: props.hideTitle }">
      <template #title>
        <div :class="props.routes.meta.icon" px-2></div>
        <span v-show="!props.hideTitle" overflow-hidden>{{ props.routes.meta.title }}</span>
      </template>
      <el-menu-item v-for="child in props.routes.children" :index="child.path">
        <div :class="child.meta.icon" px-2></div>
        <span>{{ child.meta.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.sub {
  ::v-deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}
</style>