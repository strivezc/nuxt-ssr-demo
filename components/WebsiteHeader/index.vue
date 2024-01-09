<template>
  <div class="website-header">
    <div class="header-wrap middle-wrap">
      <nuxt-link to="/">
        <div class="header-left cursor-has">
          <img src="~/assets/img/outer/icon-hl.png" />
        </div>
      </nuxt-link>
<!--      <ul v-if="this.$route.name != 'Login'">-->
      <ul>
        <li
            v-for="(item, idx) in webList"
            :key="idx"
            @click="clickTitle(item.path)"
            class="cursor-has"
            :class="item.path === index ? 'activeIndex' : ''"
        >
          <nuxt-link class="pb-16" :to="item.path">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebsiteHeader',
  data() {
    return {
      webList: [
        { title: '首页', path: '/' },
        { title: '全球师资', path: 'global-faculty' },
        { title: '主修课程', path: 'course-system' },
        { title: '专业课程', path: 'oral-class' },
        { title: '企业培训', path: 'corporate-training' },
        // { title: '家长社区', path: 'Parents' },
        { title: '如何上课', path: 'class-tool' },
        { title: '下载中心', path: 'download-center' },
      ],
      index: this.$route.path,
    }
  },
  created() {
  },
  methods: {
    clickTitle(path) {
      this.index = path
    },
  }
}
</script>

<style scoped lang="scss">
  .website-header {
    width: 100%;
    min-width: 1200px;
    height: 120px;
    background: linear-gradient(0deg, rgba(0, 135, 255, 1) 0%, rgba(0, 156, 255, 1) 100%);

    .header-wrap {
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 1200px;
      position: relative;
      .header-left {
        margin-top: 28px;
      }
      ul {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        bottom: 0;
        height: 37px;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

        .activeIndex {
          font-weight: bold;
        }

        li {
          margin-right: 34px;

          a {
            color: #fff;
          }

          &:first-child {
            margin-left: 3px;
          }

          &:last-child {
            margin-right: 0;
          }
          .pb-16 {
            padding-bottom: 16px;
          }
        }
      }
    }
  }
</style>
