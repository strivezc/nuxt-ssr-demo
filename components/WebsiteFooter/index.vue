<template>
  <div class="website-footer">
    <div class="main-wrap middle-wrap">
      <div class="first-line">
        <ul class="product-ul">
          <li v-for="(item, index) in friendLinks" :key="index">
            <a :href="item.url" target="_blank">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
      <ul class="about-us">
        <li>
          <nuxt-link to="/media-reports">关于我们</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact-us/2">联系我们</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/media-reports">热门资讯</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/public-welfare">公益频道</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/class-process">上课流程</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/questionList">网站帮助</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user-agreement">用户协议</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/privacy-policy">隐私条款</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/teacher-certificate" target="_blank">教师资格证展示</nuxt-link>
        </li>
      </ul>
      <div class="last-line">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" tag="a">
          <span>Copyright © 深圳青豆教育科技有限公司 粤ICP备15077651号</span>
        </a>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004425" target="_blank">
          <img src="@/assets/img/icon-beian.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WebsiteFooter',
  data() {
    return {
      BASE_PATH: process.env.BASE_PATH
    }
  },
  computed: {
    ...mapState('content', ['friendLinks'])
  },
}
</script>

<style scoped lang="scss">
  .website-footer {
    position: absolute;
    z-index: 1;
    width: 100%;
    min-width: 1200px;
    height: 220px;
    background: rgba(41, 41, 41, 1);
    color: #8d8d8d;

    a{
      text-decoration: none; /* 去除下划线 */
      color: inherit; /* 继承父元素的文本颜色 */
      &:hover{
        color: #fff;
      }
    }
    .main-wrap {
      width: 1200px;
      margin-top: 60px;
      font-size: 14px;

      .first-line {
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
        .product-ul {
          display: flex;
          height: 16px;
          line-height: 16px;

          li {
            border-right: 1px solid #8d8d8d;
            padding: 0 10px;
            cursor: pointer;
            &:hover{
              color:#fff;
            }
            &:last-child {
              border: none;
              // &:hover{
              //   color: #8d8d8d;
              // }
            }
          }
        }

        .other-link {
          &>span {
            position: relative;
            margin-right: 12px;
            height: 25px;
            width: 25px;
            display: inline-block;

            span {
              display: inline-block;
              height: 23px;
              width: 23px;
              background-color: #fff;
              border-radius: 50%;
            }
            i{
              position: absolute;
              top: -3px;
              left: -3px;
              font-size:27px;
              cursor: pointer;
            }
          }
        }
      }
      .about-us{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        li{
          margin-right: 20px;
          cursor: pointer;
          &:hover{
            color:#fff;
          }
        }
      }
      .last-line{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        cursor: pointer;
        span:hover{
          color:#fff;

        }
        span{
          margin-left: 10px;

        }
        img{
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }

</style>
