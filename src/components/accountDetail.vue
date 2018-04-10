<template>
    <div class="accountDetail">
      <div class="header-wrap">
          <div class="pay-tit"> <span class="xiu">咻</span> <span class="tit">{{ detail.type | adderSubtractor('txt')}}</span></div>
          <h3 class="money">{{ detail.type | adderSubtractor('symbol')}}{{detail.profitLossMoney}}</h3>
          <!--<div class="money-txt">交易成功</div>-->
      </div>
      <div class="pay-info">
        <ul class="type lists">
          <li class="lists-item clearfix">类型 <span class="fr">
            {{ detail.type | adderSubtractor('txt')}}

          </span></li>
          <li class="lists-item clearfix">备注 <span class="fr">{{detail.title}}</span></li>
          <li class="lists-item clearfix">余额 <span class="fr">{{detail.lastBlance}} 元</span></li>
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
