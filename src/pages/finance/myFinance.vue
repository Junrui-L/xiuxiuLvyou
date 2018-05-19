<template>
  <div class="myFinance">
    <HeadTop go-back='true' :headBg="headBg">
      <div slot="select-title" class="select-title" >
        <span class="title_head black" >周周理财</span>
      </div>
      <div slot="message" class="selects fr" ><button class="select-bill">我的理财</button></div>
    </HeadTop>
    <div class="header-wrap">
      <div class="header">
        <h3 class="money">{{licaiInfo.sumlicaiMoney}}元</h3>
        <div class="aid-rate">目标收益率</div>
        <div class="rate-num">{{licaiInfo.lvval}}%</div>
      </div>
    </div>
    <div class=" introduce ">
      <div class="tits"><h3>服务介绍</h3></div>
      <ul class="intro-list">
        <li class="intro-item">￥1000起投，单日上限20000</li>
        <li class="intro-item">本理财项目每日限制10人，先投先得</li>
        <li class="intro-item">每万元目标收益达￥500</li>
        <li class="intro-item">本服务属于自动结算，周期时间不定，最长为7日，如果结算时间不足7日，系统依然按1周收益返理财者。</li>
        <li class="intro-item">结算时理财本金直接返到您的卡中，收益金额将返到平台账户，可继续使用。</li>
        <li class="intro-item">结算时将会以短信或微信公众号推送方式通知您</li>
        <li class="intro-item">起息日期：当日买入次日计算收益</li>
        <li class="intro-item">保证方式：优定软件有限公司</li>
      </ul>
    </div>
    <div class="finance-state ">
      <div class="tits"><h3>理财动态</h3> <span class="buy-num">共133人已买入</span></div>
      <ul class="state-list">
        <li class="finan-item clearfix">
            <div class="name fl">
              <p class="info">
                <img src="../../assets/img/taiwdy.png" alt="">李三
              </p>
              <p class="bz">2018-06-06</p>
            </div>
            <div class="money">
              <p class="num">￥2000</p>
              <p class="bz">
                收益中
              </p>
            </div>
            <div class="balance fr">
              <p>理财周期7天</p>
              <p>s收益￥30</p>
            </div>

        </li>
        <li class="finan-item clearfix">
          <div class="name fl">
            <p class="info">
              <img src="../../assets/img/taiwdy.png" alt="">李三
            </p>
            <p class="bz">2018-06-06</p>
          </div>
          <div class="money">
            <p class="num">￥2000</p>
            <p class="bz">
              收益中
            </p>
          </div>
          <div class="balance fr">
            <p>理财周期7天</p>
            <p>s收益￥30</p>
          </div>

        </li>
        <li class="finan-item clearfix">
          <div class="name fl">
            <p class="info">
              <img src="../../assets/img/taiwdy.png" alt="">李三
            </p>
            <p class="bz">2018-06-06</p>
          </div>
          <div class="money">
            <p class="num">￥2000</p>
            <p class="bz">
              收益中
            </p>
          </div>
          <div class="balance fr">
            <p>理财周期7天</p>
            <p>s收益￥30</p>
          </div>

        </li>
      </ul>
    </div>

    <div class="btn-wrapper">
      <button class="btn-buyin" @click="showpoup">
        <p >立即买入</p>
        <p class="canbuy">今日还剩可买入数量{{licaiInfo.todayusercount}}人</p>
      </button>
    </div>

    <cube-popup type="code-popup"   ref="codePopup">
      <div class="code-wrap">
        <span class="close" @click="hidepoup"></span>
        <h5>充值确认</h5>
        <ul class="charge-info">
          <li class="clearfix"><span class="info-item fl">账号余额:</span> 2000元</li>
          <li class="clearfix"><span class="info-item fl">购买金额:</span> <span class="fl"><input class="code-input" maxlength="6" type="tel" v-model="buyNum" placeholder="请输入购买金额" /></span></li>
          <li class="clearfix"><span class="info-item fl">交易密码：</span><span class="fl"><input class="code-input" maxlength="6" type="password" v-model="tradeCode" placeholder="请输入交易密码" /></span></li>
        </ul>
        <button class="surePay" :disabled="canAccountPay" @click="accoutSurePay">确认</button>
      </div>
    </cube-popup>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
    import HeadTop from '../../components/HeadTop.vue'
    import {throttle} from '../../config/myUtils'
    import {licaiDetail} from '../../http/getDate'

    export default {
        name: "myFinance",
      data(){
          return {
            headBg: false,
            useInfo: null,
            licaiInfo: null,
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
            this.licaiList = res.licaiList;//动态列表

            this.loading = false

          })
        },
        showpoup() {
          this.$refs.codePopup.show();
        },
        hidepoup() {
          this.$refs.codePopup.hide();
        },
        accoutSurePay() {

        }
      }
    }
</script>

<style>

</style>
