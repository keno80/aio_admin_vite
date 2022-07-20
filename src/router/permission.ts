import router from "./index";
import { permissionStore } from "@/store/modules/permission";
import { userStore } from "@/store/modules/user";
import { getToken } from '@/utils/auth'

const WHITE_LIST = ['/login']

router.beforeEach(async (to, from, next) => {
  const permission = permissionStore()
  const user = userStore()

  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {

      const hasRoles = user.role && user.role.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          const roles: any = await user.getUserInfo()

          const accessRoutes = await permission.generateRoutes(roles)

          router.addRoute(accessRoutes)
          
          next({ ...to, replace: true })
        } catch (err) {
          console.log(err);
        }
      }
    }
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',
        query: { ...to.query, redirect: to.path }
      })
    }
  }
})