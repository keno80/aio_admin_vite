<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => { }
  }
})
</script>

<template>
  <div class="dropdown" v-show="props.options.show">
    下拉菜单
  </div>
</template>