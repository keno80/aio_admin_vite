import { defineStore } from "pinia";
import { login, userInfo } from '@/api/blog/user'
import { tagStore } from '@/store/modules/tagsView'
import { setToken, getToken, removeToken } from "@/utils/auth";


export const userStore = defineStore("userStore", {
  state() {
    return {
      token: getToken() ? getToken() : "",
      role: [],
      username: ''
    }
  },
  getters: {},
  actions: {
    handleLogin(loginForm: API.Login) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => {
          const { token } = res.data
          setToken(token)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        userInfo(this.token).then(res => {
          const { username, role, ban } = res.data

          if (ban !== 0) {
            reject('您已被禁止登录')
          }

          const roles = role.split(',')

          this.role = roles
          this.username = username

          resolve(roles)
        }).catch(err => {
          this.handleLogout()
          reject(err)
        })
      })
    },
    handleLogout() {
      return new Promise((resolve, reject) => {
        tagStore().removeAll()
        removeToken()
        this.role = []
        this.username = ''
      })
    }
  }
})