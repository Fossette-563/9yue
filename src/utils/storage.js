//存储本地
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}
//获取本地
export const getItem = (key) => {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
//删除本地
export const removeItem = (key) => {
  window.sessionStorage.removeItem(key)
}
//清空本地
export const removeItemAll = () => {
  window.sessionStorage.clear()
}
