<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { appStore } from '@/store/app';
import { tagStore } from '@/store/tagsView';
import { ref, watch, computed } from 'vue'

const app = appStore();
const tag = tagStore();
const router = useRouter()
const dropdown = ref()
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

watch(() => props.visible, (val) => {
  if (val) {
    dropdown.value.handleOpen()
  } else {
    dropdown.value.handleClose()
  }
})

const actions = computed(() => [
  {
    lable: '重新加载',
    key: 'reload',
    icon: 'i-line-md:rotate-270',
    disabled: props.path !== tag.currentTag
  },
  {
    lable: '关闭标签',
    key: 'close',
    icon: 'i-line-md:minus-circle',
    disabled: tag.tags.length <= 1
  },
  {
    lable: '关闭其他标签',
    key: 'closeOther',
    icon: 'i-line-md:cancel',
    disabled: tag.tags.length <= 1
  },
  {
    lable: '关闭全部标签',
    key: 'closeAll',
    icon: 'i-line-md:close-circle'
  }
])

const handleAction = async (key: string) => {
  // router.replace('/blog/article')
  switch (true) {
    case key === 'reload':
      app.reload()
      break
    case key === 'close':
      tag.removeTag(props.path)
      break
    case key === 'closeOther':
      tag.removeOtherTags(props.path)
      break
    case key === 'closeAll':
      tag.removeAll()
      break
  }
}
</script>

<template>
  <div class="dropdown" :style="{ top: `${y}px`, left: `${x}px` }" shadow-el-light rounded-4px dark:bg-black-22
    relative>
    <!-- <div class="arrow -top-5px" style="z-index: -1" absolute bg-white h-10px w-10px rotate-45 left-10px
      dark:bg-black-22></div>
    <div class="dropdown_list" py-5px>
      <div clss="dropdown_item" py-8px px-20px flex text-xs items-center cursor-pointer hover:bg-indigo-100
        hover:text-indigo dark:hover:bg-indigo-900 v-for="action in actions" :key="action.key"
        @click="handleAction(action.key)" disabled>
        <div :class="action.icon" h-18px mr-6px></div>
        <span>{{ action.lable }}</span>
      </div>
    </div> -->
    <el-dropdown ref="dropdown" trigger="contextmenu">
      <span class="el-dropdown-link"></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="action in actions" :key="action.key" :disabled="action.disabled" @click="handleAction(action.key)">
            <div :class="action.icon" h-18px mr-6px></div>
            <span>{{ action.lable }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  background-color: #fff;
  z-index: 9999;
}
</style>