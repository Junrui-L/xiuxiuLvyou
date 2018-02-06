<template>
    <div class="myWallet">
      <div class="header-wrap">
        <div class="header">
          <h3 class="money">100.00</h3>
          <div class="money-txt">余额账户（元）</div>
        </div>
      </div>
      <div class="container">
        <ul class="wallet">
          <router-link tag="li" to="/accountBill" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>总消费</h5>
              <p>￥100.00</p>
            </div>
             <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <router-link tag="li" to="/earn" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>总收益</h5>
              <p>￥100.00</p>
            </div>
            <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <router-link tag="li" to="/deposit" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>历史提现</h5>
              <p>￥100.00</p>
            </div>
            <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
        </ul>
      </div>
      <div class="button-wrap">
        <button class="to-get">去提现</button>
      </div>
    </div>

</template>

<script>
    export default {
        name: "my-wallet"
    }
</script>

<style >

</style>
