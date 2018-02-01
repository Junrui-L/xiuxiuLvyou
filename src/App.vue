<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <!--此处是要做缓存用，数据加载过多的页面使用 keepAlive-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  /*@import './assets/scss/app.scss';*/

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
}
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
