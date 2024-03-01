<template>
  <el-dialog
      :visible.sync="dialogShow"
      :show-close="false"
      @open="open"
      :before-close="close"
      :close-on-click-modal="false"
      width="450px"
  >
    <div class="container">
      <img src="@/assets/img/close.png" @click="close" class="close" alt="关闭图标" />
      <div class="title-wrap">
        <div class="top">
          <div class="left-line"></div>
          <div class="text">我要试听</div>
          <div class="right-line"></div>
        </div>
        <div class="bottom">1节1V1外教课+海量学习资源</div>
      </div>
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item prop="phone">
          <el-input placeholder="输入您的手机号码" maxlength="11" class="input" v-model="form.phone">
            <img slot="prefix" src="@/assets/img/phone.png" alt="phone-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="pictureCode" v-if="centreMsg === 1">
          <el-input placeholder="输入图形验证码" maxlength="4" class="input" v-model="form.pictureCode">
            <img slot="prefix" src="@/assets/img/code.png" alt="code-icon"/>
            <img class="send_code" slot="suffix" :src="imgBase64" alt="图形验证码" @click="getBase64ImgCode" />
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input placeholder="输入短信验证码" maxlength="6" class="input" v-model="form.captcha">
            <img slot="prefix" src="@/assets/img/phoneCode.png" alt="短信验证码"/>
            <span class="code" slot="suffix" @click="sendCode" v-show="countdown === 0">获取验证码</span>
            <span class="code time" slot="suffix" v-show="countdown > 0">{{ countdown }}S</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="button" :style="disable ? 'opacity: 0.3' : ''" @click="submit">立即领取</div>
      <!--      <div class="button" @click="submit">免费领取</div>-->
      <div class="flex-c">
        <el-checkbox v-model="agree">
          <div class="tip">
            我已阅读并同意说客英语<a :href="`${BASE_PATH}/student/user-agreement`"><span class="blue">《用户条款》</span
          ></a><a :href="`${BASE_PATH}/student/privacy-policy`"><span class="blue">《隐私政策》</span></a>
          </div>
        </el-checkbox>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { validateMobile } from '@/utils'

