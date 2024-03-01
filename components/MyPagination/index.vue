<template>
  <div class="myPagination ">
    <div class="content-box">

      <!-- 上一页 -->
      <nuxt-link @click.native="afterEnter" v-if="currentPage!=1"
         :to="path +(currentPage-1) +(queryString?'?'+queryString:'')"
         class="btn"
         :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
        <i class="el-icon-arrow-left"></i>
      </nuxt-link>
      <div v-if="currentPage==1"
           class="btn disable"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
        <i class="el-icon-arrow-left"></i>
      </div>

      <!-- 中间的页码 -->
      <!-- 没有省略号的 -->
      <div v-if="type==1"
           class="true-page-info">
        <nuxt-link @click.native="afterEnter" v-for="index in lastPage"
           :key="index"
           :to="path+index +(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: index==currentPage?'white':noChooseFontColor, backgroundColor: index==currentPage?beChooseColor:noChooseBgColor,  }">{{
          index }}</nuxt-link>
      </div>

      <!-- 省略号在后面 -->
      <div v-if="type==2"
           class="true-page-info">
        <nuxt-link @click.native="afterEnter" v-for="index in gap+1"
           :key="index"
           :to="path + index +(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: index==currentPage?'white':noChooseFontColor, backgroundColor: index==currentPage?beChooseColor:noChooseBgColor,  }">{{
          index }}</nuxt-link>

        <!-- 下gap页省略符 -->
        <nuxt-link @click.native="afterEnter" @mouseover.native="hoverMoreBtn_next"
           @mouseout.native="leaveMoreBtn_next"
           :to="path +(currentPage+gap<=lastPage?currentPage+gap:lastPage) +(queryString?'?'+queryString:'')"
           class="btn"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
          <i class="el-icon-more"></i>
        </nuxt-link>

        <!-- 最后一页 -->
        <nuxt-link @click.native="afterEnter" :to="path +lastPage+(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">{{ lastPage }}</nuxt-link>

      </div>

      <!-- 都有省略号 -->
      <div v-if="type==3"
           class="true-page-info">

        <!-- 第一页 -->
        <nuxt-link @click.native="afterEnter" :to="path + 1 +(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">1</nuxt-link>

        <!-- 上gap页省略符 -->
        <nuxt-link @click.native="afterEnter" @mouseover.native="hoverMoreBtn_prev"
           @mouseout.native="leaveMoreBtn_prev"
           :to="currentPage-gap==1||currentPage-gap<1?(path + 1 +(queryString?'?'+queryString:'')):(path +(currentPage-gap) +(queryString?'?'+queryString:''))"
           class="btn"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
          <i class="el-icon-more"></i>
        </nuxt-link>

        <nuxt-link @click.native="afterEnter" v-for="index in centerPageArr"
           :key="index"
           :to="path +index+(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: index==currentPage?'white':noChooseFontColor, backgroundColor: index==currentPage?beChooseColor:noChooseBgColor,  }">{{
          index }}</nuxt-link>

        <!-- 下gap页省略符 -->
        <nuxt-link @click.native="afterEnter" @mouseover.native="hoverMoreBtn_next"
           @mouseout.native="leaveMoreBtn_next"
           :to="path +(currentPage+gap<=lastPage?currentPage+gap:lastPage) +(queryString?'?'+queryString:'')"
           class="btn"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
          <i class="el-icon-more"></i>
        </nuxt-link>

        <!-- 最后一页 -->
        <nuxt-link @click.native="afterEnter" :to="path +lastPage +(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">{{ lastPage }}</nuxt-link>

      </div>

      <!-- 省略号在前面 -->
      <div v-if="type==4"
           class="true-page-info">
        <nuxt-link @click.native="afterEnter" :to="path + 1 + (queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">1</nuxt-link>

        <!-- 上gap页省略符 -->
        <nuxt-link @click.native="afterEnter" @mouseover.native="hoverMoreBtn_prev"
           @mouseout.native="leaveMoreBtn_prev"
           :to="currentPage-gap==1||currentPage-gap<1?(path + 1 +(queryString?'?'+queryString:'')):(path +(currentPage-gap) +(queryString?'?'+queryString:''))"
           class="btn"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
          <i class="el-icon-more"></i>
        </nuxt-link>

        <nuxt-link @click.native="afterEnter" v-for="index in backPageArr"
           :key="index"
           :to="path +index+(queryString?'?'+queryString:'')"
           @mouseover.native="hoverPage"
           @mouseout.native="leavePage"
           :style="{ color: index==currentPage?'white':noChooseFontColor, backgroundColor: index==currentPage?beChooseColor:noChooseBgColor,  }">{{
          index }}</nuxt-link>

      </div>

      <!-- 下一页 -->
      <nuxt-link @click.native="afterEnter" v-if="currentPage!=lastPage"
         :to="path +(currentPage+1) +(queryString?'?'+queryString:'')"
         class="btn"
         :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
        <i class="el-icon-arrow-right"></i>
      </nuxt-link>
      <div v-if="currentPage==lastPage"
           class="btn disable"
           :style="{ color: noChooseFontColor, backgroundColor: noChooseBgColor }">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="pagination__jump">前往<el-input class="input" @change.native="handlePage" v-model="page" type="number"/>页</div>
    </div>

  </div>

  <!--
    上一页下一页
    el-icon-arrow-left
    el-icon-arrow-right

    跨度上一页下一页
    el-icon-d-arrow-left
    el-icon-d-arrow-right

    省略
    el-icon-more
  -->
