<template>
  <div class="container">
    <p class="site">当前位置：<nuxt-link to="/home">首页</nuxt-link> > {{articleDetail.articleTitle}}</p>
    <div class="flex">
      <section class="left-wrap">
        <article class="article-wrap">
          <h2 class="title">{{articleDetail.articleTitle}}</h2>
          <div class="time-wrap">
            <time>{{articleDetail.publishTime}}</time>
            <span>浏览量：{{articleDetail.visits}}</span>
          </div>
          <div class="content htmlContent" v-html="articleDetail.articleContent"></div>
        </article>
        <section class="footer">
          <p class="footer-title">推荐阅读</p>
          <nuxt-link :to="`/article-details/${item.id}`" class="li" :title="item.title" v-for="item in recommendList"
                     :key="item.id">
            <h3 class="left">{{item.articleTitle}}</h3>
            <time class="right">{{item.publishTime}}</time>
          </nuxt-link>
        </section>
      </section>
      <aside class="right-wrap">
        <div class="item" v-for="item in sideAdvList" :key="item.id">
          <a :href="item.linkUrl" target="_blank" :title="item.title">
            <img
                :src="item.imgUrl"
                alt="文章详情广告位"
                @click="jumpTo(item)"
            />
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetails',
  layout: 'websiteOuter',
  head() {
    return {
      title: `${this.articleDetail.seoTitle} - 说客英语`,
      meta: [
        { 'http-equiv': 'Cache-Control', content: 'no-store, no-cache, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.articleDetail.seoKeyword}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.articleDetail.seoIntroduce}`
        }
      ]
    }
  },
  async asyncData({ app, params, store }) {
    const id = params.id
    const fetchRecommendList = () => {
      return new Promise((resolve) => {
        app.$api.queryRecommendArticle(3).then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchArticle = () => {
      return new Promise((resolve) => {
        app.$api.articleShow(id).then(res => {
          resolve(res.resultData)
        })
      })
    }
    const fetchSideAdvList = () => {
      return new Promise((resolve) => {
        app.$api.getPositionAdvByType(18).then(res => {
          resolve(res.resultData)
        })
      })
    }
    try {
      const [articleDetail,recommendList,sideAdvList] = await Promise.all([
        fetchArticle(),
        fetchRecommendList(),
        fetchSideAdvList(),
      ]);
      return {
        articleDetail,
        recommendList,
        sideAdvList
      }
    } catch (e) {
      console.log(e, 'error')
    }
  },
  async fetch({ app, store }) {
    await Promise.all([
      store.dispatch('content/queryFriendLinks'),
      store.dispatch('content/querySideBar')
    ]);
  },
  validate({ params }) {
    return !!params.id
  },
  methods: {
    jumpTo(item) {
      const params = {
        id: item.id,
        position: item.position,
        title: item.title
      }
      this.$api.clickBanner(params)
    },
  }
}
</script>

<style scoped lang="scss">
  .left-wrap {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 870px;
    background: #FFFFFF;
    padding: 30px;
    margin-bottom: 40px;
    border-radius: 16px 16px 16px 16px;

    .article-wrap {
      .title {
        font-size: 28px;
        font-weight: 500;
        color: #333333;
        line-height: 40px;
        margin-bottom: 5px;
      }

      .time-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
        color: #999999;
        padding-bottom: 34px;
        border-bottom: 1px solid rgba(216, 216, 216, 0.5);
      }

      .content {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 40px;
        padding-top: 30px;
        padding-bottom: 60px;
        border-bottom: 1px solid rgba(216, 216, 216, 0.5);
      }
    }

    .footer {
      display: flex;
      flex-direction: column;
      padding-bottom: 4px;

      .footer-title {
        padding-top: 27px;
        padding-bottom: 2px;
        font-size: 22px;
        font-weight: 500;
        color: #000000;
      }

      .li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 23px;

        .left {
          font-size: 18px;
          font-weight: 400;
          color: #666666;
          width: 600px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .right {
          font-size: 16px;
          font-weight: 500;
          color: #999999;
        }

        &:hover .left, &:hover .right {
          color: #0087FF;
        }
      }
    }
  }

  .right-wrap {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    .item{
      width: 300px;
      height: 600px;
      object-fit: cover;
      margin-bottom: 40px;
      img{
        width: 300px;
        height: 600px;
        border-radius: 16px 16px 16px 16px;
      }
    }
  }
</style>
