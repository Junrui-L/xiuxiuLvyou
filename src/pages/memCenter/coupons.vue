<template>
  <div class="coupons">
    <ul class="tab-wrap">
      <li class="tab-item" :class="currentTab=='notuse' && 'active' " @click="clickTabItem('notuse')"><span>未使用</span>
      </li>
      <li class="tab-item" :class="currentTab=='outdate'&& 'active'" @click="clickTabItem('outdate')"><span>已过期</span>
      </li>
      <li class="tab-item" :class="currentTab=='haveuse'&& 'active'" @click="clickTabItem('haveuse')"><span>已使用</span>
      </li>
    </ul>
    <div class="coupons-wrap">
      <ul class="coupon-ul">
        <li class="coupon-item">
          <div class="info">
            <p>¥<span>8</span></p>
            <spn>优惠劵</spn>
            <p>景区[想]抵扣劵</p>
            <p>有效时间:2017-02-12</p>
          </div>
        </li>
      </ul>
    </div>

    <!--我的优惠券-->
  </div>
</template>

<script>
  import {getCouponsList} from '../../http/getDate'

  export default {
    name: "coupons",
    data() {
      return {
        currentTab: 'outdate',// 当前选择的Tab,
        couponsList: [],// 优惠券列表
        tomake: '',//是否可用(必填00未过期可用，1已过期不可用)
        mapObj: {notuse: 0, outdate: 1, haveuse: ''}
      }
    },
    methods: {
      // 获取优惠券列表
      getCouponsList() {
        getCouponsList(this.tomake).then(res => {
          this.couponsList = res.data
        })
      },
      // 切换Tab
      clickTabItem(tabName) {
        this.currentTab = tabName
        this.tomake = this.mapObj[tabName]
        this.getCouponsList()
      }
    }
  }
</script>

<style>

</style>
