<template>
    <div class="prepay_order">
      <div class="left-time">
        <TimeCount :endTime="endT" :nowTime = "nowT" :countCallback="endLog" />
      </div>
      <div class="order-main clearfix">
        <div class="img-wrapper fl">
          <img src="../../assets/img/taiwdy.png" alt="">
        </div>
        <ul class="order-detail fl">
          <li class="order-item order-price">￥ {{payOrderDetail.orderSumPrice}}.00</li>
          <li class="order-item order-number">订单号：{{payOrderDetail.ordernumber}}</li>
          <li class="order-item order-content">{{payOrderDetail.orderdoc}}</li>
          <li class="order-item order-mode">{{payOrderDetail.orderdoc}}</li>
        </ul>
      </div>

      <div class="account-wrapper">
        <div class="accout-pay">账户支付 <span class="check-count fr"><input name="pay" type="radio"></span></div>
        <div class="account-balance">余额：{{userAccount.accountBalance}}元</div>
      </div>
      <div class="wx-pay">微信支付 <span class="check-count fr"><input name="pay" type="radio"></span></div>
      <div class="all-pay"><span>查看全部支付方式 </span></div>
      <!--<SwitchOption name="注册 "></SwitchOption>-->
      <div class="sure-pay"><button class="pay-btn" @click="pay">确认支付 <span>￥ {{payOrderDetail.orderSumPrice}}元</span></button></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {payOrder, payOrderWx} from '../../http/getDate'
  import TimeCount from '../../components/timeCountDown.vue'
  import SwitchOption from  '../../components/switchOption.vue'
  export default {
    data() {
      return {
        endT: '2018-01-09 21:55:00',
        nowT: '2018-01-09 19:50:00',
        payOrderDetail: '',
        userAccount: '',
        orderNumber: ''
      }
    },
    components: {
      TimeCount,
      SwitchOption
    },
    computed: {
      ...mapState([
        'orderDetail'
      ]),
    },
    mounted() {
      var href=location.href
      if(href.indexOf(".html#/")>-1){
        location.href=location.href.replace(".html#/",".html?#/")
      }
      this.preOrderLoad();
    },
    methods: {
      endLog() {
        console.log('.....倒计时结束了.....')
      },
      preOrderLoad(){
        payOrder(this.orderDetail.ordernumber).then(res => {
          console.log('===去支付页返回====')
          this.userAccount = res.capitalcenter;
          this.payOrderDetail = res.orderMap;

        })
      },
      onBridgeReady() {
        console.log('支付请求');
        console.log('订单号：'+this.orderDetail.ordernumber)
        payOrderWx(this.orderDetail.ordernumber).then(res => {
          console.log(res)
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": res.appid, //公众号名称，由商户传入
              "timeStamp": res.pay.timestamp, //时间戳，自1970年以来的秒数
              "nonceStr": res.pay.nonce_str, //随机串
              "package": res.packageValue,
              "signType": "MD5", //微信签名方式:
              "paySign": res.pay.sign //微信签名
            }, function (res) {
              console.log(res.err_code + ";" + res.err_desc + ";" + res.err_msg);
              WeixinJSBridge.log(res.err_msg);
              if (reserr_msg == "get_brand_wcpay_request:ok") {
                alert("支付成功");
              } // 使用以上方式判断前端返回,微信团队郑重提示：reserr_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
            }
          );
        })

          // $.post('/siteH5/play.json?act=play', {orderNo: '20180102167656317'}, function (data) {
          //
          // }, "json");

      },
      pay() {
        console.log('发起支付。。。')
        console.log(WeixinJSBridge)
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      }
    }
  }
</script>

