<template>
  <div class="coupons">
    我的优惠券
  </div>
</template>

<script>
  import {getCouponsList} from '../../http/getDate'

  export default {
    name: "coupons",
    data() {
      return {
        currentTab: '',// 当前选择的Tab,
        couponsList: [],// 优惠券列表
        tomake: ''//是否可用(必填00未过期可用，1已过期不可用)
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
      switchTab() {

      }
    }
  }
</script>

<style>

</style>
