<template>
    <div class="accountBill">
      <h3 class="title">
        <span>本月</span>
        <a href="" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </a>
      </h3>
      <div class="bill-list per-month">
        <router-link to = '/accountDetail' class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">呼叫导游</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </router-link>
        <router-link to = '/accountDetail' class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">招行银行卡（1111）</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </router-link>
      </div>
      <h3 class="title">
        <span>1月</span>
        <a href="" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </a>
      </h3>
      <ul class="bill-list per-month">
        <li class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">呼叫导游</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </li>
        <li class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">招行银行卡（1111）</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </li>
      </ul>
      <h3 class="title">
        <span>12月</span>
        <a href="" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </a>
      </h3>
      <ul class="bill-list per-month">
        <li class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">呼叫导游</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </li>
        <li class="bill-item clearfix">
          <div class="time fl">
            <p class="date">10-11</p>
            <p class="bz">09:07</p>
          </div>
          <div class="img-wrap fl">
            <img src="../../assets/img/taiwdy.png" alt="">
          </div>
          <div class="money fl">
            <p class="num">-100.00</p>
            <p class="bz">招行银行卡（1111）</p>
          </div>
          <span class="balance fr">余额：101.00</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "account-bill"
    }
</script>

<style >

</style>
