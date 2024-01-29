export const state = () => ({
  friendLinks: [], // 友情链接
  sideBar: [] // 侧边栏
})

export const mutations = {
  UPDATE_FRIEND_LINKS(state, friendLinks) {
    state.friendLinks = friendLinks
  },
  UPDATE_SIDE_BAR(state, sideBar) {
    state.sideBar = sideBar
  },
}
export const actions = {
    queryFriendLinks({ commit }) {
      return new Promise((resolve) => {
        this.$api.getRelatedLink().then(res => {
          commit('UPDATE_FRIEND_LINKS', res.resultData);
          resolve(res.resultData)
        })
      });
    },
  querySideBar({ commit }) {
    return new Promise((resolve) => {
      this.$api.querySidebar().then(res => {
        commit('UPDATE_SIDE_BAR', res.resultData);
        resolve(res.resultData)
      })
    });
  },
}
