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
                :style="{ width: '100%', height: carouselHeight + 'px',borderRadius: '16px' }"
                @click="jumpTo(item)"
            />
          </a>
        </el-carousel-item>
      </el-carousel>
      <img v-else class="defaultBanner" alt="首页轮播图" src="~/assets/img/outer/defaultBanner.png"/>
      <div class="form-wrap">
        <el-input placeholder="输入您的手机号码" maxlength="11" class="input" v-model="form.phone"></el-input>
        <button class="button" @click="submitClue">免费领取</button>
      </div>
    </div>
    <section class="section">
      <section class="hot-wrap">
        <div class="title-wrap">
          <img src="~/assets/img/outer/hot.png" class="hot-icon" alt="hot-icon">
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
          <img src="~/assets/img/outer/new.png" class="new-icon" alt="new-icon">
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

    <div class="content" id="content">
      <section class="column-wrap">
        <h2 class="title">英语在线学习</h2>
        <section v-for="item in columnTypeList" :key="item.type">
          <h3 class="column-name">{{item.name}}</h3>
          <ul class="column-list">
            <li class="column-type"
                :key="`${item.type}-`"
                :class="{'active':`${item.type}-`===activeType}"
                @click="changeActive"
            >
              <nuxt-link :to="`/home/${item.tag}`">全部</nuxt-link>
            </li>
            <li class="column-type"
                v-for="itemType in articleColumn[item.type]" :key="itemType.id"
                :class="{'active':`${item.type}-${itemType.id}`===activeType}"
                @click="changeActive"
            >
              <nuxt-link :to="`/home/${item.tag}-${itemType.id}-1`">
                {{itemType.columnName}}
              </nuxt-link>
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
            v-if="total > 0"
            :total="total"
            :current-page="currPage"
            :page-size="pageSize"
            :gap="pageGap"
            :path="path"
            :last-page="lastPage"
            :type="pageType"
            :center-page-arr="centerPageArr"
            :back-page-arr="backPageArr"
            @afterEnter="scrollToElement"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { columnTdk, classifyTdk } from './tdk'
// import pagination from '~/components/Pagination'
import pagination from '~/components/MyPagination'
import { validateMobile } from '~/utils'

let categoryList = [
  { type: 0, name: '英语外教', tag: 'yywj' },
  { type: 1, name: '英语考级', tag: 'yykj' },
  { type: 2, name: '雅思托福', tag: 'ystf' },
  { type: 3, name: '英语在线学习', tag: 'yyzxxx' },
  { type: 4, name: '成人英语培训', tag: 'cryypx' },
  { type: 5, name: '英语培训机构', tag: 'yypxjg' },
  { type: 6, name: '更多外语学习', tag: 'gdwyxx' }
]
let typeTranslate = {
  yywj: '0',
  yykj: 1,
  ystf: 2,
  yyzxxx: 3,
  cryypx: 4,
  yypxjg: 5,
  gdwyxx: 6
}
let paginationTool = {
  getLastPage(total, pageSize) {
    let lastPage = Math.ceil(total / pageSize)
    return lastPage
  },
  getType(lastPage, pageGap, currentPage) {
    let pageType = 1
    let centerPageArr = []
    let backPageArr = []
    let returnObj = {
      pageType, centerPageArr, backPageArr
    }
    //  不需要省略符的页数在gap+2或以内
    if (lastPage <= pageGap + 2) {
      returnObj.pageType = 1
      return returnObj
    }
    // 靠前的页码---只有后面有省略符
    if (currentPage < pageGap) {
      returnObj.pageType = 2
      return returnObj
    }

    // 在中间的页码---两边都有省略符
    if (currentPage >= pageGap && currentPage <= lastPage - pageGap + 1) {
      returnObj.pageType = 3
      let start = currentPage - Math.floor(pageGap / 2)
      let end = currentPage + Math.floor(pageGap / 2)
      let arr = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }
      centerPageArr = arr
      returnObj.centerPageArr = centerPageArr
      return returnObj
    }

    // 靠后的页码---只有前面有省略符
    if (currentPage > lastPage - pageGap + 1) {
      returnObj.pageType = 4
      let start = lastPage - pageGap
      let end = lastPage
      let arr = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }
      backPageArr = arr
      returnObj.backPageArr = backPageArr
      return returnObj
    }
    return returnObj
  }
}

export default {
  name: 'Home',
  layout: 'websiteOuter',
  components: { pagination },
  scrollToTop: false,
  head() {
    return {
      title: `${this.title} - 说客英语`,
      meta: [
        { 'http-equiv': 'Cache-Control', content: 'no-store, no-cache, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  async asyncData({ app, params }) {
    const link = params.id // yywj-1-1 表示 英语外教分类-分类名称id为1-第一页
    const arr = link ? link.split('-') : []
    const currPage = arr[2] ? Number(arr[2]) : 1
    const pageSize = 10
    let total = 0
    const tag = arr[0] ? arr[0] : 'yywj'
    const type = typeTranslate[tag]
    const id = arr[1] ? arr[1] : ''
    const activeType = type ? `${type}-${id}` : '0-'

    // 设置meta
    const title = id ? columnTdk[id].title : classifyTdk[type].title
    const keywords = id ? columnTdk[id].keywords : classifyTdk[type].keywords
    const description = id ? columnTdk[id].description : classifyTdk[type].description

    let path = `/home/${tag}-${id}-`
    let pageGap = 5 // 分页器的分页密度
    let lastPage = 1
    let pageType = 1
    let centerPageArr = []
    let backPageArr = []

    // 通过total和pageSize获得最大页码lastPage
    function getLastPage() {
      // 这里的total和pageSize就是你想要的分页size和你的数据的总数
      lastPage = paginationTool.getLastPage(total, pageSize)
    }

    // 根据当前页码，判断分液器要使用那种排列方式
    function getType() {
      // pageGap就是分页器密度 3、5、7....单数比较好看
      let res = paginationTool.getType(lastPage, pageGap, currPage)
      pageType = res.pageType
      centerPageArr = res.centerPageArr
      backPageArr = res.backPageArr
    }

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
      getLastPage()
      getType()
      return {
        type,
        tag,
        id,
        activeType,
        hotList,
        newList,
        carouselList,
        articleColumn,
        articleList,
        currPage,
        pageSize,
        total,
        title,
        keywords,
        description,
        path,
        pageGap,
        lastPage,
        pageType,
        centerPageArr,
        backPageArr,
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
      tag:'',
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
        this.$alert('恭喜您领取成功！平台客服稍后会与您联系', '提示', {
          confirmButtonText: '确定',
          customClass: 'notice-message'
        })
      } catch (e) {
        console.log(e, 'error')
      }
    },
    scrollToElement() {
      const element = document.getElementById('content')
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
    changeActive() {
      setTimeout(() => {
        this.scrollToElement()
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
          padding: 0 3px;
          &:hover {
            color: #0087FF;
          }
        }

        &:after {
          content: "";
          width: 0;
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
      border-left: 1px solid rgba(216, 216, 216, 0.5);
      box-sizing: border-box;
      width: 822px;
      .total {
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        line-height: 19px;
        margin-bottom: 4px;
      }

      .article {
        padding: 16px 0 16px 15px;
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
