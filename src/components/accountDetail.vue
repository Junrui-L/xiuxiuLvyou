<template>
    <div class="accountDetail">
      <div class="header-wrap">
          <div class="pay-tit"> <span class="xiu">咻</span> <span class="tit">余额支付</span></div>
          <h3 class="money">{{detail.profitLossMoney}}.00</h3>
          <div class="money-txt">交易成功</div>
      </div>
      <div class="pay-info">
        <ul class="type lists">
          <li class="lists-item clearfix">类型 <span class="fr">
              <template v-if="detail.type == 1">出行消费</template>
              <template v-if="detail.type == 2">接单带导收益</template>
              <template v-if="detail.type == 3">团游返折价/退单返款</template>
              <template v-if="detail.type == 4">推广返利</template>
              <template v-if="detail.type == 5">充值入款</template>
              <template v-if="detail.type == 6">提现账单</template>
              <template v-if="detail.type == 7">其他</template>

          </span></li>
          <li class="lists-item clearfix">备注 <span class="fr">{{detail.title}}</span></li>
          <li class="lists-item clearfix">余额 <span class="fr">{{detail.lastBlance}}.00 元</span></li>
        </ul>
        <ul class="info lists">
          <li class="lists-item clearfix">创建时间 <span class="fr">{{detail.created_at}}</span></li>
          <li class="lists-item clearfix">订单号 <span class="fr">{{detail.ordernumber}}</span></li>
          <li class="lists-item clearfix">流水号 <span class="fr">{{detail.accountId}}</span></li>
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
        name: "account-detail",
      data(){
        return {
          detail: {}
        }
      },
        props: {
          billDetail: {
            type: Object
          }
        },
      watch: {
        billDetail(val) {

            this.init();
        }
      },
      methods: {
          init() {
            console.log( this.billDetail)
            this.detail = this.billDetail;
          }
      }
    }
</script>

<style >

</style>