const TIME_COUNT = 60
export default {
  name: 'ReceiveDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写手机号码!'))
      } else if (!validateMobile(value)) {
        callback(new Error('手机号码格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      BASE_PATH: process.env.BASE_PATH,
      form: {
        isApp: 2,
        phone: '',
        captcha: '',
        pictureCode: '',
        registerFrom: 'talk915Child',
        recommendCode: '' // 推荐码
      },
      formRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        captcha: [{ required: true, trigger: 'blur', message: '请填写手机验证码!' }],
        pictureCode: [{ required: true, trigger: 'blur', message: '请填写图形验证码!' }]
      },
      agree: '',
      countdown: 0,
      timer: null,
      imgBase64: '',
      code: '',
      centreMsg: 1
    }
  },
  computed: {
    disable() {
      return !(this.form.phone && this.form.captcha && this.agree)
    },
    dialogShow: {
      get() {
        return this.showDialog;
      },
      set(newVal) {
        this.$emit("update:showDialog", newVal);
      },
    },
  },
  created() {
  },
  methods: {
    submit() {
      if (this.disable) return
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const {resultData} = await this.$api.register(this.form)
            this.$cookies.set('token',resultData.token)
            this.$cookies.set('userId',resultData.userId)
            this.$cookies.set('guidePageOpen',0)
            this.$cookies.set('peopleSign',0)
            this.$cookies.set('userType',resultData.userType)
            this.$cookies.set('userName',resultData.userName)
            this.$cookies.set('userImg',resultData.userImg)
            this.$cookies.set('userType','2')
            this.$store.commit('user/SET_MOBILEAREA', resultData.mobileArea)
            this.$store.commit('user/SET_USERPHONE', resultData.phone)
            this.$store.commit('user/SET_USERNAME', resultData.userName)
            this.$store.commit('user/SET_USER_IMG', resultData.userImg)

            this.$store.dispatch('user/getExperienceCourseDetail').then(()=>{
              this.$bus.$emit('updateTrialClassStatus');
            })
            this.loading = false
            this.$emit('loginAction', resultData)
          } catch (e) {
            this.loading = false
            console.log(e, 'error')
          }
        }
      })
    },
    async getBase64ImgCode() {
      try {
        const {resultData} = await this.$api.getPictureCode()
        this.imgBase64 = resultData.picture
        this.code = resultData.code
      } catch (e) {
        console.log(e, 'error')
      }
    },
    open() {
      this.getBase64ImgCode()
      this.dialogShow=true
    },
    close() {
      this.$refs.form.clearValidate()
      this.form.phone = ''
      this.form.captcha = ''
      this.form.pictureCode = ''
      this.agree = ''
      this.dialogShow=false
    },
    async sendCode() {
      if (this.timer) return
      let flag = true
      let validateArr = []
      if (this.centreMsg === 1) {
        validateArr = ['phone', 'pictureCode']
      } else {
        validateArr = ['phone']
      }
      this.$refs.form.validateField(validateArr, (error) => {
        if (error) {
          flag = false
        }
      })
      if (!flag) return
      try {
        if (this.centreMsg === 1) {
          await this.$api.getPhoneSmsCode({
            phone: this.form.phone,
            pictureCode: this.form.pictureCode,
            code: this.code,
          })
        } else {
          await this.$api.sendPhoneSmsCode({ phone: this.form.phone })
        }
        this.countdown = TIME_COUNT // 短信验证码倒数
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
            this.countdown--
          } else {
            clearInterval(this.timer)
            this.countdown = 0
            this.timer = null
          }
        }, 1000)
      } catch (e) {
        // this.$toast.clear();
        console.log(e, 'error')
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style scoped lang="scss">
  ::v-deep .el-dialog__body {
    padding: 0;
  }

  ::v-deep .el-dialog__header {
    padding: 0;
  }

  ::v-deep .el-dialog {
    border-radius: 24px;
  }

  ::v-deep .el-form-item {
    border-radius: 20px;
  }

  .container {
    position: relative;
    width: 450px;
    background: linear-gradient(180deg, #fffbf2 0%, #ffffff 100%);
    border-radius: 24px;

    .close {
      position: absolute;
      top: 0;
      right: -90px;
      cursor: pointer;
      width: 40px;
      height: 40px;
    }

    .title-wrap {
      display: flex;
      flex-direction: column;
      width: 341px;
      margin: 0 auto 25px;
      padding-top: 35px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 7px;

        .left-line {
          width: 80px;
          height: 4px;
          background: linear-gradient(252deg, #ff5c01 0%, rgba(255, 255, 255, 0) 92%);
          border-radius: 60px 60px 60px 60px;
          opacity: 0.5;
        }

        .right-line {
          width: 80px;
          height: 4px;
          background: linear-gradient(126deg, #ff5c01 0%, rgba(255, 255, 255, 0) 87%);
          border-radius: 60px 60px 60px 60px;
          opacity: 0.5;
        }

        .text {
          font-size: 28px;
          line-height: 40px;
          font-weight: bold;
          color: #ff5c01;
        }
      }

      .bottom {
        font-size: 24px;
        line-height: 40px;
        color: #ff5c01;
        text-align: center;
      }
    }

    .input {
      position: relative;
      width: 404px;
      display: block;
      margin: 0 auto 0;

      ::v-deep .el-input__inner {
        width: 404px;
        height: 60px;
        border-radius: 60px 60px 60px 60px;
        border: 1px solid #edf1f7;
        font-size: 22px;
        padding-left: 86px;

        &::placeholder {
          font-size: 22px;
          font-weight: 500;
          color: #cccccc;
        }
      }

      .code {
        display: block;
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
        width: 100px;
        cursor: pointer;
        font-size: 20px;
        font-weight: 400;
        color: #0087ff;
        line-height: 36px;
        text-align: center;
      }

      .send_code {
        display: block;
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        width: 110px;
        height: 50px;
        cursor: pointer;
        border-radius: 4px;
      }

      .time {
        color: #999999;
      }
    }

    ::v-deep .el-input__prefix {
      display: flex;
      align-items: center;
      margin-left: 41px;
    }

    .button {
      width: 399px;
      height: 60px;
      background: linear-gradient(103deg, #ff5c01 0%, #ff9900 100%);
      border-radius: 60px 60px 60px 60px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      line-height: 60px;
      margin: 20px auto 20px;
      text-align: center;
      cursor: pointer;
    }

    .tip {
      font-size: 14px;
      font-weight: 400;
      color: #909399;
      line-height: 16px;
      margin-bottom: 28px;
    }

    .blue {
      color: #0087ff;
    }

    ::v-deep .el-checkbox__inner {
      border-radius: 50%;

      &:hover {
        border-color: #ff5c01;
      }
    }

    ::v-deep.el-checkbox__input.is-checked .el-checkbox__inner,
    ::v-deep.el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: #ff5c01;
      border-color: #ff5c01;
    }

    ::v-deep.el-checkbox__input.is-focus .el-checkbox__inner,
    ::v-deep.el-checkbox__input .el-checkbox__inner:hover {
      border-color: #ff5c01;
    }

    .flex-c {
      display: flex;
      justify-content: center;
    }

    ::v-deep .el-form-item__error {
      width: 100%;
      text-align: center;
      color: #ff5c01;
    }
  }
</style>
