<template>
    <div class="accountDetail">
      <div class="header-wrap">
          <div class="pay-tit"> <span class="xiu">咻</span> <span class="tit">余额支付</span></div>
          <h3 class="money">100.00</h3>
          <div class="money-txt">交易成功</div>
      </div>
      <div class="pay-info">
        <ul class="type lists">
          <li class="lists-item clearfix">类型 <span class="fr">余额支付</span></li>
          <li class="lists-item clearfix">备注 <span class="fr">支付向导出行费用</span></li>
          <li class="lists-item clearfix">余额 <span class="fr">1000.00 元</span></li>
        </ul>
        <ul class="info lists">
          <li class="lists-item clearfix">创建时间 <span class="fr">2018-01-22 12:03</span></li>
          <li class="lists-item clearfix">订单号 <span class="fr">201002032131234</span></li>
          <li class="lists-item clearfix">流水号 <span class="fr">1000.00 元</span></li>
        </ul>
      </div>

      <div class="last-tip">对此单有疑问
        <svg class="fr">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </div>

      <div class="last-tip">投诉
        <svg class="fr">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </div>
    </div>

</template>

<script>
    export default {
        name: "account-detail"
    }
</script>

<style >

</style>
