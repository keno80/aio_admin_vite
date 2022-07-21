import axios from '@/utils/http';

export const login = (data: API.Login) => {
  return axios.post('/user/login', data)
}

export const userInfo = (token: string) => {
  return axios.post('/user/getInfo', { token })
}