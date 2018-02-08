<template>
  <div class="memberCenter">
    <header class="header">
      <div class="hd">
        <div class="img-wrapper fl"><img :src="userInfo.headimgurl" alt=""></div>
        <router-link to="/memberInfo" class="username fl">{{userInfo.userName || '无'}}
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
          <div>{{userInfo.userName || 0}}</div>
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

        <div class="order-list-item" v-for="v in orderList">
          <p class="fl h44">出行时间：{{v.godate}}</p>
          <p class="fr  h44 orderstate">{{v.status}}</p>
          <div class="scenicInfo fl">
            <img src="/static/img/taiwdy.0cc08bb.png"/>
            <div class="desc">
              <p class="title">黄美丽</p>
              <p class="payway">{{v.wfname}}</p>
              <p class="playway">自由游玩 （抢单定价模式）</p>
            </div>
          </div>
          <div class="order-info fl">
            <p><span>下单时间</span><span class="fr">2017-05-12 12:15</span></p>
            <p><span>人数</span><span class="fr">3人</span></p>
            <p><span>总价</span><span class="fr">300.00元</span></p>
          </div>
          <p class="fr">
            <button class="order-handle-btn">取消订单</button>
            <button class="order-handle-btn red">取消订单</button>
            <button class="order-handle-btn">取消订单</button>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import {userPersonal, cancelOrder, getMyOrderList} from '../../http/getDate'

  export default {
    name: "member-center",
    data() {
      return {
        userInfo: {},// 用户信息对象
        staticNum: {},// 统计数字,积分,优惠券
        currentTab: 'doing',// 当前选中的订单tab
        orderList: [1, 2, 4, 3, 4],// 订单列表
        tabMap: {'all': 0, 'waitpay': 1, 'doing': 2, 'waitEvaluate': 3, 'haveCancle': 4},
        page: 1
      }
    },
    mounted() {
      this.getUserInfo();
      this.getOrderList()
    },
    methods: {
      // 获取订单列表
      getOrderList() {
        getMyOrderList({page: this.page, status: this.tabMap[this.currentTab]}).then(res => {
          this.orderList = res.list
        })
      },
      // 获取个人信息
      getUserInfo() {
        userPersonal().then(res => {
          this.userInfo = res
        })
      },
      // 点击订单状态Tab
      clickOrderStateTab(currentTab) {
        this.currentTab = currentTab
        this.page = 1
        this.getOrderList()
      },
      // 取消订单
      caccleOrder(ordernumber) {
        cancelOrder().then({ordernumber, status: 2}).then(res => {

        })
      },
      // 去付款
      toPay() {

      }
    },
  }
</script>
