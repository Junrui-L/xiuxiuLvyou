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
    export default {
        name: "member-center"
    }
</script>

<style >

</style>
