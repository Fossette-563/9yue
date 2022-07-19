import UserApi from '@/api/user'
import { setItem, getItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    isCollapse: false
  },
  mutations: {
    //折叠菜单
    setCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    //用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    //登录
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  actions: {
    //退出登录
    async getlayOut({ commit }) {
      try {
        const layout = await UserApi.logOut()
        commit('setToken', '')
        commit('setUserInfo', '')
        return layout
      } catch (error) {
        console.log(error)
      }
    },
    //用户信息
    async getUserInfo({ commit }) {
      try {
        const userInfo = await UserApi.userInfo()
        commit('setUserInfo', userInfo)
        return userInfo
      } catch (error) {
        console.log(error)
      }
    },
    //登录
    async getlogin({ commit }, Loginfrom) {
      try {
        const { token } = await UserApi.LoginUser(Loginfrom)
        commit('setToken', token)
        return token
      } catch (error) {
        console.log(error)
      }
    }
  }
}
