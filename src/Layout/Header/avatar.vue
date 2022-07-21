<script lang="ts" setup>
import { computed } from 'vue'
import { userStore } from '@/store/modules/user';

const user = userStore()

const avatarName = computed(() => user.username.slice(0, 1).toLocaleUpperCase())

</script>

<template>
  <div class="avatar" mx-3 cursor-pointer>
    <el-dropdown placement="bottom-end">
      <span class="el-dropdown-link">
        <el-avatar size="small" hover:bg-indigo>{{ avatarName }}</el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="user.handleLogout()">
            <div i-line-md:arrow-open-right mr-2></div>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>