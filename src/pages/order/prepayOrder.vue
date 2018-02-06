<template>
  <div class="prepay_order">
    <div class="left-time">
      <TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>
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
      <div class="accout-pay">账户支付 <span class="check-count fr"><pay-radio v-model="val" value="1"
                                                                           @change="getVal"></pay-radio></span></div>
      <div class="account-balance">余额：{{userAccount.accountBalance}}元</div>
    </div>
    <div class="wx-pay">微信支付 <span class="check-count fr"><pay-radio v-model="val" value="2"
                                                                     @change="getVal"></pay-radio></span></div>
    <div class="all-pay"><span>查看全部支付方式 </span></div>
    <!--<SwitchOption name="注册 "></SwitchOption>-->
    <div class="sure-pay">
      <button class="pay-btn" @click="pay">确认支付 <span>￥ {{payOrderDetail.orderSumPrice}}元</span></button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {payOrder, payOrderWx, payConfigWx } from '../../http/getDate'
  import TimeCount from '../../components/timeCountDown.vue'
  import PayRadio from '../../components/payRadio.vue'
  import {localStore} from '../../config/myUtils'
  export default {
    data() {
      return {
        endT: '2018-02-09 11:55:00',
        nowT: '2018-01-09 19:50:00',
        payOrderDetail: '',
        userAccount: '',
        orderNumber: '',
        configMap: '',
        val: '2',
        isdisabled: true,
        ischecked: false
      }
    },
    components: {
      TimeCount,
      PayRadio
    },
    computed: {
      ...mapState([
        'orderDetail'
      ]),
    },
    created(){
      let loc =  localStore('orderNum', 'localStorage')
      loc.set('orn', this.$route.query.orn)
    },
    mounted() {
      // this.configWx();
      this.preOrderLoad();
    },
    methods: {
      endLog() {
        console.log('.....倒计时结束了.....')
      },
      configWx(){
        let signUrl = location.href;

        // signUrl = encodeURIComponent(signUrl)
        console.log(`要签名的url ${signUrl}`)
        payConfigWx(signUrl).then(res => {
          console.log(res)
          console.log('===》签名基本参数返回《====')
          if(res.code && res.code == '-1001') {
            console.log('还么登录,需要授权登录')
            location.href= res.data.redirect;
          }
          console.log(res);
          this.configMap = res.configMap;
          wx.config({
            debug: false,
            appId: res.configMap.appid,
            timestamp: res.configMap.timestamp,
            nonceStr: res.configMap.nonceStr, //随机串
            signature: res.configMap.signature ,//微信签名
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
          });
        })
      },
      preOrderLoad() {

        payOrder(this.$route.query.orn).then(res => {
          console.log('===去支付页返回====')
          this.userAccount = res.capitalcenter;
          this.payOrderDetail = res.orderMap;

        })

      },
      onBridgeReady(){
        let that = this;
        let signUrl = location.href;
        payOrderWx(this.$route.query.orn, signUrl).then(res => {

          let paysi = res.pay.sign.toUpperCase();
          WeixinJSBridge.invoke('getBrandWCPayRequest',{
            "appId" : res.configMap.appid,
            "timeStamp" : res.pay.timestamp,
            "nonceStr" : res.pay.nonce_str,
            "package" : res.packageValue,
            "signType" : "MD5",
            "paySign" : paysi
          },function(res){
            //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok"){
              that.$createDialog({
                type: 'alert',
                title: '支付结果',
                content: '支付成功'
              }).show()
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              that.$createDialog({
                type: 'alert',
                title: '支付结果',
                content: '用户取消支付'
              }).show()
              // alert("用户取消支付!");
            }else if(res.err_msg == "get_brand_wcpay_request：fail"){
              that.$createDialog({
                type: 'alert',
                title: '支付结果',
                content: '支付失败!'
              }).show()
              // alert("支付失败!");
            }
          })


        })

      },
      callPay(){
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady();
        }
      },
      conPay() {
        let that = this;
        console.log('支付请求');
        console.log('订单号：' + this.$route.query.orn)
        let signUrl = location.href;
        payOrderWx(this.$route.query.orn, signUrl).then(res => {
          let that = this;
          console.log('===支付参数返回====')
          wx.config({
            debug: false,
            appId: res.configMap.appid,
            timestamp: res.configMap.timestamp,
            nonceStr: res.configMap.nonceStr, //随机串
            signature: res.configMap.signature ,//微信签名
            jsApiList: ['chooseWXPay','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，这里只写支付的
          });

          // console.log(res.pay.appid, res.pay.timestamp, res.pay.nonce_str, res.packageValue, res.pay.sign)
          wx.ready(function(){
            console.log('进入了 wx.ready')
            console.log(res)
            let paysi = res.pay.sign.toUpperCase();
            console.log(paysi)
            wx.chooseWXPay({
              timestamp:res.pay.timestamp,  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.pay.nonce_str, // 支付签名随机串，不长于 32 位
              package: res.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: "MD5", // 签名方式，默认为′SHA1′，使用新版支付需传入′MD5′
              paySign: paysi , // 支付签名
              success: function (res) {
                if(res.errMsg == "chooseWXPay:ok"){
                  // alert("支付成功");
                  that.$createDialog({
                    type: 'alert',
                    title: '支付结果',
                    content: '支付成功'
                  }).show()
                  // window.location.href  = "/hims/weixin/pages/Order_ok.html?access_token=" ;
                }else{
                  console.log(res.errMsg);
                  that.$createDialog({
                    type: 'alert',
                    title: '支付结果',
                    content: '支付失败'
                  }).show()
                }
              },
              cancel: function(res){
                that.$createDialog({
                  type: 'alert',
                  title: '支付结果',
                  content: '取消支付'
                }).show()
              }
            });

            wx.error(function (err) {
              console.log(err)
            })
          })


        })
      },
      pay() {
        console.log('当前地址'+location.href)
        console.log('发起微信支付。。。')
        if (this.val == 2) {
          //微信支付调取1
          // this.conPay()
          //微信支付调取2
          // this.callPay();
          //去单独的支付页
          // window.location.href='http://www.youdingsoft.com/templates/h5/wxpay.html'
          window.location.href='http://www.youdingsoft.com/wxpay.html'

        } else if (this.val == 1) {
          this.$createDialog({
            type: 'alert',
            title: '支付选项',
            content: '选择了账号支付'
          }).show()

        }

      },
      getVal() {
        console.log('==切换了支付方式==')
        console.log(this.val)
      }
    }
  }
</script>

