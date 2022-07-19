import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'

export default createStore({
  modules: {
    user,
    tagsView
  },
  getters
})
