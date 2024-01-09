export const state = () => ({
  userInfo: {},
  isOrgUser: null,
  hasOrgPackage: null,
  mobileArea: null,
  userPhone: null,
  userName: null,
  userImg: null,
  // 是否领取体验课 和 是否上过课判断
  // status 1:联系学习顾问 2:不做处理 3:提示约第一节课
  // 体验课判断逻辑：status =3 时才做判断
  //  1、用户未领取体验课：getTrialClass = 0
  // 2、用户已领取体验课但未上课：getTrialClass = 1 &&  attendClass = 2
  status: '3',
  getTrialClass: 0,
  attendClass: 2
})
export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ISORGUSER: (state, isOrgUser) => {
    state.isOrgUser = isOrgUser
  },
  SET_HASORGPACKAGE: (state, hasOrgPackage) => {
    state.hasOrgPackage = hasOrgPackage
  },
  SET_MOBILEAREA: (state, mobileArea) => {
    state.mobileArea = mobileArea
  },
  SET_USERPHONE: (state, userPhone) => {
    state.userPhone = userPhone
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_USER_IMG: (state, userImg) => {
    state.userImg = userImg
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_GET_TRIAL_CLASS: (state, getTrialClass) => {
    state.getTrialClass = getTrialClass
  },
  SET_ATTEND__CLASS: (state, attendClass) => {
    state.attendClass = attendClass
  }
}
export const actions = {
  // 用户登录，获取token，并存到cookie中
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // 调用登录接口
      // login.accountLogin().then((response) => {
      //   const { data } = response
      //   console.log('调用登录接口', data)
      // })
    })
  },
  // 调用获取用户信息的接口
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     //调用获取用户信息接口
  //     learninghall
  //       .userInfo()
  //       .then((response) => {
  //         const { data } = response
  //         if (!data) {
  //           reject('Verification failed, please Login again.')
  //         }
  //         const userInfo = data.resultData
  //         commit('SET_USERINFO', userInfo)
  //         resolve(data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // 获取用户的体验课相关信息
  getExperienceCourseDetail({ commit, state }) {
    // return new Promise(async (resolve, reject) => {
      // try {
      //   const {
      //     data: { resultData },
      //   } = await appointedclass.experienceCourseDetails()
      //   commit('SET_STATUS', resultData.status)
      //   commit('SET_GET_TRIAL_CLASS', resultData.getTrialClass)
      //   commit('SET_ATTEND__CLASS', resultData.attendClass)
      //   resolve(resultData)
      // } catch (e) {
      //   reject()
      //   console.log(e, 'error')
      // }
    // })
  },
  // 获取学习顾问信息
  changeMobileArea({ commit, state }) {
    return new Promise((resolve, reject) => {
      // login
      //   .changeMobileArea()
      //   .then((res) => {
      //     const { data } = res
      //     commit('SET_MOBILEAREA', data.resultData)
      //     resolve(data)
      //   })
      //   .catch((err) => {
      //     reject(err)
      //   })
    })
  },
  // 用户退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // login
      //   .logout(2)
      //   .then(() => {
      //     this.$cookies.remove('token')
      //     this.$cookies.remove('userType')
      //     this.$cookies.remove('userId')
      //     this.$cookies.remove('userName')
      //     this.$cookies.remove('isOrgUser')
      //     this.$cookies.remove('hasOrgPackage')
      //     this.$cookies.remove('monthLeave')
      //     this.$cookies.remove('userPhone')
      //     this.$cookies.remove('mobileArea')
      //     this.$cookies.remove('userImg')
      //     this.$cookies.remove('firstSign')
      //     this.$cookies.remove('memberStatus')
      //     this.$cookies.remove('guidePageOpen')
      //     this.$cookies.remove('peopleSign')
      //     sessionStorage.clear()
      //     resolve()
      //   })
      //   .catch((err) => {
      //     reject(err)
      //   })
    })
  },
  // 用户退出登录
  reset({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$cookies.remove('token')
      this.$cookies.remove('userType')
      this.$cookies.remove('userId')
      this.$cookies.remove('userName')
      this.$cookies.remove('isOrgUser')
      this.$cookies.remove('hasOrgPackage')
      this.$cookies.remove('monthLeave')
      this.$cookies.remove('userPhone')
      this.$cookies.remove('mobileArea')
      this.$cookies.remove('userImg')
      this.$cookies.remove('firstSign')
      this.$cookies.remove('memberStatus')
      this.$cookies.remove('guidePageOpen')
      this.$cookies.remove('peopleSign')
      resolve()
    })
  }
}
