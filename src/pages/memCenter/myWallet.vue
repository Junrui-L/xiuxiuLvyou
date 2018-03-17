<template>
    <div class="myWallet">
      <div class="header-wrap">
        <div class="header">
          <h3 class="money">{{count.accountBalance}}</h3>
          <div class="money-txt">余额账户（元）</div>
        </div>
      </div>
      <div class="container">
        <ul class="wallet">
          <router-link tag="li" to="/accountBill" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>总消费</h5>
              <p>￥{{count.sumConsumption}}</p>
            </div>
             <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <router-link tag="li" to="/accountBill" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>总收益</h5>
              <p>￥{{count.sumprofit}}</p>
            </div>
            <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <router-link tag="li" to="/accountBill" class="wallet-item clearfix">
            <div class="item-left fl">
              <h5>历史提现</h5>
              <p>￥{{count.sumoutblance}}</p>
            </div>
            <svg class="fr">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
        </ul>
      </div>
      <div class="button-wrap">
        <button class="to-get" @click="withDraw">去提现</button>
      </div>
    </div>

</template>

<script>
    import {userAccounts, userLogin} from '../../http/getDate'
    export default {
        name: "my-wallet",
        data() {
          return {
            count: {
              accountBalance: 0,
              sumprofit: 0,
              sumoutblance: 0
            }
          }
        },
        mounted(){
            console.log('---登录----')
            this.getAccount();
        },
        methods: {
          getAccount() {
            userAccounts().then(res => {
              this.count = res.capital;
            })
          },
          withDraw(){
            console.log('去取钱')
            this.$router.push({path: '/withdrawDeposit', query: {id: ''}})
          }
        }

    }

</script>

<style >

</style>
