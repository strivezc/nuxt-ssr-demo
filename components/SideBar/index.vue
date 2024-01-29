<template>
  <aside class="sider-wrap">
    <a :href="item.linkUrl" class="sider-item" v-for="item in sideBar" :key="item.id" target="_blank">
      <div><img :src="item.sidebarImg"/>{{item.sidebarName}}</div>
    </a>
    <el-backtop class="sider-item back-top" :right="0" :bottom="0">
      <div><img src="@/assets/img/top_icon.png" alt=""/>返回顶部</div>
    </el-backtop>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
// import serviceIcon from '@/assets/img/service_icon.png'
// import dowaloadIcon from '@/assets/img/dowaload_icon.png'
// import officialIcon from '@/assets/img/official_icon.png'

export default {
  name: 'SideBar',
  data() {
    return {
      sliderList: [
        // { img: serviceIcon, name: '客服', link: '', id: 0 },
        // { img: dowaloadIcon, name: 'App下载', link: '', id: 1 },
        // { img: officialIcon, name: '公众号', link: '', id: 2 }
      ]
    }
  },
  computed: {
    ...mapState('content', ['sideBar'])
  },
  methods: {}
}
</script>

<style lang="scss">
  .sider-wrap {
    z-index: 2000;
    position: fixed;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 90px;
    box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
    border-radius: 8px;
    background: #ffffff;

    .sider-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
      width: 90px;
      position: relative;
      box-shadow: none;
      color: #999;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #F2F6FC;
      }

      img {
        width: 40px;
        height: 40px;
        display: block;
        margin: 0 auto;
        margin-bottom: 6px;
        object-fit: cover;
      }
    }

    .back-top {
      border-radius: 0 0 8px 8px;
    }
  }

</style>
