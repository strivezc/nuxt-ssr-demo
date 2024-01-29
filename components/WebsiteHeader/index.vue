<template>
  <header class="website-header">
    <div class="header-wrap middle-wrap">
      <nuxt-link to="/home">
        <div class="header-left">
          <img class="logo" src="~/assets/img/outer/icon-hl.png"/>
          <!--          <img class="icon" src="~/assets/img/vector.png" alt="">-->
          <!--          <span class="phone" itemprop="telephone">400-990-9915</span>-->
        </div>
      </nuxt-link>
      <div class="header-right">
        <div class="receive-button" @click="openReceiveDialog"
             v-if="showLoginBlock || (status == 3 && getTrialClass == 0)">
          <img src="@/assets/img/gift.png" class="icon" alt=""/>
          <span class="text">领取体验课</span>
        </div>
        <template v-if="showLoginBlock">
          <a :href="`${BASE_PATH}/student/login?routerBtn=loginBtn`">
            <button class="login-button">登录</button>
          </a>
          <a :href="`${BASE_PATH}/student/login?routerBtn=registerBtn`">
            <button class="login-button reg-button">注册</button>
          </a>
        </template>
        <!-- 学生端已登录账号显示 -->
        <div class="main-left" v-else-if="!showLoginBlock">
          <div class="main-left-img cursor-has" @click="jumpHome">
            <img v-if="!userImg || userImg === 'default.jpg'" src="~/assets/img/default-img.png" alt=""/>
            <img v-else :src="userImg" alt=""/>
          </div>
          <div class="main-left-name cursor-has" @click="jumpHome">{{ userName }}</div>
          <el-dropdown trigger="click" @command="handleCommand" @visible-change="visibleChange">
            <span class="main-left-arrow cursor-has">
              <i v-if="isPop" class="el-icon-arrow-up white"></i>
              <i v-else class="el-icon-arrow-down white"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="dropdown-menu__item" :command="1" v-if="userType == 2">我的课程</el-dropdown-item>
              <el-dropdown-item class="dropdown-menu__item" :command="2">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <receiveDialog :show-dialog.sync="showDialog" @loginAction="loginAction"></receiveDialog>
      <receiveExperienceClass
          :show-dialog.sync="showExperienceClass"
          ref="receiveEClass"
          @receiveSuccess="receiveSuccess"
      ></receiveExperienceClass>
      <receiveResult :show-dialog.sync="showReceiveResult"></receiveResult>
    </div>
  </header>
</template>

<script>
import receiveDialog from '../TrialClass/receiveDialog'
import receiveExperienceClass from '../TrialClass/receiveExperienceClass'
import receiveResult from '../TrialClass/receiveResult'

export default {
  name: 'WebsiteHeader',
  components: { receiveDialog, receiveExperienceClass, receiveResult },
  data() {
    return {
      showDialog: false,
      showReceiveResult: false,
      showExperienceClass: false,
      showLoginBlock: true,
      isPop: false,
      BASE_PATH: process.env.BASE_PATH,
      userType: '',
      userImg: '',
      userName: '',
      status: '',
      getTrialClass: ''
    }
  },
  created() {
    this.getTrialClassInfo()
    this.$bus.$on('updateTrialClassStatus', this.getTrialClassInfo)
  },
  beforeDestroy() {
    this.$bus.$off('updateTrialClassStatus')
  },
  methods: {
    jumpHome() {
      if (this.userType == 2) {
        window.location.href = `${this.BASE_PATH}/student/home/learning-hall`
      } else if (this.userType == 1) {
        window.location.href = `${this.BASE_PATH}/teacher/home`
      } else if (this.userType == 8) {
        window.location.href = `${this.BASE_PATH}/teacher/agt-home`
      } else if (this.userType == 3 || this.userType == 5 || this.userType == 9) {
        window.location.href = `${this.BASE_PATH}/agent`
      } else if (this.userType == 0 || this.userType == 99) {
        window.location.href = `${this.BASE_PATH}/admin`
      }
    },
    handleCommand(command) {
      if (command === 1) {
        window.open(`${this.BASE_PATH}/student/home/learning-records`)
      } else if (command === 2) {
        this.$store.dispatch('user/logout').then(() => {
          this.getTrialClassInfo()
        })
      }
    },
    visibleChange(val) {
      this.isPop = val
    },
    openReceiveDialog() {
      if (!this.showLoginBlock && this.status == 3 && this.getTrialClass == 0) {
        this.loginAction()
      } else {
        this.showDialog = true
      }
    },
    receiveSuccess() {
      this.showReceiveResult = true
    },
    loginAction() {
      this.showDialog = false
      this.$refs.receiveEClass.getClassDateAndWeeks()
      this.showExperienceClass = true
      this.showLoginBlock = false
    },
    getTrialClassInfo() {
      if (this.$cookies.get('token')) {
        this.showLoginBlock = false
        this.userType = this.$cookies.get('userType')
      } else {
        this.showLoginBlock = true
      }
      this.status = this.$cookies.get('status')
      this.getTrialClass = this.$cookies.get('getTrialClass')
      this.userImg = this.$cookies.get('userImg')
      this.userName = this.$cookies.get('userName')
    }
  }
}
</script>

