<template>
  <div class="_id">
    _id:{{id}}
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      id:''
    }
  },
  validate ({ params }) {
    if (params.id && params.id != 'undefined') {
      return true
    }
    return false
  },
  created() {
    this.id=this.$route.params.id
  },
  methods: {}
}
</script>

<style scoped>

</style>
