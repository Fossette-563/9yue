import request from '@/utils/request'
//登录接口
const LoginUser = (data) => {
  return request({ url: '/login', method: 'POST', data })
}
//用户信息接口
const userInfo = () => {
  return request({ url: '/getinfo', method: 'POST' })
}
//退出登录接口
const logOut = () => {
  return request({ url: '/logout', method: 'POST' })
}
export default {
  LoginUser,
  userInfo,
  logOut
}
