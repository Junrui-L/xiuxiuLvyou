import Vue from 'vue'
import Router from 'vue-router'

//分页面异步加载文件
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'home')
//景区景点
const ScenicRegion = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicRegion')), 'scenicRegion')
const ScenicDetail = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicDetail')), 'scenicDetail')
const Guide = r => require.ensure([], () => r(require('@/pages/guide/Guide')), 'guide')
const GuideDetail = r => require.ensure([], () => r(require('@/pages/guide/GuideDetail')), 'guideDetail')
const Search = r => require.ensure([], () => r(require('@/pages/search/Search')), 'search')
const SearchList = r => require.ensure([], () => r(require('@/pages/search/SearchList')), 'searchList')
//订单
const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/OrderDetail')), 'orderDetail')
const Order = r => require.ensure([], () => r(require('@/pages/order/Order')), 'order')
const PrepayOrder = r => require.ensure([], () => r(require('@/pages/order/PrepayOrder')), 'prepayOrder')
const OneStepGuide = r => require.ensure([], () => r(require('@/pages/oneStepGuide/OneStepGuide')), 'oneStepGuide')
const WaitResponse = r => require.ensure([], () => r(require('@/pages/oneStepGuide/WaitResponse')), 'waitResponse')
const SetContact = r => require.ensure([], () => r(require('@/pages/setContact/SetContact')), 'setContact')
//个人中心页面
const MemberCenter = r => require.ensure([], () => r(require('@/pages/memCenter/MemberCenter')), 'memberCenter')
const AccountBill = r => require.ensure([], () => r(require('@/pages/memCenter/accountBill')), 'accountBill')
const AccountDetail = r => require.ensure([], () => r(require('@/pages/memCenter/accountDetail')), 'accountDetail')
const Coupons = r => require.ensure([], () => r(require('@/pages/memCenter/coupons')), 'coupons')
const Favorites = r => require.ensure([], () => r(require('@/pages/memCenter/favorites')), 'favorites')
const MemberInfo = r => require.ensure([], () => r(require('@/pages/memCenter/memberInfo')), 'memberInfo')
const MyQrcode = r => require.ensure([], () => r(require('@/pages/memCenter/myQrcode')), 'myQrcode')
const MyWallet = r => require.ensure([], () => r(require('@/pages/memCenter/myWallet')), 'myWallet')
const ScoreRule = r => require.ensure([], () => r(require('@/pages/memCenter/scoreRule')), 'scoreRule')
const Scores = r => require.ensure([], () => r(require('@/pages/memCenter/scores')), 'scores')

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      // meta: { keepAlive: true }
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
    },
    //个人中心
    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: MemberCenter
    },
    {
      path: '/accountBill',
      name: 'accountBill',
      component: AccountBill
    },
    {
      path: '/accountDetail',
      name: 'accountDetail',
      component: AccountDetail
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: Coupons
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/memberInfo',
      name: 'memberInfo',
      component: MemberInfo
    },
    {
      path: '/myQrcode',
      name: 'myQrcode',
      component: MyQrcode
    },
    {
      path: '/myWallet',
      name: 'myWallet',
      component: MyWallet
    },
    {
      path: '/scoreRule',
      name: 'scoreRule',
      component: ScoreRule
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores
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
