<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<VIEW.LoginForm>({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (valid) {
      console.log('success');

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
          <el-button type="primary" w-full mt-14px size="large" @click="submitForm(loginFormRef)">登录</el-button>
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
