export const state = () => ({
  friendLinks: [] // 友情链接
})

export const mutations = {
  UPDATE_FRIEND_LINKS(state, friendLinks) {
    state.friendLinks = friendLinks
  }
}
export const actions = {
  queryExportTaskList({ commit }) {
    this.$cookies.set('token','sdf')
  }
}
