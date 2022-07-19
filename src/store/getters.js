export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isCollapse: (state) => state.user.isCollapse,
  TagsView: (state) => state.tagsView.tags
}
