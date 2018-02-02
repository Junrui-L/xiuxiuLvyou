// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import http from './http'               //请求数据
import './config/setView'               //不同dpr手机兼容
import './assets/scss/app.scss'         //引入全局的css文件包
import VueLazyload from 'vue-lazyload'  //图片模板等懒加载
import errImg from './assets/img/404.png' //404图片
import loadingImg from './assets/img/loading-spin.svg' //loading图片
//全局引用cube
import Cube from 'cube-ui'

Vue.use(Cube);

import './config/filter' //过滤器

window.createAPI = Cube.createAPI;
//vue-lasyload or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errImg,
  loading: loadingImg,
  attempt: 1,
  // set observer to true
  observer: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})

Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'product'){
  let VConsole =  require('vconsole')   //控制台
  let vconsole = new VConsole()
}
//console.log(http);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})