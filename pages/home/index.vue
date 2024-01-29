<template>
  <div class="container">
    <p class="site">当前位置：<nuxt-link to="/home">首页</nuxt-link></p>
    <div class="carousel-wrap">
      <el-carousel v-if="carouselList.length > 0" :height="carouselHeight + 'px'" :interval="5000" arrow="hover">
        <el-carousel-item v-for="item in carouselList" :key="item.id">
          <a :href="item.linkUrl" target="_blank">
            <img
                :src="item.imgUrl"
                alt="首页轮播图"
                :style="{ width: '100%', height: carouselHeight + 'px' }"
                @click="jumpTo(item)"
            />
          </a>
        </el-carousel-item>
      </el-carousel>
      <img v-else class="defaultBanner" src="~/assets/img/outer/defaultBanner.png" alt=""/>
      <div class="form-wrap">
        <el-input placeholder="输入您的手机号码" maxlength="11" class="input" v-model="form.phone"></el-input>
        <button class="button" @click="submitClue">免费领取</button>
      </div>
    </div>
    <section class="section">
      <section class="hot-wrap">
        <div class="title-wrap">
          <img src="~/assets/img/outer/hot.png" class="hot-icon" alt="">
          <h2 class="title">热门资讯</h2>
        </div>
        <ul class="ul">
          <li class="li" v-for="item in hotList" :key="item.id">
            <nuxt-link :to="`/article-details/${item.id}`" :title="item.articleTitle" no-prefetch>
              <h3 class="left">{{item.articleTitle}}</h3>
            </nuxt-link>
            <time class="right">{{item.publishTime}}</time>
          </li>
        </ul>
      </section>
      <section class="new-wrap">
        <div class="title-wrap">
          <img src="~/assets/img/outer/new.png" class="new-icon" alt="">
          <h2 class="title color2">最新资讯</h2>
        </div>
        <ul class="ul">
          <li class="li" v-for="item in newList" :key="item.id">
            <nuxt-link :to="`/article-details/${item.id}`" :title="item.articleTitle" no-prefetch>
              <h3 class="left">{{item.articleTitle}}</h3>
            </nuxt-link>
            <time class="right">{{item.publishTime}}</time>
          </li>
        </ul>
      </section>
    </section>

    <div class="content" ref="content">
      <section class="column-wrap">
        <h2 class="title">英语在线学习</h2>
        <section v-for="item in columnTypeList" :key="item.type">
          <h3 class="column-name">{{item.name}}</h3>
          <ul class="column-list">
            <li class="column-type"
                :key="`${item.type}-null`"
                :class="{'active':`${item.type}-null`===activeType}"
                @click="changeActive(item.type,null)"
            >全部
            </li>
            <li class="column-type"
                v-for="itemType in articleColumn[item.type]" :key="itemType.id"
                :class="{'active':`${item.type}-${itemType.id}`===activeType}"
                @click="changeActive(item.type,itemType.id)"
            >
              {{itemType.columnName}}
            </li>
          </ul>
        </section>
      </section>
      <section class="article-wrap">
        <p class="total">搜索到 {{total}} 篇文章</p>
        <ul>
          <li class="article" v-for="item in articleList" :key="item.id">
            <nuxt-link class="fl-c" :to="`/article-details/${item.id}`" no-prefetch>
            <img class="left" :src="item.articleImg" alt="文章封面"/>
              <div class="right">
                <h3 class="article-title" :title="item.articleTitle">{{item.articleTitle}}</h3>
                <p class="article-des">{{item.articleIntroduce}}</p>
                <time class="time">{{item.publishTime}}</time>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="currPage"
            :limit.sync="pageSize"
            @pagination="getList"
        />
      </section>
    </div>
  </div>
</template>

<script>
import pagination from '~/components/Pagination'
import { validateMobile } from '~/utils'

