<template>
  <div class="memberCenter">
    <header class="header">
      <div class="hd">
        <div class="img-wrapper fl"><img src="../../assets/img/taiwdy.png" alt=""></div>
        <router-link to="/memberInfo" class="username fl">王大力
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <div class="message"></div>
      </div>
      <ul class="mem-wrap clearfix">
        <router-link tag="li" to="/scores" class="mem-item fl">
          <div>11000</div>
          <p>积分</p>
        </router-link>
        <router-link tag="li" to="/coupons" class="mem-item fl">
          <div>0</div>
          <p>优惠券</p>
        </router-link>
        <router-link tag="li" to="/favorites" class="mem-item fl">
          <div>6</div>
          <p>收藏</p>
        </router-link>
        <router-link tag="li" to="/myWallet" class="mem-item fl">
          <div>100.00</div>
          <p>钱包</p>
        </router-link>
      </ul>
    </header>
    <div class="order-container">
      <ul class="tab-wrap">
        <li>全部</li>
        <li>待付款</li>
        <li>进行中</li>
        <li>待评价</li>
        <li>已取消</li>
      </ul>
      <div class="all-order">
        全部订单
      </div>
    </div>

  </div>
</template>

<script>
  import {userInfo, cancelOrder} from '../../http/getDate'

  export default {
    name: "member-center",
    data() {
      return {
        userInfo: {},// 用户信息对象
        staticNum: {},// 统计数字,积分,优惠券
        currentTab: '',// 当前选中的订单tab
        orderList: [],// 订单列表
      }
    },
    mounted() {

    },
    methods: {
      // 获取订单列表
      getOrderList() {

      },
      // 获取个人信息
      getUserInfo() {
        userInfo().then(res => {
          this.userInfo = res.data
        })
      },
      // 点击订单状态Tab
      clickOrderStateTab() {

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

<style>

</style>
