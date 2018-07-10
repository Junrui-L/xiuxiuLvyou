import Vue from 'vue'
import Router from 'vue-router'

//分页面异步加载文件
import Home from '@/pages/Home.vue'
// const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'home')
import Login from '@/pages/memCenter/Login.vue'
// const Login = r => require.ensure([], () => r(require('@/pages/memCenter/Login')), 'login')
//景区景点
const ScenicRegion = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicRegion')), 'scenicRegion')
const ScenicDetail = r => require.ensure([], () => r(require('@/pages/scenicRegion/ScenicDetail')), 'scenicDetail')
const Guide = r => require.ensure([], () => r(require('@/pages/guide/Guide')), 'guide')
const CityGuide = r => require.ensure([], () => r(require('@/pages/guide/cityGuide')), 'cityGuide')
const NearGuide = r => require.ensure([], () => r(require('@/pages/guide/nearGuide')), 'nearGuide')
const GuideDetail = r => require.ensure([], () => r(require('@/pages/guide/GuideDetail')), 'guideDetail')
const Search = r => require.ensure([], () => r(require('@/pages/search/Search')), 'search')
const SearchList = r => require.ensure([], () => r(require('@/pages/search/SearchList')), 'searchList')
const SearchContentList = r => require.ensure([], () => r(require('@/pages/search/SearchContentList')), 'SearchContentList')
//订单
const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/OrderDetail')), 'orderDetail')
const Order = r => require.ensure([], () => r(require('@/pages/order/Order')), 'order')
const PrepayOrder = r => require.ensure([], () => r(require('@/pages/order/PrepayOrder')), 'prepayOrder')
//一键向导
const OneStepGuide = r => require.ensure([], () => r(require('@/pages/oneStepGuide/OneStepGuide')), 'oneStepGuide')
const WaitResponse = r => require.ensure([], () => r(require('@/pages/oneStepGuide/WaitResponse')), 'waitResponse')
const GetGuide = r => require.ensure([], () => r(require('@/pages/oneStepGuide/getGuide')), 'getGuide')

//个人中心页面
const MemberCenter = r => require.ensure([], () => r(require('@/pages/memCenter/MemberCenter')), 'memberCenter')
const SetContact = r => require.ensure([], () => r(require('@/pages/setContact/SetContact')), 'setContact')
const AccountBill = r => require.ensure([], () => r(require('@/pages/memCenter/accountBill')), 'accountBill')
const AccountDetail = r => require.ensure([], () => r(require('@/pages/memCenter/accountDetail')), 'accountDetail')
const WithdrawDeposit = r => require.ensure([], () => r(require('@/pages/memCenter/withdrawDeposit')), 'withdrawDeposit')
const Coupons = r => require.ensure([], () => r(require('@/pages/memCenter/coupons')), 'coupons')
const Favorites = r => require.ensure([], () => r(require('@/pages/memCenter/favorites')), 'favorites')
const MemberInfo = r => require.ensure([], () => r(require('@/pages/memCenter/memberInfo')), 'memberInfo')
const Identification = r => require.ensure([], () => r(require('@/pages/memCenter/identification')), 'identification')
const MyQrcode = r => require.ensure([], () => r(require('@/pages/memCenter/myQrcode')), 'myQrcode')
const MyWallet = r => require.ensure([], () => r(require('@/pages/memCenter/myWallet')), 'myWallet')
const ScoreRule = r => require.ensure([], () => r(require('@/pages/memCenter/scoreRule')), 'scoreRule')
const Scores = r => require.ensure([], () => r(require('@/pages/memCenter/scores')), 'scores')
const ExpandedList = r => require.ensure([], () => r(require('@/pages/memCenter/expandedList')), 'expandedList')
const MyShare = r => require.ensure([], () => r(require('@/pages/memCenter/myShare')), 'myShare')
//评论
const Comment = r => require.ensure([], () => r(require('@/pages/memCenter/Comment')), 'comment')
const AssessList = r => require.ensure([], () => r(require('@/pages/memCenter/assessList')), 'assessList')
//设置密码
const SafeCenter = r => require.ensure([], () => r(require('@/pages/memCenter/safeCenter/safeCenter')), 'safeCenter')
const LoginCode = r => require.ensure([], () => r(require('@/pages/memCenter/safeCenter/loginCode')), 'loginCode')
const TradeCode = r => require.ensure([], () => r(require('@/pages/memCenter/safeCenter/tradeCode')), 'tradeCode')
//设置银行卡
const BankCardList = r => require.ensure([], () => r(require('@/pages/memCenter/bankCard/bankCardList')), 'bankCardList')
const AddBankCard = r => require.ensure([], () => r(require('@/pages/memCenter/bankCard/addBankCard')), 'addBankCard')

