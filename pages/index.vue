<template>
  <div>
    <el-button type="primary" @click="test">测试1</el-button>
    <el-button type="primary" @click="test2">测试2</el-button>
  </div>

</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'websiteOuter',
  async asyncData({app, params,store }) {
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
    }
  },
  created() {
    // 如果是客户端，显示错误信息
    if (process.client) {
      if (this.asyncDataErr.resultCode===3) {
        this.$message.error(this.asyncDataErr.resultMessage)
      }
    }
  },
  methods: {
    async test() {
      try {
        const { resultData }=await this.$api.getRelatedLink()
        console.log(resultData,'resultData')
      } catch (e) {
        console.log(e, 'error')
      }
    },
    test2(){
      this.$store.dispatch('content/queryExportTaskList')
    }
  }
}
</script>
