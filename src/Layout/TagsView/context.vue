<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  path: {
    type: String,
    default: ''
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
})

const actions = [
  {
    lable: '重新加载',
    key: 'reload',
    icon: 'i-line-md:rotate-270'
  },
  {
    lable: '关闭当前标签',
    key: 'close',
    icon: 'i-line-md:minus-circle'
  },
  {
    lable: '关闭其他标签',
    key: 'close',
    icon: 'i-line-md:cancel'
  },
  {
    lable: '关闭全部标签',
    key: 'close',
    icon: 'i-line-md:close-circle'
  }
]
</script>

<template>
  <div class="dropdown" v-show="visible" :style="{ top: `${y}px`, left: `${x}px` }" shadow-el-light rounded-4px
    dark:bg-black-22 relative>
    <div class="arrow -top-5px" style="z-index: -1" absolute bg-white h-10px w-10px rotate-45 left-10px
      dark:bg-black-22></div>
    <div class="dropdown_list" py-5px>
      <div clss="dropdown_item" py-8px px-20px flex text-xs items-center cursor-pointer hover:bg-indigo-100
        hover:text-indigo dark:hover:bg-indigo-100 v-for="action in actions" :key="action.key">
        <div :class="action.icon" h-18px mr-6px></div>
        <span>{{ action.lable }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  background-color: #fff;
  z-index: 9999;

  .dropdown_item {

  }
}
</style>