//聊天
const ChatList = r => require.ensure([], () => r(require('@/pages/webChat/ChatList')), 'chatList')
const Chat = r => require.ensure([], () => r(require('@/pages/webChat/Chat')), 'chat')

//金融
const FinanceHome = r => require.ensure([], () => r(require('@/pages/finance/FinanceHome')), 'financeHome')
const MyFinanceAccount = r => require.ensure([], () => r(require('@/pages/finance/myFinanceAccount')), 'myFinanceAccount')
const ZhouFinance = r => require.ensure([], () => r(require('@/pages/finance/zhouFinance')), 'zhouFinance')
const Recharge = r => require.ensure([], () => r(require('@/pages/finance/recharge')), 'recharge')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      // meta: { keepAlive: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // meta: { keepAlive: true }
    },
    {
      //搜索
      path: '/search',
      name: 'search',
      component: Search,
      children: [{
        path: ':id',
        component: SearchContentList,
        // meta: {keepAlive: true}
      }]
    },
    {
      //景区列表
      path: '/searchList',
      name: 'searchList',
      component: SearchList,
      meta: {keepAlive: true}
    },
    {
      //景区列表
      path: '/scenicRegion',
      name: 'scenicRegion',
      component: ScenicRegion,
      meta: {keepAlive: true}
    },
    {
      //景区向导玩法
      path: '/scenicDetail',
      name: 'scenicDetail',
      component: ScenicDetail
    },
    {
      //向导区列表
      path: '/guide',
      name: 'guide',
      component: Guide
    },
    {
      //区域向导列表
      path: '/cityGuide',
      name: 'cityGuide',
      component: CityGuide,
      meta: {keepAlive: true}
    },
    {
      //附近向导列表
      path: '/nearGuide',
      name: 'nearGuide',
      component: NearGuide
    },
    {
      //向导区列表
      path: '/guideDetail',
      name: 'guideDetail',
      component: GuideDetail
    },
    {
      //一键选导
      path: '/oneStepGuide',
      name: 'oneStepGuide',
      component: OneStepGuide
    }, {
      //等待回应
      path: '/waitResponse',
      name: 'waitResponse',
      component: WaitResponse
    },
    {
      path: '/getGuide',
      name: 'getGuide',
      component: GetGuide
    },
    {
      //订单详情
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
      // meta: {keepAlive: true}
    },
    {
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
    // //提现
    // {
    //   path: '/accountDetail',
    //   name: 'accountDetail',
    //   component: AccountDetail
    // },
    {
      path: '/withdrawDeposit',
      name: 'withdrawDeposit',
      component: WithdrawDeposit
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
      //个人认证
      path: '/identification',
      name: 'identification',
      component: Identification
    },
    {
      path: '/myQrcode',
      name: 'myQrcode',
      component: MyQrcode
    },
    {
      //我的分享图片
      path: '/myShare',
      name: 'myShare',
      component: MyShare
    },
    {
      path: '/expandedList',
      name: "expandedList",
      component: ExpandedList
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
    },
    {
      //订单评论
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      //订单评论
      path: '/assessList',
      name: 'assessList',
      component: AssessList
    },
    {
      //安全中心
      path: '/safeCenter',
      name: 'safeCenter',
      component: SafeCenter
    },
    {
      //设置更改密码
      path: '/loginCode',
      name: 'loginCode',
      component: LoginCode
    },
    {
      //设置交易密码
      path: '/tradeCode',
      name: 'tradeCode',
      component: TradeCode
    },
    {
      //银行卡列表
      path: '/bankCardList',
      name: 'bankCardList',
      component: BankCardList
    },
    {
      //添加新银行卡
      path: '/addBankCard',
      name: 'addBankCard',
      component: AddBankCard
    },
    {
      //聊天列表
      path: '/chatList',
      name: 'chatList',
      component: ChatList,
      // children: [{
      //   path: ':id',
      //   component: Chat
      // }]
    },
    {
      //聊天窗口
      path: '/Chat',
      name: 'chat',
      component: Chat
    },
    {
      //金融首页
      path: '/financeHome',
      name: 'financeHome',
      component: FinanceHome
    },
    {
      //
      path: '/myFinanceAccount',
      name: 'myFinanceAccount',
      component: MyFinanceAccount
    },
    {
      //金融详情
      path: '/zhouFinance',
      name: 'zhouFinance',
      component: ZhouFinance
    },
    {
      //金融详情
      path: '/recharge',
      name: 'recharge',
      component: Recharge
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
      return {x: 0, y: to.meta.savedPosition || 0}
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
