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
        <div class="bill-item clearfix" v-for="(item, index) in billList" @click="showDet(index)">
          <div class="time fl">
            <p class="date">{{item.created_at | fmtDate('MM-dd')}}</p>
            <p class="bz">{{item.created_at | fmtDate('hh:mm')}}</p>
          </div>
          <div class="img-wrap fl">
            <!--<img src="../../assets/img/taiwdy.png" alt="">-->
            <img :src="item.typeicon" alt="" />
          </div>
          <div class="money fl">
            <p class="num">-{{item.profitLossMoney}}</p>
            <p class="bz">
              <template v-if="item.type == 1">出行消费</template>
              <template v-if="item.type == 2">接单带导收益</template>
              <template v-if="item.type == 3">团游返折价/退单返款</template>
              <template v-if="item.type == 4">推广返利</template>
              <template v-if="item.type == 5">充值入款</template>
              <template v-if="item.type == 6">提现账单</template>
              <template v-if="item.type == 7">其他</template>
            </p>
          </div>
          <span class="balance fr">余额：{{item.lastBlance}}</span>

        </div>

      </div>
      <transition name="slide-in">
      <div class="account-detail" v-show="showDetail">
        <div class='head_bak'>
          <section class="head_goback"  @click="showDetail = false">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
              <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
            </svg>
          </section>
          <section class="title_head ellipsis">
            <span class="title_text">账单详情</span>
          </section>
         </div>
          <AccountDetail :billDetail = "billChoose"></AccountDetail>
      </div>
      </transition>
    </div>
</template>

<script>
  import {userBill, userLogin} from '../../http/getDate'
  import AccountDetail from '../../components/accountDetail.vue'
    export default {
      name: "account-bill",
      data() {
        return {
          billList: [],
          showDetail: false,
          billChoose: {}
        }
      },
      components: {
        AccountDetail
      },
      mounted(){
          console.log('---登录----')
          this.getUserBill();

      },
      methods: {
        getUserBill() {
          let pageNo = 1;

          userBill(pageNo, 1).then(res => {
            console.log(res)
            this.billList = res.list;
          })
        },
        showDet(index) {
          this.billChoose = this.billList[index];
          this.showDetail = true;

        }
      }
    }

</script>

<style >

</style>