</template>
<script>
export default {
// 这里我的每个属性都是通过props来接收是因为nuxt框架中只有这样，这个组件才能在父亲的asyncData的时候生效，
// 如果我使用组件的data来进行一些属性的计算、或使用methods中的方法进行取值，
// 则页面的首次渲染的源代码中不会有我计算好的a标签的href属性。
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    gap: {
      // 分页器密度，
      // 密度=3  < 1 ... 6 7 8 ... 20 > 当前选中7
      // 密度=5  < 1 ... 5 6 7 8 9 ... 20 > 当前选中7
      // 以此类推
      type: Number,
      default: 5
    },
    nowPath: {
      // 当前页面的路径,包括query參數
      type: String,
      default: ''
    },
    path: {
      // 当前页面的路径,不包括query參數
      type: String,
      default: ''
    },
    queryString: {
      // 当前页面的query參數
      type: String,
      default: ''
    },
    lastPage: {
      // 最后一页
      type: Number,
      default: 1
    },
    type: {
      // 分页器的排列方式
      type: Number,
      default: 1
    },
    centerPageArr: {
      // 前后都有省略号时，中间的分页数组
      type: Array,
      default: ()=>{
        return []
      }
    },
    backPageArr: {
      // 只有前面有省略号时，靠后的分页数组
      type: Array,
      default: ()=>{
        return []
      }
    },

    // 样式相关的
    beChooseColor: {
      // 被选中的页码的背景颜色
      type: String,
      default: '#409eff'
    },
    noChooseBgColor: {
      // 未被选中的页码的背景颜色
      type: String,
      default: '#f4f4f5'
    },
    noChooseFontColor: {
      // 未被选中的页码的字体颜色
      type: String,
      default: '#606266'
    },
    fromPCHome: {
      // 用作特殊情况的判断，
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page:'',
      //   gap: 3, //尺寸一般是单数3、5、7....
      //   lastPage: 1, //最后一页
      //   type: 0, // 页码的排列方式不同
      //   type=1, < 1 2 3 4 5 >
      //   type=2, < 1 2 3 4 ... 12 >
      //   type=3, < 1 ... 5 6 7 ... 12 >
      //   type=4, < 1 ... 9 10 11 12 >
      //   centerPageArr: [], //中间的页码数组，比如< 1 ... 5 6 7 ... 12 >中 5 6 7
      //   backPageArr: [], //靠后的页码数组，比如 < 1 ... 7 8 9 10 11 12 >   7 到 12就是靠后的页码数组
    }
  },
  mounted() {
    // 这里我本来是想将一些参数放到组件中再进行计算的，但是我发现这样href属性就无效了，不能有效的SEO优化，所以就改成了都在父页面中计算后传参过来
    // this.getGap();
    // this.getLastPage();
    // this.getType();
    // this.getPageLink_(4);
  },
  computed: {},
  methods: {
    afterEnter(){
      setTimeout(()=>{
        this.$emit('afterEnter')
      })
    },
    handlePage(){
      this.$router.push({ path: `${this.path}${this.page}` }, () => {
        this.$emit('afterEnter')
      })
    },
    // 组件的方法都是控制hover的时候分页器的样式变化
    // 鼠标悬浮在页码上
    hoverPage(event) {
      if (event.target.innerText != this.currentPage) {
        event.target.style.color = this.beChooseColor
      }
    },
    leavePage(event) {
      if (event.target.innerText != this.currentPage) {
        event.target.style.color = this.noChooseFontColor
      }
    },

    // 鼠标落在更多上__next
    hoverMoreBtn_next(event) {
      let icon = event.currentTarget.querySelector('i')
      icon.classList.remove('el-icon-more')
      icon.classList.add('el-icon-d-arrow-right')
      event.target.style.color = this.beChooseColor
    },
    leaveMoreBtn_next(event) {
      let icon = event.currentTarget.querySelector('i')
      icon.classList.add('el-icon-more')
      icon.classList.remove('el-icon-d-arrow-right')
      event.target.style.color = this.noChooseFontColor
    },

    // 鼠标落在更多上__prev
    hoverMoreBtn_prev(event) {
      let icon = event.currentTarget.querySelector('i')
      icon.classList.remove('el-icon-more')
      icon.classList.add('el-icon-d-arrow-left')
      event.target.style.color = this.beChooseColor
    },
    leaveMoreBtn_prev(event) {
      let icon = event.currentTarget.querySelector('i')
      icon.classList.add('el-icon-more')
      icon.classList.remove('el-icon-d-arrow-left')
      event.target.style.color = this.noChooseFontColor
    }

  }
}
</script>

<style scoped lang="scss">
  .myPagination {
    color: #409eff;
    margin: 30px 16px;
    display: flex;
    justify-content: flex-end;
    a,
    .btn {
      display: block;
      color: #333;
      margin: 0 5px;
      border-radius: 2px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      font-weight: 600;

      i {
        font-size: 10px;
        font-weight: 600;
      }
    }

    .content-box {
      display: flex;
    }
    .pagination__jump{
      display: flex;
      align-items: center;
      color: #606266;
      font-size: 13px;
      line-height: 28px;
      font-weight: 400;
      margin-left: 24px;
      .input{
        width: 50px;
        border-radius: 3px;
        box-sizing: border-box;
        height: 28px;
        line-height: 18px;
        margin: 0 2px;
        padding: 0 2px;
        text-align: center;
        font-size: 14px;
        ::v-deep .el-input__inner{
          padding: 0 3px;
          height: 28px;
          text-align: center;
        }
      }
    }

    .true-page-info {
      display: flex;
    }

    .disable {
      cursor: not-allowed;

      i {
        color: #bbb;
      }
    }
  }
</style>
