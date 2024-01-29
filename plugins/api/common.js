import { requestPort } from './requestPort';

export const common = ($axios)=> {
  return {
    getRelatedLink() {
      return $axios({
        url: `${requestPort.config}/aboutUs/getRelatedLink`,
        method: 'get',
      })
    },
    showIndexTeacher(data) {
      return $axios({
        url: `${requestPort.config}/aboutUs/showIndexTeacher`,
        method: 'post',
        data
      })
    },
    experienceCourseDetails() {
      return $axios({
        url: `${requestPort.datebook}/studentExperienceCourse/details`,
        method: 'get',
      })
    },
    getPictureCode() {
      // 获取图形验证码
      return $axios({
        url: `${requestPort.users}/user/getGraphicVerification`,
        method: 'post',
      })
    },
    getPhoneSmsCode(data) {
      return $axios({
        url: `${requestPort.users}/user/sendSmsCodeByCaptcha`,
        method: 'post',
        data,
      })
    },
    sendPhoneSmsCode(data) {
      // 获取短信验证码 -不带图形验证码
      return $axios({
        url: `${requestPort.users}/user/sendSmsCode`,
        method: 'post',
        data,
      })
    },
    register(data) {
      // 注册
      return $axios({
        url: `${requestPort.users}/user/register`,
        method: 'post',
        data,
      })
    },
    logout(isApp) {
      // 退出登录
      return $axios({
        url: `${requestPort.users}/user/logout/${isApp}`,
        method: 'post',
      })
    },
    receiveTrialClass(data) {
      return $axios({
        url: `${requestPort.datebook}/studentExperienceCourse/receiveTrialClass`,
        method: 'post',
        data,
      })
    },
    getTrialClassTime() {
      return $axios({
        url: `${requestPort.datebook}/studentExperienceCourse/getTrialClassTime`,
        method: 'get',
      })
    },
    clickBanner(data) {
      return $axios({
        url: `${requestPort.config}/officalHome/click`,
        method: 'post',
        data,
      })
    }
  }
}
