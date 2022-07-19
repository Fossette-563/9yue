import router from '@/router'
import store from '@/store'
import { filterRoutes } from '@/utils/routes'

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token && to.path === '/login') {
    return next(from.path)
  }
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  if (to.path !== '/login') {
    // TODO 获取用户信息
    const userInfo = store.getters.userInfo
    if (JSON.stringify(userInfo) === '{}') {
      //获取用户信息
      const user = await store.dispatch('user/getUserInfo')
      //获取菜单
      const routes = filterRoutes(user.menus)
      router.addRoute({
        redirect: '/index'
      })
      //遍历菜单添加到路由表
      routes.forEach((item) => {
        router.addRoute('layout', item)
      })
      //添加重定向和404页面
      router.addRoute({
        path: '/catchAll(.*)',
        redirect: '/404'
      })
      return next(to.path)
    }
  }
  next()
})
