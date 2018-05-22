<template>
  <div class="myFinanceAccount">
    <div class="header-wrap">
      <div class="header">
        <h3 class="money">{{useInfo.accountBalance}}</h3>
        <div class="money-txt">理财账户（元）</div>
      </div>
    </div>
    <div class="finance-state ">
        <p class="no-list" v-if="list && list.length < 1">暂无内容</p>
      <ul class="state-list">
        <li class="finan-item clearfix" v-for="(item,index) in list" :key="index">
          <div class="name fl">
            <p class="info">
              {{item.licainame}}
            </p>
            <p class="bz">{{item.licaitime | fmtDate('MM-dd') }} {{item.licaitime | fmtDate('hh:mm')}}</p>
          </div>
          <div class="money">
            <p class="num">￥{{item.money}}</p>
            <p class="bz">
              <template v-if="item.status == 0">
                收益中
              </template>
              <template v-if="item.status == 1">
                结算中
              </template>
              <template v-else-if="item.status == 2">
                已结算
              </template>
            </p>
          </div>
          <div class="balance fr">
            <p>理财周期{{item.sylday}}天</p>
            <p>收益￥{{item.symoney}}</p>
          </div>

        </li>
      </ul>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import {licaiDetail, myLicai} from '../../http/getDate'
    export default {
        name: "myFinanceAccount",
         data(){
          return {
            useInfo: '',
            list: [],
            loading: true
          }
      },
      mounted() {
          this.initLicai();
        this.getMyList();
      },
      methods: {
          getMyList() {
            myLicai(1).then(res => {
              console.log(res);
              this.loading = false
              this.list = res.licailist;

            })
          },
          initLicai(){
            licaiDetail(1).then(res=> {
              this.useInfo = res.capital;
              console.log(`我的信息 + ${JSON.stringify(this.useInfo)}`)
            })
          }
      }
    }
</script>

<style scoped>

</style>