<style scoped lang="scss">
  .website-header {
    width: 100%;
    min-width: 1200px;
    height: 80px;
    background: linear-gradient(0deg, rgba(0, 135, 255, 1) 0%, rgba(0, 156, 255, 1) 100%);

    .header-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 1200px;
      position: relative;

      .header-left {
        display: flex;
        align-items: center;

        .logo {
          height: 33px;
        }

        .icon {
          margin-left: 22px;
        }

        .phone {
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          margin-left: 10px;
        }
      }

      .header-right {
        display: flex;
        position: relative;
        height: 100%;

        .receive-button {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          right: 200px;
          width: 140px;
          height: 40px;
          border-radius: 60px 60px 60px 60px;
          border: 1px solid #fff;
          margin-top: 15px;
          cursor: pointer;
          margin-right: 10px;
          cursor: pointer;

          &:hover {
            border: 1px solid transparent;
            background: #ffffff;

            .text {
              color: #FF5C01;
            }
          }

          .icon {
            width: 24px;
            height: 24px;
            margin-right: 3px;
          }

          .text {
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 19px;
          }
        }

        .login-button {
          margin-top: 15px;
          margin-right: 10px;
          width: 94px;
          height: 40px;
          line-height: 40px;
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 20px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 16px;
          text-indent: 16px;
          background: none;
          cursor: pointer;
        }

        .reg-button {
          background: rgba(255, 100, 0, 1);
          border: 1px solid #ff6400;
          border-radius: 20px;
        }
      }

      .main-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 40px;
        color: #fff;
        margin-top: 15px;

        .white {
          color: #ffffff;
        }

        .back {
          line-height: 40px;
          font-size: 15px;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
          text-decoration: underline;
          margin-right: 30px;
        }

        &.teacher {
          div {
            cursor: pointer;
          }

          .main-left-name {
            font-size: 16px;
            margin-right: 10px;
          }

          .logout {
            font-size: 14px;
            text-decoration: underline;
          }
        }

        .main-left-notice {
          position: relative;
          height: 24px;
          cursor: pointer;
          width: 50px;

          .badge-style {
            .el-badge__content {
              border: none;
              background: #ff5e01;
            }

          }

          .notice-bell i {
            width: 18px;
            height: 24px;
            font-size: 24px;
            opacity: 0.8;
          }
        }

        .main-left-img {
          position: relative;
          flex-shrink: 0;
          width: 31px;
          height: 31px;
          border: 1px solid #fff;
          border-radius: 16px;
          margin-left: 30px;

          img {
            height: 100%;
            width: 100%;
            border-radius: 16px;
          }
        }

        .main-left-name {
          font-size: 14px;
          margin-left: 8px;

          &.click {
            text-decoration: underline;
          }
        }

        .main-left-arrow {
          margin-left: 15px;

        }
      }
    }
  }
</style>
