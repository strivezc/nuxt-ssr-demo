<template>
  <div class="app-wrapper">
    <WebsiteHeader></WebsiteHeader>
    <nuxt/>
    <WebsiteFooter></WebsiteFooter>
  </div>
</template>

<script>
import WebsiteFooter from '~/components/WebsiteFooter'
import WebsiteHeader from '~/components/WebsiteHeader'

export default {
  components: {
    WebsiteFooter,
    WebsiteHeader
  },
}
</script>

<style lang="scss">
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
