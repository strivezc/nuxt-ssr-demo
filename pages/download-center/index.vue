<template>
  <div class="download-center">
    <div class="download-wrap">
      <div class="wrap-margin">
        <div class="download-content">
          <div class="download-title">说客英语APP</div>
          <p>约课、上课、测练，多功能融为一体</p>
          <div class="download-block">
            <img src="@/assets/img/outer/upload-pic.png" alt="" />
            <div class="block-right">
              <a
                  href="https://apps.apple.com/cn/app/%E8%AF%B4%E5%AE%A2%E8%8B%B1%E8%AF%AD-%E4%B8%93%E6%B3%A8%E9%9D%92%E5%B0%91%E5%84%BF%E5%9C%A8%E7%BA%BF%E8%8B%B1%E8%AF%AD%E6%95%99%E8%82%B2/id1071330149"
                  target="_blank"
              >
                <div class="icon-img">
                  <img src="@/assets/img/outer/phone-ios.png" alt="" />
                </div>
                <div>iPhone 下载</div>
                <span class="icon iconfont icon_right"></span>
              </a>
              <a
                  href="https://sj.qq.com/myapp/detail.htm?apkName=com.chindle.talk915&info=BE9D9CAC9FCD300639B33381441D1FF6"
                  target="_blank"
              >
                <div class="icon-img">
                  <img src="@/assets/img/outer/android.png" alt="" />
                </div>
                <div>Android 下载</div>
                <span class="icon iconfont icon_right"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="other-wrap">
      <div class="other-title">
        <img src="@/assets/img/outer/title_left.png" alt="" />
        <span>其他工具下载</span>
        <img src="@/assets/img/outer/title_right.png" alt="" />
      </div>
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
        <div class="block">
          <img src="@/assets/img/outer/sun.png" alt="" />
          <div>
            <div class="b-title">向日葵 远程协助软件</div>
            <div class="b-tips">当有技术故障时候，说客英语客服可通过此软件远程协助解决问题。</div>
            <a href="https://sunlogin.oray.com/download/" target="_blank">
              <div class="b-btn">立即下载</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadCenter',
  layout: 'websiteOuter',
  head() {
    return {
      title: '英语学习软件_英语口语学习软件下载',
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: '英语学习软件,学习英语的软件,英语口语学习软件,英语学习软件推荐,说客英语下载,真人外教一对一,欧美外教一对一,英语口语在线学习,一对一英语线上课程,英语口语培训,英语学习app下载'
        },
        {
          hid: 'description',
          name: 'description',
          content: '说客英语APP是一款在线英语学习软件，支持真人外教一对一英语教学，该款APP课满足学员英语口语在线学习、雅思英语学习、托福英语学习、商务英语学习、外贸英语学习、成人英语学习、英语单词学习等不同的英语学习需求。'
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
    return {}
  },
  created() {
    // 如果是客户端，显示错误信息
    if (process.client) {
      if (this.asyncDataErr.resultCode===3) {
        this.$message.error(this.asyncDataErr.resultMessage)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .download-center {
    .wrap-margin {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      text-align: center;
    }

    .download-wrap {
      height: 635px;
      background: url('~/assets/img/outer/download-bg.png') no-repeat center;
      background-size:1920px 680px;

      .download-content {
        text-align: left;

        .download-title {
          padding-top: 112px;
          font-size: 48px;
          font-weight: bold;
          color: #222325;
        }

        p {
          margin-top: 30px;
          font-weight: 500;
          font-size: 24px;
          font-weight: 400;
          color: #8D949B;
        }

        img {
          margin: 38px 57px 0 0;
        }
      }

      .download-block {
        display: flex;

        &>img {
          width: 200px;
          height: 200px;
        }

        .block-right {

          &>a {
            display: flex;
            width: 200px;
            height: 56px;
            background: #FFFFFF;
            border-radius: 30px;
            border: 2px solid #0087FF;
            line-height: 56px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            color: #333;
            &:first-child {
              margin: 70px 0 20px 0;

              &>span {
                margin-left: 16px;
              }
            }

            .icon-img {
              margin: 0 15px 0 30px;

              img {
                width: 20px;
                height: 20px;
                margin: 0;
                margin-bottom: 5px;
              }
            }

          }

          span {
            color: #d8d8d8;
            margin-left: 8px;
          }

        }
      }

    }

    .other-wrap {
      width: 1140px;
      min-width: 1200px;
      margin: 0 auto;
      padding-bottom: 30px;
      padding-left: 60px;

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

      .brower-list {
        display: flex;
        flex-wrap: wrap;

        &>div {
          flex-shrink: 0;
          padding:30px;
          width: 460px;
          margin-right: 30px;
          border: 1px solid #EDF1F7;
          margin-bottom: 30px;
          &:hover{
            box-shadow: 0 0 29px 0 rgba(0, 0, 0, 0.15);
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

</style>
