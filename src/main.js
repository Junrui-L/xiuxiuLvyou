// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import http from './http'               //请求数据
import './config/setView'               //不同dpr手机兼容
import './assets/scss/app.scss'         //引入全局的css文件包
import './assets/lib/swiper/css/swiper.css' //swiper样式
import VueLazyload from 'vue-lazyload';  //图片模板等懒加载
import VueAwesomeSwiper from 'vue-awesome-swiper'
import errImg from './assets/img/404.png' //404图片
import loadingImg from './assets/img/loading-spin.svg' //loading图片
//全局引用cube
// import Cube from './assets/lib/cube-ui'
import Cube from 'cube-ui'
require('./assets/lib/easemob-sdk/webim.config.js')
let WebIM = require('easemob-websdk')
Vue.prototype.$webim = WebIM

const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
})

const options = {
  apiUrl: WebIM.config.apiURL,
  user: '1',
  pwd: 'xiuxiutrip123456',
  appKey: WebIM.config.appkey,
  success:function (re) {
    console.log('链接服务器正常')
  },
  error:function (err) {
    alert(err)
  }
}
Vue.prototype.$imconn = conn
Vue.prototype.$imoption = options
Vue.use(Cube);
Vue.use(VueAwesomeSwiper)
import './config/filter' //过滤器
window.createAPI = Cube.createAPI;
import router from './router'
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
// if (process.env.NODE_ENV !== 'product'){
//   let VConsole =  require('vconsole')   //控制台
//   let vconsole = new VConsole()
// }
//console.log(http);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