let categoryList= [
  { type: 0, name: '英语外教' },
  { type: 1, name: '英语考级' },
  { type: 2, name: '雅思托福' },
  { type: 3, name: '英语在线学习' },
  { type: 4, name: '成人英语培训' },
  { type: 5, name: '英语培训机构' },
  { type: 6, name: '更多外语学习' }
]
export default {
  name: 'Home',
  layout: 'websiteOuter',
  components: { pagination },
  scrollToTop: false,
  head() {
    return {
      title: '说客英语_英语口语在线学习_外教一对一培训',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '外教英语,英语口语在线学习,英语培训,欧美一对一外教,外教一对一,一对一雅思外教,一对一英语培训,找英语外教,线上一对一英语外教,真人外教一对一,外教口语一对一,英语一对一线上外教,在线外教一对一'
        },
        {
          hid: 'description',
          name: 'description',
          content: '说客英语，国内在线英语外教一对一培训知名品牌，外教老师全部持有TESOL、TEEL资格认证，有欧美英语外教、菲律宾英语外教、中国英语教师等英语一对一教师可供学员选择，适合零基础和其他不同基础的学员进行英语学习及英语口语练习。'
        }
      ]
    }
  },
  async asyncData({ app, query, store }) {
    const currPage = query.currPage ? Number(query.currPage) : 1
    const pageSize = 10
    let total = 0
    const type = query.type
    const id = query.id
    const activeType = type ? `${type}-${id}` : '0-null'
    const fetchHotArticle = () => {
      return new Promise((resolve) => {
        app.$api.queryRecommendArticle(1).then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchNewArticle = () => {
      return new Promise((resolve) => {
        app.$api.queryRecommendArticle(2).then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchCarouselList = () => {
      return new Promise((resolve) => {
        app.$api.getPositionAdvByType(17).then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchArticleColumn = () => {
      return new Promise((resolve) => {
        app.$api.queryColumnAndCategoryList().then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchArticleList = () => {
      return new Promise((resolve) => {
        const params = {
          id,
          category: type,
          currPage,
          pageSize
        }
        console.log(params,'params')
        app.$api.queryArticle(params).then(res => {
          total = res.totalCount
          resolve(res.resultData)
        })
      })
    }
    try {
      const [hotList = [], newList = [], carouselList = [], articleColumn = [], articleList = []] = await Promise.all([
        fetchHotArticle(),
        fetchNewArticle(),
        fetchCarouselList(),
        fetchArticleColumn(),
        fetchArticleList()
      ])
      return {
        type,
        id,
        activeType,
        hotList,
        newList,
        carouselList,
        articleColumn,
        articleList,
        currPage,
        pageSize,
        total
      }
    } catch (e) {
      console.log(e, 'error')
    }
  },
  async fetch({ app, store }) {
    await Promise.all([
      store.dispatch('content/queryFriendLinks'),
      store.dispatch('content/querySideBar')
    ])
  },
  data() {
    return {
      form: {
        phone: ''
      },
      carouselHeight: 380,
      type:'',
      id:''
    }
  },
  watchQuery: true,
  computed:{
    columnTypeList(){
      let arr=[]
      Object.keys(this.articleColumn).forEach(key=>{
        if (this.articleColumn[key].length>0) {
          arr.push(categoryList[key])
        }
      })
      return arr
    }
  },
  methods: {
    async submitClue() {
      try {
        if (!this.form.phone) {
          this.$alert('请输入手机号码！', '提示', {
            confirmButtonText: '确定',
            customClass: 'notice-message'
          })
          return
        }
        if (!validateMobile(this.form.phone)) {
          this.$alert('手机号格式不正确！', '提示', {
            confirmButtonText: '确定',
            customClass: 'notice-message'
          })
          return
        }
        await this.$api.submitClue(this.form.phone)
        this.$alert('恭喜您领取成功', '提示', {
          confirmButtonText: '确定',
          customClass: 'notice-message'
        })
      } catch (e) {
        console.log(e, 'error')
      }
    },
    scrollToElement() {
      const element = this.$refs.content
      if (element) {
        const yOffset = 20
        window.scrollTo({
          top: element.offsetTop - yOffset,
          behavior: 'smooth'
        })
      }
    },
    jumpTo(item) {
      const params = {
        id: item.id,
        position: item.position,
        title: item.title
      }
      this.$api.clickBanner(params)
    },
    getList({ page }) {
      this.$router.push({ path: '/home', query: { type:this.type, id:this.id,currPage:page } }, () => {
        setTimeout(() => {
          this.scrollToElement()
        })
      })
    },
    changeActive(type, id) {
      this.$router.push({ path: '/home', query: { type, id } }, () => {
        setTimeout(() => {
          this.scrollToElement()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .carousel-wrap {
    position: relative;
    height: 380px;

    .defaultBanner {
      width: 100%;
      height: 380px;
    }

    .el-carousel__arrow {
      margin: 0 60px;
      height: 60px;
      width: 60px;

      i {
        font-size: 20px;
      }
    }

    .el-carousel__item {
      img {
        width: 100%;
      }
    }

    .form-wrap {
      position: absolute;
      z-index: 9;
      right: 40px;
      top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      height: 300px;
      background: url("@/assets/img/outer/formBg.png") center no-repeat;
      background-size: cover;

      .input {
        width: 340px;
        display: block;
        margin-top: 140px;

        ::v-deep .el-input__inner {
          width: 340px;
          height: 60px;
          border-radius: 60px 60px 60px 60px;
          border: 1px solid #edf1f7;
          font-size: 22px;
          text-align: center;

          &::placeholder {
            font-size: 22px;
            font-weight: 500;
            color: #cccccc;
          }
        }
      }

      .button {
        width: 340px;
        height: 60px;
        background: linear-gradient(103deg, #FF5C01 0%, #FF9900 100%);
        border-radius: 60px;
        font-size: 24px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 60px;
        margin-top: 10PX;
        text-align: center;
        cursor: pointer;
        border: none;
        outline: none;
      }
    }
  }

  .section {
    background: #ffffff;
    width: 100%;
    display: flex;
    height: 300px;
    margin-top: 20px;
    margin-bottom: 21px;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 16px;

    .hot-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-right: 15px;
    }

    .new-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 15px;
    }

    .ul {
      margin-top: 20px;

      .li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 23px;

        .left {
          width: 430px;
          font-size: 18px;
          font-weight: 400;
          color: #666666;
          line-height: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .right {
          font-size: 16px;
          font-weight: 500;
          color: #999999;
          line-height: 18px;
        }

        &:hover .left, &:hover .right {
          color: #0087FF;
        }
      }
    }

    .title-wrap {
      display: flex;
      align-items: center;

      .hot-icon {
        width: 20px;
        height: 21px;
      }

      .new-icon {
        width: 30px;
        height: 24px;
      }

      .title {
        font-size: 22px;
        font-weight: bold;
        color: #FF5C01;
        line-height: 36px;
        margin-left: 10px;
      }

      .color2 {
        color: #FF9900;
      }
    }
  }

  .content {
    display: flex;
    background: #ffffff;
    width: 100%;
    margin-bottom: 30px;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 16px;

    .column-wrap {
      display: flex;
      flex-direction: column;
      width: 318px;

      .title {
        font-size: 22px;
        font-weight: 500;
        color: #666666;
        line-height: 22px;
        margin-bottom: 20px;
      }

      .column-name {
        width: 278px;
        height: 30px;
        background: #F9F9F9;
        padding-left: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #666666;
        line-height: 30px;
        margin-bottom: 12px;
      }

      .column-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 40px;
        padding-right: 40px;
        padding-left: 10px;

        .column-type {
          font-size: 16px;
          line-height: 28px;
          color: #666666;
          margin-bottom: 5px;
          cursor: pointer;

          &:hover {
            color: #0087FF;
          }
        }

        &:after {
          content: "";
          width: 80px;
        }

        .active {
          color: #0087FF;
        }
      }
    }

    .article-wrap {
      display: flex;
      flex-direction: column;
      padding-left: 25px;
      border-left: 1px solid #D8D8D8;

      .total {
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        line-height: 19px;
        margin-bottom: 4px;
      }

      .article {
        padding: 16px 15px;
        &:hover {
          background: #F9F9F9;
          border-radius: 16px;
        }

        .left {
          width: 242px;
          height: 150px;
          border-radius: 16px 16px 16px 16px;
          object-fit: cover;
        }

        .right {
          display: flex;
          flex-direction: column;
          margin-left: 20px;

          .article-title {
            font-size: 22px;
            line-height: 22px;
            font-weight: 500;
            color: #333333;
            width: 460px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .article-des {
            font-size: 14px;
            font-weight: 500;
            color: #999999;
            line-height: 22px;
            margin-top: 10px;
            height: 86px;
            width: 510px;
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }

          .time {
            margin-top: 18px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 500;
            color: #999999;
          }
        }

        /*&:hover .right .article-title{*/
        /*  color: #0087FF;*/
        /*}*/
      }
      .fl-c{
        display: flex;
        align-items: center;
      }
    }
  }
</style>
