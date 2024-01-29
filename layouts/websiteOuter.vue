<template>
  <div class="app-wrapper">
    <WebsiteHeader></WebsiteHeader>
    <SideBar></SideBar>
    <nuxt/>
    <WebsiteFooter></WebsiteFooter>
  </div>
</template>

<script>
import WebsiteHeader from '@/components/WebsiteHeader'
import SideBar from '@/components/SideBar'
import WebsiteFooter from '@/components/WebsiteFooter'

export default {
  components: {
    WebsiteHeader,
    SideBar,
    WebsiteFooter,
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
