<template>
  <div id="sider-bar">
    <div class="sider-wrap">
      <el-popover placement="left" trigger="hover" class="official-class" popper-class="loginpop">
        <div class="service">
          点击在线咨询
        </div>
        <el-button slot="reference" @click="openLink()">
          <img src="@/assets/img/service_icon.png" class="icon-img" />客服
        </el-button>
      </el-popover>
      <el-popover placement="left" trigger="hover" class="official-class" popper-class="loginpop">
        <div class="official">
          <img src="@/assets/img/appcode.png" alt="" />
        </div>
        <el-button slot="reference"> <img src="@/assets/img/dowaload_icon.png" class="icon-img" />App下载 </el-button>
      </el-popover>
      <el-popover placement="left" trigger="hover" class="official-class" popper-class="loginpop">
        <div class="official">
          <img src="@/assets/img/official-code.png" alt="" />
        </div>
        <el-button slot="reference"> <img src="@/assets/img/official_icon.png" class="icon-img" />公众号 </el-button>
      </el-popover>
      <template v-if="hasToken && userType == 2">
        <el-popover placement="left" trigger="hover" class="official-class" popper-class="loginpop">
          <div class="service">
            帮助文档
          </div>
          <el-button slot="reference" @click="openHelpDocument">
            <img src="@/assets/img/helpIcon.png" class="icon-img" />帮助文档
          </el-button>
        </el-popover>
      </template>
      <el-backtop :right="0" :bottom="0">
        <div><img src="@/assets/img/top_icon.png" alt="" />返回顶部</div>
      </el-backtop>
    </div>
    <div id="server-dialog" v-if="isServerShow">
      <i class="icon iconfont iconchushaixuanxiang" @click="closeServer()"></i>
      <div>
        <iframe :src="serverUrl" scrolling="auto" frameborder="0" class="trend-container2" id="iframe"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SideBar',
  data() {
    return {
      isServerShow: false,
      serverUrl: '',
      hasToken: this.$cookies.get('token'),
      userType: this.$cookies.get('userType'),
    }
  },
  computed: {
    ...mapState('user', ['userPhone', 'userName'])
  },
  created() {
  },
  methods: {
    openHelpDocument() {
      this.$router.push('/help-document')
    },
    openLink() {
      this.isServerShow = true
      let id = this.$cookies.get('userId')
      let userType = this.$cookies.get('userType')
      let name = ''
      let phone = ''
      if (this.userName) {
        name = this.userName
      } else {
        name = this.$cookies.get('userName')
        // this.$store.commit('user/SET_USERNAME', getUserName())
      }
      if (this.userPhone) {
        phone = this.userPhone
      } else {
        phone = this.$cookies.get('userPhone')
        // this.$store.commit('user/SET_USERPHONE', getUserPhone())
      }
      if (userType === '2') {
        userType = 3
      } else if (userType === '1' || userType === '8') {
        userType = 2
      } else if (userType === '3' || userType === '5' || userType === '9') {
        userType = 4
      }

      if (id) {
        this.serverUrl = `${process.env.IM_LINK}?platformType=0&platformUserId=${id}&platformUserType=${userType}&platformPhone=${phone}&platformNickName=${name}&platformTerminalType=1`
      } else {
        this.serverUrl = `${process.env.IM_LINK}?platformType=0&platformUserId=&platformUserType=7&platformPhone=&platformNickName=&platformTerminalType=1`
      }
    },
    closeServer() {
      this.isServerShow = false
    },
  }
}
</script>

<style lang="scss">
  #sider-bar {
    .sider-wrap {
      z-index: 2000;
      position: fixed;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 64px;
      box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
      border-radius: 8px;

      .el-button.el-popover__reference,
      .sider-item {
        height: 64px;
        width: 64px;
        padding: 0;
        border: none;
        border-radius: 0;
        color: #999;
        cursor: pointer;

        .icon-img {
          width: 23px;
          height: 24px;
          margin-bottom: 6px;
        }

        span {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          font-weight: 400;
        }
      }
      span.official-class{
        display: block;
        height: 64px;
        width: 64px;
        span{
          img{
            margin:0 auto;
          }
        }
        &:first-child{
          button{
            display: block;
            border-radius: 8px 8px 0 0;
          }
        }
        &:last-child{
          button{
            display: block;
            border-radius: 0 0 8px 8px;
          }
        }
      }
      .el-backtop{
        height: 64px;
        width: 64px;
        position: relative;
        border-radius: 0 0 8px 8px;
        box-shadow: none;
        color: #999;
        font-size: 12px;
        font-weight: 400;
        img{
          width: 23px;
          height: 24px;
          display: block;
          margin:0 auto;
          margin-bottom: 6px;
        }
      }

      .sider-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        &:first-child{
          border-radius: 8px 8px 0 0;
        }
        &:last-child{
          border-radius: 0 0 8px 8px;
        }
      }
    }


    #server-dialog {
      position: relative;
      border-radius: 8px;
      position: fixed;
      bottom: 200px;
      right: 100px;
      width: 360px;
      height: 530px;
      background-color: #fff;
      z-index: 2500;
      box-shadow: 3px 3px 8px #909090;

      i {
        position: absolute;
        font-size: 25px;
        cursor: pointer;
        color: #fff;
        right: 13px;
        top: 12px;
      }
      #iframe {
        border-radius: 8px;
        width: 100%;
        height: 530px;
      }
    }
  }
  //公众号弹框
  .el-popover.loginpop {
    min-width: 100px;
    padding: 10px;
    // box-shadow: none;

    div.official {
      height: 100px;
      width: 100px;

      img {
        height: 100%;
        width: 100%;
      }
    }
    div.service{
      text-align: center;
      color:#0087ff;
    }
  }

</style>
