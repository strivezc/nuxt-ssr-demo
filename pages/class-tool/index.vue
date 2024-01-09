<template>
  <div class="class-tool">
    <div class="download-wrap"></div>
    <div class="tool-use">
      <div class="other-title">
        <img src="@/assets/img/outer/title_left.png" alt="" />
        <span>如何上课</span>
        <img src="@/assets/img/outer/title_right.png" alt="" />
      </div>
      <div class="tool-process">
        <img src="@/assets/img/outer/processpic.png" alt="" />
        <div class="tool-content">
          <div class="first-step">
            <div class="step-title">注册</div>
            <div class="step-tips">注册可得新用户福利，课程顾问将尽快与您联系。</div>
            <nuxt-link v-if="isLogin" to="/login">
              <div class="step-btn register">立即注册</div>
            </nuxt-link>
            <div v-else class="register-btn-slot"></div>
          </div>
          <div class="first-step second">
            <div class="step-title">约课</div>
            <div class="step-tips">
              专属课程顾问将联系您，帮助您完成初次测评和约课，之后您可在说客英语官网或APP自主约课。
            </div>
          </div>
          <div class="first-step third">
            <div class="step-title">上课</div>
            <div class="step-tips">
              可通过登录说客英语官网学习大厅或下载使用说客英语APP进入教室上课。
              <br />为保证上课效果，通过官网上课请使用最新版Google Chrome浏览器进入教室。
            </div>
            <a href="https://www.google.cn/chrome/" target="_blank">
              <div class="step-btn">下载谷歌Chrome浏览器</div>
            </a>
            <nuxt-link v-if="isLogin" to="/download-center">
              <div class="step-btn">下载说客英语APP</div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="device-wrap">
      <div class="main-wrap">
        <div class="other-title">
          <img src="@/assets/img/outer/title_left.png" alt="" />
          <span>上课设备要求</span>
          <img src="@/assets/img/outer/title_right.png" alt="" />
        </div>
        <ul class="device-ul">
          <li v-for="(item, index) in deviceList" :key="index">
            <div class="img-block">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="des-block">{{ item.des }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="other-question">
      <div class="other-wrap">
        <div class="b-block first">
          <div class="title">常见问题</div>
          <ul class="qlist">
            <li v-for="item in qlist" :key="item.name">
              <nuxt-link :to="{ name: 'ToolProblem', query: { position: item.id } }" target="_blank">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="b-block">
          <div class="title">浏览器下载</div>
          <div class="brower-list">
            <div class="block">
              <img src="@/assets/img/outer/chrome.png" alt="" />
              <div>
                <div class="b-title">谷歌Chrome浏览器下载</div>
                <div class="b-tips">为保证上课稳定，推荐使用谷歌浏览器。</div>
                <a href="https://www.google.cn/chrome/" target="_blank">
                  <div class="b-btn">下载浏览器</div>
                </a>
              </div>
            </div>
            <div class="block">
              <img src="@/assets/img/outer/360.png" alt="" />
              <div>
                <div class="b-title">360极速浏览器</div>
                <div class="b-tips">使用360极速浏览器也可以正常上课。</div>
                <a href="https://browser.360.cn/ee/index.html" target="_blank">
                  <div class="b-btn">下载浏览器</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dev1 from '@/assets/img/outer/dev1.png'
import dev2 from '@/assets/img/outer/dev2.png'
import dev3 from '@/assets/img/outer/dev3.png'
export default {
  name: 'ClassTool',
  layout: 'websiteOuter',
  head() {
    return {
      title: '在线英语学习_一对一英语线上课程',
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: '在线英语学习,一对一英语线上课程,英语口语在线学习,在线外教一对一,一对一英语线上课程,欧美外教一对一,真人外教一对一,零基础英语学习,英语口语培训,免费在线英语学习,英语口语培训'
        },
        {
          hid: 'description',
          name: 'description',
          content: '说客英语为有英语学习需求的广大学员提供一对一英语线上课程、英语口语在线学习、欧美外教一对一教学、真人外教一对一教学、零基础英语学习、英语口语培训等在线英语学习服务。'
        }
      ]
    }
  },
  async asyncData({ app,store }) {
    let asyncDataErr = []
    try {
      const { resultData }=await app.$api.getRelatedLink()
      store.commit('content/UPDATE_FRIEND_LINKS', resultData)
    } catch (e) {
      console.log(e, 'error')
      asyncDataErr=e
    }
    return {
      asyncDataErr
    }
  },
  data() {
    return {
      qlist: [
        { name: '如何使用电脑上课？', id: 'newtool' },
        { name: '为什么打不开直播间教室？', id: 'liveroom' },
        { name: '我想使用画笔？如何使用？', id: 'usepen' },
        { name: '什么时候能够回看录像？', id: 'reviewvideo' },
        { name: '如何使用IPAD上课？', id: 'ipad' },
        { name: '我可以使用手机上课么？', id: 'usephone' },
      ],
      deviceList: [
        { imgUrl: dev1, des: '台式电脑+摄像头+头戴式耳麦' },
        {
          imgUrl: dev2,
          des: '笔记本电脑或台式机，要求配备麦克风，推荐使用耳机上课；支持Windows 7或macOS 10.10及以上版本的操作系统',
        },
        { imgUrl: dev3, des: 'IPad （ ios9以上系统）' },
      ],
      isLogin: true,
    }
  },
  created() {
    // 如果是客户端，显示错误信息
    if (process.client) {
      if (this.asyncDataErr.resultCode===3) {
        this.$message.error(this.asyncDataErr.resultMessage)
      }
      this.isLogin = !this.$cookies.get('token')
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .class-tool {
    .download-wrap {
      width: 100%;
      height: 680px;
      background: url('@/assets/img/outer/tool-bg.png') no-repeat center;
    }
    .other-title {
      text-align: center;
      font-size: 36px;
      font-weight: 600;
      color: #222325;
      margin: 58px 0 35px 0;
      span{
        margin:0 40px;
      }
    }
    .tool-use {
      width: 1200px;
      min-width: 1200px;
      margin: 0 auto;
      padding-bottom: 80px;


      .tool-process {
        display: flex;
        padding-left: 60px;

        &>img {
          flex-shrink: 0;
          margin-right: 64px;
          width: 148px;
          height: 800px;
        }

        .tool-content {
          .first-step {
            &.second {
              margin-top: 124px;
            }

            &.third {
              margin-top: 184px;
            }
            .step-title {
              font-size: 36px;
              font-weight: 600;
              color: #333333;
              margin: 50px 0 20px 0;
            }

            .step-tips {
              width: 855px;
              font-size: 24px;
              font-weight: 400;
              color: #999999;
              margin-bottom: 30px;
              line-height: 40px;
            }

            .step-btn {
              display: inline-block;
              width: 304px;
              height: 60px;
              border-radius: 8px;
              border: 1px solid #0087FF;
              color: #0087FF;
              font-size: 24px;
              text-align: center;
              line-height: 60px;
              cursor: pointer;
              margin-right: 30px;

              &.register{
                width: 144px;
              }

              &:hover {
                background-color: #0087FF;
                color: #fff;
              }
            }

            .register-btn-slot{
              height: 60px;
            }

            .class-img {
              img {
                width: 847px;
                height: 633px;
              }
            }
          }
        }
      }
    }
    .device-wrap{
      background-color: #F8FCFF;
      padding:85px 0 80px 0;
      .main-wrap{
        width: 1200px;
        margin:0 auto;
      }
      .other-title{
        margin:0;
      }
      .device-ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
        height: 180px;
        li{
          width: 380px;
          height: 100%;
          .img-block{
            width: 100%;
            height: 130px;
            margin-bottom: 10px;
            img{
              width: 380px;
            }
          }
          .des-block{
            text-align: center;
            font-size: 14px;
            color: #222325;
          }
        }
        li:nth-child(2){
          .des-block{
            width: 380px;
            margin:0 auto;
          }
        }
        li:nth-child(4){
          .des-block{
            width: 178px;
            margin:0 auto;
          }
        }
      }
    }
    .other-question {
      background: #fff;
      padding-bottom: 40px;
      padding-left: 60px;

      .other-wrap {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        min-width: 1200px;
        margin: 0 auto;
        padding-top: 64px;

        .b-block {
          &.first {
            width: 496px;
            ul{
              display: flex;
              flex-wrap: wrap;

              li{
                a{
                  display: block;
                  cursor: pointer;
                  width: 248px;
                  font-size: 14px;
                  color:#666;
                  line-height: 32px;
                  &:hover{
                    color:#0087FF;
                  }
                }

              }
            }
          }

          .title {
            font-size: 36px;
            font-weight: 600;
            color: #222325;
            margin-bottom: 35px;
          }
          .brower-list{
            &>div{
              padding:30px;
              width: 460px;
              margin-right: 30px;
              border: 1px solid #EDF1F7;
              margin-bottom: 30px;
              &:hover{
                box-shadow: 0 0 29px 0 rgba(0, 0, 0, 0.15);
              }
            }

          }
          .block {
            display: flex;

            img {
              width: 56px;
              height: 56px;
              flex-shrink: 0;
              margin-right: 20px;
            }

            .b-title {
              font-size: 16px;
              font-weight: 500;
              color: #333333;
            }

            .b-tips {
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              margin:10px 0;
            }

            .b-btn {
              width: 102px;
              height: 32px;
              border-radius: 4px;
              border: 1px solid #0087FF;
              color: #0087FF;
              font-size: 14px;
              text-align: center;
              line-height: 32px;
              cursor: pointer;

              &:hover {
                background-color: #0087FF;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

</style>
