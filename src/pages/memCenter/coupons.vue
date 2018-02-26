<template>
  <div class="coupons">
    <header>
      <HeadTop go-back='true' :headBg="headBg">
        <div slot="select-title" class="select-title" >
          <span class="header-title">我的优惠券</span>
        </div>
      </HeadTop>
    </header>

    <ul class="tab-wrap">
      <li class="tab-item" :class="currentTab=='notuse' && 'active' " @click="clickTabItem('notuse')"><span>未使用</span>
      </li>
      <li class="tab-item" :class="currentTab=='outdate'&& 'active'" @click="clickTabItem('outdate')"><span>已过期</span>
      </li>
      <li class="tab-item" :class="currentTab=='haveuse'&& 'active'" @click="clickTabItem('haveuse')"><span>已使用</span>
      </li>
    </ul>
    <div class="coupons-wrap">
      <p class="no_data_text" v-if="couponsList.length===0">暂无数据</p>
      <ul class="coupon-ul">
        <li class="coupon-item" v-for="cou in couponsList">
          <div class="top-info">
            <div class="info fl change" :class="currentTab=='notuse' ? 'red' : '' ">
              <p class="unit">¥&nbsp;<span class="money red">{{cou.toprice}}</span></p>
              <span class="desc red">优惠劵</span>
            </div>
            <div class="shuoming fl" :class="currentTab!='notuse' ? 'nouseful' : '' ">
              <p class="name">{{cou.name}}</p>
              <p class="date">有效时间:{{cou.maketime}}</p>
            </div>
            <span class="left"></span>
            <span class="right"></span>
          </div>
          <div class="info fl">
            <p class="tiaojian">满{{cou.minprice}}元可用</p>
          </div>
        </li>
      </ul>
    </div>
    <!--我的优惠券-->
  </div>
</template>

<script>
  import {getCouponsList} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'

  export default {
    name: "coupons",
    data() {
      return {
        headBg: true,
        currentTab: 'outdate',// 当前选择的Tab,
        couponsList: [],// 优惠券列表
        tomake: '',//是否可用(必填00未过期可用，1已过期不可用)
        mapObj: {notuse: 0, outdate: 1, haveuse: 2}
      }
    },
    components: {
      HeadTop
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
