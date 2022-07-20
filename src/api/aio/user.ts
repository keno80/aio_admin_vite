import axios from '@/utils/http'

export default {
  login(data: API.Login) {
    return axios.post('/user/login', data)
  }
}