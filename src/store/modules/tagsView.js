import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    tags: getItem('tags') || []
  },
  mutations: {
    //删除单个tags
    delTags(state, index) {
      state.tags.splice(index, 1)
    },
    //添加tags
    getTags(state, tags) {
      const tagsPath = state.tags.find((item) => item.path === tags.path)
      if (!tagsPath) {
        state.tags.push(tags)
      }
      setItem('tags', state.tags)
    }
  },
  action: {}
}
