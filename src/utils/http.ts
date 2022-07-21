import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'

const errorEmits = (message: string, type: any) => {
  ElMessage({
    message,
    type
  })
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config => {
  if (config && config.headers) {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
  }
  return config
},
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(response => {
  const { code, message } = response.data
  if (code !== 200) {
    errorEmits(message, 'warning')
  } else {
    return response.data
  }
})

export default instance