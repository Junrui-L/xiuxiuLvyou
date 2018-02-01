import Vue from 'vue'
import Router from 'vue-router'

//分页面异步加载文件
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'home')
const ScenicRegion = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicRegion')), 'scenicRegion')
const ScenicDetail = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicDetail')), 'scenicDetail')
const Guide = r => require.ensure([], () => r(require('@/pages/guide/Guide')), 'guide')
const GuideDetail = r => require.ensure([], () => r(require('@/pages/guide/GuideDetail')), 'guideDetail')
const Search = r => require.ensure([], () => r(require('@/pages/search/Search')), 'search')
const SearchList = r => require.ensure([], () => r(require('@/pages/search/SearchList')), 'searchList')
const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/OrderDetail')), 'orderDetail')
const Order = r => require.ensure([], () => r(require('@/pages/order/Order')), 'order')
const PrepayOrder = r => require.ensure([], () => r(require('@/pages/order/PrepayOrder')), 'prepayOrder')
const OneStepGuide = r => require.ensure([], () => r(require('@/pages/oneStepGuide/OneStepGuide')), 'oneStepGuide')
const WaitResponse = r => require.ensure([], () => r(require('@/pages/oneStepGuide/WaitResponse')), 'waitResponse')
const SetContact = r => require.ensure([], () => r(require('@/pages/setContact/SetContact')), 'setContact')


Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: { keepAlive: true }
    },
    {
      //搜索
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      //景区列表
      path: '/searchList',
      name: 'searchList',
      component: SearchList,
      meta: { keepAlive: true }
    },
    {
      //景区列表
      path: '/scenicRegion',
      name: 'scenicRegion',
      component: ScenicRegion
    },
    {
      path: '/scenicDetail',
      name: 'scenicDetail',
      component:ScenicDetail
    },
    {
      //向导区列表
      path: '/guide',
      name: 'guide',
      component: Guide
    },{
      //向导区列表
      path: '/guideDetail/:id',
      name: 'guideDetail',
      component: GuideDetail
    },
    {
      //一键选导
      path: '/oneStepGuide',
      name: 'oneStepGuide',
      component: OneStepGuide
    },{
      //等待回应
      path: '/waitResponse',
      name: 'waitResponse',
      component: WaitResponse
    },
    {
      //订单详情
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    }, {
      //订单预览
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      //下单预支付
      path: '/prepayOrder',
      name: 'prepayOrder',
      component: PrepayOrder
    },
    {
      path: '/setContact',
      name: 'setContact',
      component: SetContact
    }
  ],
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition ||0}
    }
  }

})


//router.beforeEach((to, from, next) => {
//  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//      next();
//    }
//    else {
//      next({
//        path: '/login',
//        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//      })
//    }
//  }
//  else {
//    next();
//  }
//})

export default router;
