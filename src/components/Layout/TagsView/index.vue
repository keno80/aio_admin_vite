<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tagStore } from '@/store/tagsView'
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

const handleRemove = (path: string) => {
  useTag.removeTag(path)
}

const handleMenu = (e: any, tag: any) => {
  console.log('event ->', e);
  console.log('tag ->', tag);
  const { clientX, clientY } = e
  Object.assign(ContextOptions, {
    x: clientX,
    y: clientY,
    path: tag.path,
    show: true
  })

}

</script>

<template>
  <Scroll>
    <div class="tags_view" flex>
      <el-tag class="mx-1" size="large" cursor-pointer h-40px :type="useTag.currentTag === tag.path ? '' : 'info'"
        :closable="useTag.tags.length > 1" v-for="tag in useTag.tags" @click="handleClickItem(tag.path)"
        @close="handleRemove(tag.path)" @contextmenu.prevent="handleMenu($event, tag)">
        {{ tag.title }}
      </el-tag>
      <!-- <div :class="[useTag.currentTag === tag.path ? 'bg-indigo' : 'bg-indigo-300']" text-white px-16px rounded-4px h-10
        flex items-center shadow-el-light cursor-pointer mr-16px v-for="tag in useTag.tags"
        @click="handleClickItem(tag.path)">
        <span text-12px>{{ tag.title }}</span>
        <div i-line-md:remove h-4 mt-1px cursor-pointer @click="handleRemove(tag.path)"></div>
      </div> -->
    </div>
  </Scroll>

  <Context :options="ContextOptions" />
</template>