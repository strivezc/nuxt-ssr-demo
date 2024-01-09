<template>
  <div class="index">
    CourseSystem
  </div>
</template>

<script>
export default {
  name: 'CourseSystem',
  layout: 'websiteOuter',
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

<style scoped>

</style>
