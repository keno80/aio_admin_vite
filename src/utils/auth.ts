export const getToken = () => {
  return localStorage.aioToken
}

export const setToken = (token: string) => {
  localStorage.aioToken = token
}

export const removeToken = () => {
  localStorage.removeItem('aioToken')
}