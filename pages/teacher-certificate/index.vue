<template>
  <div class="teacher-certificate">
    <div class="banner"></div>
    <div class="main-wrap">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="teacher-img">
            <img :src="item.userImg" alt=""/>
            <div class="language">教授科目：{{ item.language }}</div>
          </div>
          <div class="teacher-intro">
            <div class="name">{{ item.realName }}</div>
            <div class="nick-name">
              <div></div>
              <div>{{ item.userName }}</div>
            </div>
            <div class="certificate">
              <div>教师资格证编号</div>
              <div>{{ item.certificateNum }}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-group">
        <el-button :disabled="params.currPage == 1" @click="search(0)">上一页</el-button>
        <el-button @click="search(1)" :disabled="params.currPage === maxPage">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherCertificate',
  head() {
    return {
      title: '在线英语学习_真人外教一对一',
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: '在线英语学习,真人外教一对一,欧美外教一对一,菲律宾外教,英语一对一线上外教,一对一雅思外教,TESOL,TEEL,私人外教,线上外教,英语外教,外教老师,一对一雅思外教,英语一对一线上外教'
        },
        {
          hid: 'description',
          name: 'description',
          content: '说客英语严把教师资质关，目前旗下所有的在线英语外教老师全部持有TESOL、TEEL资格认证，现有欧美外教外教一对一、菲律宾外教一对一、中国英语老师一对一等多种一对一线上课程可供学员只有选择。'
        }
      ]
    }
  },
  async asyncData({ app }) {
    let asyncDataErr = []
    let list = []
    let maxPage = 0
    try {
      const { resultData, totalCount } = await app.$api.showIndexTeacher({ currPage: 1, pageSize: 6 })
      list = resultData
      maxPage = Math.ceil(totalCount / 6)
    } catch (e) {
      console.log(e, 'error')
      asyncDataErr = e
    }
    return {
      list,
      maxPage,
      asyncDataErr
    }
  },
  data() {
    return {
      list: [],
      params: {
        currPage: 1,
        pageSize: 6
      },
      maxPage: 1
    }
  },
  created() {
    if (process.client) {
      if (this.asyncDataErr.resultCode === 3) {
        this.$message.error(this.asyncDataErr.resultMessage)
      }
      // var _hmt = _hmt || [];
      // (function() {
      //   var hm = document.createElement('script')
      //   hm.src = 'https://hm.baidu.com/hm.js?9b22e04ba5e05f2cb75a8a266cb8cd61'
      //   var s = document.getElementsByTagName('script')[0]
      //   s.parentNode.insertBefore(hm, s)
      // })()
    }
  },
  methods: {
    async getList() {
      try {
        const { resultData, totalCount } = await this.$api.showIndexTeacher(this.params)
        this.list = resultData
        this.maxPage = Math.ceil(totalCount / 6)
      } catch (e) {
        console.log(e, 'error')
      }
    },
    search(type) {
      // type 0上一页 1下一页
      if (type === 0) {
        this.params.currPage = this.params.currPage - 1
        this.getList()
      } else if (type === 1) {
        this.params.currPage = this.params.currPage + 1
        this.getList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .teacher-certificate {
    background: #fff;
    height: 100vh;

    .banner {
      min-width: 1200px;
      background: url('~/assets/img/outer/teacher-cert.png') no-repeat center;
      width: 100%;
      height: 215px;
    }

    .main-wrap {
      width: 1200px;
      margin: 0 auto;

      ul {
        height: 440px;
        padding-top: 60px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          display: flex;
          width: 33%;
          height: 160px;
          margin-bottom: 60px;

          .teacher-img {
            flex-shrink: 0;
            position: relative;
            width: 134px;
            height: 156px;
            border-radius: 8px;
            border: 1px solid #cccccc;

            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
              object-fit: cover;
            }

            .language {
              position: absolute;
              background: #0087FF;
              opacity: 0.6;
              color: #fff;
              bottom: 0;
              width: 100%;
              height: 18px;
              border-radius: 0 0 8px 8px;
              font-size: 12px;
              text-align: center;
            }
          }

          .teacher-intro {
            margin-left: 15px;

            .name {
              width: 194px;
              height: 32px;
              font-weight: 600;
              color: #333333;
              font-size: 16px;
              line-height: 16px;
              margin-bottom: 15px;
            }

            .nick-name {
              margin-bottom: 40px;
            }

            .nick-name,
            .certificate {
              div:first-child {
                font-size: 12px;
                color: #999999;
                line-height: 12px;
                margin-bottom: 8px;
              }

              div:last-child {
                font-size: 14px;
                color: #333333;
                line-height: 14px;
              }
            }
          }

        }
      }

      .btn-group {
        margin: 0 auto;
        width: 200px;

        .el-button {
          width: 86px;
          height: 32px;
          border-radius: 20px;
          border: 1px solid #0087ff;
          padding: 0;
          font-size: 14px;
          color: #0087ff;
        }
      }
    }
  }

</style>
