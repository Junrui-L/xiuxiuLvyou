<template>
  <div class="memberCenter">
    <header class="header">
      <div class="hd">
        <div class="img-wrapper fl"><img :src="userInfo.headimgurl" alt=""></div>
        <router-link to="/memberInfo" class="username fl">{{userInfo.userName || '--'}}

          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <div class="message"></div>
      </div>
      <ul class="mem-wrap clearfix">
        <router-link tag="li" to="/scores" class="mem-item fl">
          <div>{{userInfo.tourismScore || 0}}</div>
          <p>积分</p>
        </router-link>
        <router-link tag="li" to="/coupons" class="mem-item fl">
          <div>{{userInfo.yhjcount || 0}}</div>
          <p>优惠券</p>
        </router-link>
        <router-link tag="li" to="/favorites" class="mem-item fl">
          <div>{{userInfo.collect || 0}}</div>
          <p>收藏</p>
        </router-link>
        <router-link tag="li" to="/myWallet" class="mem-item fl">
          <div>{{userInfo.accountBalance || 0}}</div>
          <p>钱包</p>
        </router-link>
      </ul>
    </header>
    <div class="order-container">
      <ul class="tab-wrap">
        <li class="ordertab" :class="currentTab=='all' && 'active' " @click="clickOrderStateTab('all')"><span>全部</span>
        </li>
        <li class="ordertab" :class="currentTab=='waitpay'&& 'active'" @click="clickOrderStateTab('waitpay')">
          <span>待付款</span></li>
        <li class="ordertab" :class="currentTab=='doing'&& 'active'" @click="clickOrderStateTab('doing')">
          <span>进行中</span></li>
        <li class="ordertab" :class="currentTab=='waitEvaluate'&& 'active'" @click="clickOrderStateTab('waitEvaluate')">
          <span> 待评价</span>
        </li>
        <li class="ordertab" :class="currentTab=='haveCancle'&& 'active'" @click="clickOrderStateTab('haveCancle')">
          <span>已取消</span>
        </li>
      </ul>
      <div class="order-list">
        <p class="no_data_text" v-if="orderList.length===0">暂无数据</p>
        <div class="order-list-item" v-for="v in orderList">
          <p class="fl h44">出行时间：{{v.godate}}</p>
          <p class="fr  h44 orderstate">{{v.status | orderStateText}}</p>
          <div class="scenicInfo fl">
            <img src="/static/img/taiwdy.0cc08bb.png"/>
            <div class="desc">
              <p class="title">{{v.username}}</p>
              <p class="payway">{{v.wfname}}</p>
              <p class="playway">{{v.orderMode}}</p>
            </div>
          </div>
          <div class="order-info fl">
            <p><span>下单时间</span><span class="fr">{{v.created_at}}</span></p>
            <p><span>人数</span><span class="fr">{{v.tripsnum}}人</span></p>
            <p><span>总价</span><span class="fr">{{v.orderSumPrice}}元</span></p>
          </div>
          <p class="fr">
            <button class="order-handle-btn" v-if="v.status===0">取消订单</button>
            <button class="order-handle-btn red" v-if="v.status===1">去付款</button>
            <button class="order-handle-btn red" v-if="v.status===3 || v.status===5">联系向导</button>
            <button class="order-handle-btn" v-if="v.status===6">去评价</button>
            <button class="order-handle-btn" v-if="v.status===9">重新下单</button>
          </p>
        </div>
      </div>

      <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
      <p class="load-more" v-show="nomore">没有更多了</p>
    </div>

  </div>
</template>

<script>
  import {userLogin, userPersonal, cancelOrder, getMyOrderList, userAccounts} from '../../http/getDate'

  export default {
    name: "member-center",
    data() {
      return {
        userInfo: {  // 用户信息对象
          headimgurl: '',
          userName: '',
          tourismScore: 0,
          yhjcount: 0,
          collect: 0,
          accountBalance: 0,
        },
        staticNum: {},// 统计数字,积分,优惠券
        currentTab: 'doing',// 当前选中的订单tab
        orderList: [1, 2, 4, 3, 4],// 订单列表
        tabMap: {'all': 0, 'waitpay': 1, 'doing': 2, 'waitEvaluate': 3, 'haveCancle': 4},
        page: 1,
        nomore: false
      }
    },
    mounted() {
      userLogin('15118252171', '123456').then(res => {
        console.log('---登录----')
        console.log(res)
        this.getUserInfo();
        this.getOrderList()
        this.queryWallet()
      })
    },
    methods: {
      // 获取订单列表
      getOrderList() {
        getMyOrderList({page: this.page, status: this.tabMap[this.currentTab]}).then(res => {
          if (res.list.length === 0) {
            if (this.page !== 1) {
              this.nomore = true
            }
          } else {
            this.orderList = res.list
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      },
      // 获取个人信息
      getUserInfo() {
        userPersonal().then(res => {
          this.userInfo.headimgurl = res.headimgurl
          this.userInfo.userName = res.userName
          this.userInfo.tourismScore = res.tourismScore
          this.userInfo.yhjcount = res.yhjcount
          this.userInfo.collect = res.collect
        })
      },
      // 点击订单状态Tab
      clickOrderStateTab(currentTab) {
        this.currentTab = currentTab
        this.page = 1
        this.nomore = false
        this.getOrderList()
      },
      // 取消订单
      caccleOrder(ordernumber) {
        cancelOrder().then({ordernumber, status: 2}).then(res => {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '取消成功'
          }).show()
        })
      },
      // 查询钱包
      queryWallet(){
        userAccounts().then(res => {
          this.userInfo.accountBalance = res.capital.accountBalance
        })
      },
      // 去付款
      toPay(orderid) {

      },
      // 加载更多
      loadMore() {
        this.page++
        getMyOrderList({page: this.page, status: this.tabMap[this.currentTab]}).then(res => {
          if (res.list.length === 0) {
            if (this.page !== 1) {
              this.nomore = true
            }
          } else {
            this.orderList.push(...res.list)
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      }
    },
  }
</script>
