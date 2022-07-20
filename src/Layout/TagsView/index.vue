<script lang="ts" setup>
import { reactive, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tagStore } from '@/store/modules/tagsView'
import Scroll from './scroll.vue'
import Context from './context.vue'

const route = useRoute()
const router = useRouter()
const useTag = tagStore()

const ContextOptions = reactive({
  x: 0,
  y: 0,
  path: '',
  show: false
})

const handleClickItem = (path: string) => {
  useTag.setCurrent(path)
  router.push(path)
}

watch(() => route.path, () => {
  const { path } = route
  const title: any = route.meta?.title
  useTag.addTag({ path, title })
  handleClickItem(path)
}, { immediate: true })

watch(() => ContextOptions.show, (val) => {
  if (val) {
    document.body.addEventListener('click', hideContext)
  } else {
    document.body.removeEventListener('click', hideContext)
  }
})

const handleRemove = (path: string) => {
  useTag.removeTag(path)
}

const showContext = () => {
  ContextOptions.show = true
}

const hideContext = () => {
  ContextOptions.show = false
}

const handleMenu = async (e: any, path: string) => {
  const { clientX, clientY } = e
  await hideContext()
  Object.assign(ContextOptions, {
    x: clientX,
    y: clientY,
    path
  })
  setTimeout(() => {
    clearTimeout()
    showContext()
  })
}

</script>

<template>
  <Scroll>
    <div class="tags_view" flex>
      <el-tag class="mx-1" size="large" cursor-pointer h-40px :type="useTag.currentTag === tag.path ? '' : 'info'"
        :closable="useTag.tags.length > 1" v-for="tag in useTag.tags" @click="handleClickItem(tag.path)"
        @close="handleRemove(tag.path)" @contextmenu.prevent="handleMenu($event, tag.path)">
        {{ tag.title }}
      </el-tag>
    </div>
  </Scroll>

  <Context :visible="ContextOptions.show" :x="ContextOptions.x" :y="ContextOptions.y" :path="ContextOptions.path" />
</template>