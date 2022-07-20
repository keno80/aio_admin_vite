<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import api from '@/api/aio/user'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<VIEW.LoginForm>({
  username: 'admin',
  password: '123456'
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const btnLoading = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    btnLoading.value = true
    if (valid) {
      api.login(loginForm).then(res => {
        console.log(res);

      }).finally(() => {
        btnLoading.value = false
      })
    }
  })
}

</script>

<template>
  <div class="login" h-full relative>
    <div class="login_form" absolute w-300px>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" size="large" clearable>
            <template #prefix>
              <div i-carbon-user></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" size="large" clearable type="password"
            show-password>
            <template #prefix>
              <div i-carbon-locked></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" w-full mt-14px size="large" @click="submitForm(loginFormRef)" :loading="btnLoading">
            登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style>
.login_form {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
