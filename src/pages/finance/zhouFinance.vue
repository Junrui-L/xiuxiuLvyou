<template>
  <div class="myFinance">
    <HeadTop go-back='true' :headBg="headBg">
      <div slot="select-title" class="select-title" >
        <span class="title_head black" >周周理财</span>
      </div>
      <div slot="message" class="selects fr" ><button class="select-bill" @click="$router.push({path: '/myFinanceAccount'})">我的理财</button></div>
    </HeadTop>
    <div class="header-wrap">
      <div class="header">
        <!--<h3 class="money">{{licaiInfo.sumlicaiMoney}}元</h3>-->
        <div class="aid-rate">目标<span>周</span>收益</div>
        <div class="rate-num">{{licaiInfo.lvval}}%</div>
      </div>
    </div>
    <div class=" introduce ">
      <div class="tits"><h3>服务介绍</h3></div>
      <ul class="intro-list">
        <li class="intro-item">{{licaiInfo.moneymin}}元起投，单日上限{{licaiInfo.moneymax}}元</li>
        <li class="intro-item">本理财项目每日限制{{licaiInfo.dayusercount}}人，先投先得</li>
        <li class="intro-item">每万元目标收益达{{licaiInfo.lvval * 100}}元</li>
        <li class="intro-item">本服务属于自动结算，周期时间不定，最长为7日，如果结算时间不足7日，系统依然按1周收益返理财者。</li>
        <li class="intro-item">结算时理财本金直接返到您的卡中，收益金额将返到平台账户，可继续使用。</li>
        <li class="intro-item">结算时将会以短信或微信公众号推送方式通知您</li>
        <li class="intro-item">起息日期：当日买入次日计算收益</li>
        <li class="intro-item">保证方式：优定软件有限公司</li>
      </ul>
    </div>
    <div class="finance-state ">
      <div class="tits"><h3>理财动态</h3> <span class="buy-num" v-if="licaiList.length > 0">共{{licaiInfo.sumUserCount}}人已买入</span></div>
      <p class="no-list" v-if="licaiList && licaiList.length < 1">暂无记录</p>
      <ul class="state-list">
        <li class="finan-item clearfix" v-for="(item, index) in licaiList" :key = "index">
            <div class="name fl">
              <p class="info">
                <img :src="item.userImg" alt=""> {{item.nickname}}
              </p>
              <p class="bz">{{item.licaitime | fmtDate('MM-dd') }} {{item.licaitime | fmtDate('hh:mm')}}</p>
            </div>
            <div class="money fl">
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

    <div class="btn-wrapper">
      <button class="btn-buyin" @click="showpoup">
        <p >立即买入</p>
        <p class="canbuy">今日还剩可买入数量{{licaiInfo.dayusercount - licaiInfo.todayusercount}}人</p>
      </button>
    </div>

    <cube-popup type="code-popup"   ref="codePopup">
      <div class="code-wrap">
        <span class="close" @click="hidepoup"></span>
        <h5>购买理财</h5>
        <ul class="charge-info">
          <li class="clearfix"><span class="info-item fl">账号余额:</span> {{useInfo.accountBalance}}元</li>
          <li class="clearfix"><span class="info-item fl">购买金额:</span> <span class="fl"><input class="code-input" maxlength="6" type="tel" v-model="buyNum" placeholder="请输入购买金额" /></span></li>
          <li class="clearfix"><span class="info-item fl">交易密码：</span><span class="fl"><input class="code-input" maxlength="6" type="password" v-model="tradeCode" placeholder="请输入交易密码" /></span></li>
        </ul>
        <button class="surePay" :disabled="canAccountPay" @click="licaiSurePay">确认</button>
      </div>
    </cube-popup>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
    import HeadTop from '../../components/HeadTop.vue'
    import {throttle} from '../../config/myUtils'
    import {licaiDetail, buyLicai} from '../../http/getDate'

    export default {
        name: "myFinance",
      data(){
          return {
            headBg: false,
            useInfo: '',
            licaiInfo: '',
            licaiList: [],
            buyNum: '', //购买金额
            tradeCode: '', //交易密码
            canAccountPay: false,
            loading: true
          }
      },
      components: {
          HeadTop
      },
      mounted(){

          this.initPage();
        window.addEventListener('scroll', throttle(() => {

          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if( scrollTop > 50) {
            this.headBg = true;
            console.log(this.headBg)
          } else {
            this.headBg = false;
            console.log(this.headBg)
          }
        },250))
      },
      methods: {
        initPage(){
          licaiDetail(1).then(res=> {
            console.log(res)
            this.useInfo = res.capital; //当前用户信息
            this.licaiInfo = res.licai; //理财基本信息
            this.licaiList = res.licailist;//动态列表
            console.log(this.licaiList);
            this.loading = false

          })
        },
        showpoup() {
          this.$refs.codePopup.show();
        },
        hidepoup() {
          this.$refs.codePopup.hide();
        },
        licaiSurePay() {
          if(this.buyNum == '') {
            this.$createToast({
              txt: '请输入购买金额',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
          }else if(this.tradeCode == '') {
            this.$createToast({
              txt: '请输入交易密码',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
          }else if( parseInt(this.buyNum) < parseInt(this.licaiInfo.moneymin) ) {
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '购买金额金额最少' + this.licaiInfo.moneymin
            }).show()

          }else if(parseInt(this.buyNum) > parseInt(this.licaiInfo.moneymax) ) {
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '购买金额金额最多' + this.licaiInfo.moneymax
            }).show()

          } else if(this.tradeCode.length < 6) {
            this.$createToast({
              txt: '交易密码填写不正确',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
          } else{
            buyLicai({
              licaiId: 1,
              money: this.buyNum,
              fundpassword: this.tradeCode
            }).then(res => {

              console.log(res)
              if(res.msg) {
                this.$createDialog({
                  type: 'alert',
                  title: '提示',
                  content: res.msg
                }).show()
              } else {
                this.hidepoup();
                this.$createDialog({
                  type: 'alert',
                  title: '提示',
                  content: '成功投资了周周理财项目，7日内将会自动结算'
                }).show()

                setTimeout(() => {
                  //重新更新页面
                  this.initPage();
                }, 2000)
              }
            })
          }
        }
       }
    }
</script>

<style>

</style>
