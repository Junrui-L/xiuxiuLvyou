import LoadingComponent from  './Loading.vue'
const loading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
export default loading;

//全局注册loading组件
