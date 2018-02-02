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
  import {payOrder, payOrderWx} from '../../http/getDate'
  import TimeCount from '../../components/timeCountDown.vue'
  import SwitchOption from '../../components/switchOption.vue'
  import PayRadio from '../../components/payRadio.vue'

  export default {
    data() {
      return {
        endT: '2018-01-09 21:55:00',
        nowT: '2018-01-09 19:50:00',
        payOrderDetail: '',
        userAccount: '',
        orderNumber: '',
        val: '2',
        isdisabled: true,
        ischecked: false
      }
    },
    components: {
      TimeCount,
      SwitchOption,
      PayRadio
    },
    computed: {
      ...mapState([
        'orderDetail'
      ]),
    },
    mounted() {
      this.preOrderLoad();
    },
    methods: {
      endLog() {
        console.log('.....倒计时结束了.....')
      },
      preOrderLoad() {
        payOrder(this.orderDetail.ordernumber).then(res => {
          console.log('===去支付页返回====')
          this.userAccount = res.capitalcenter;
          this.payOrderDetail = res.orderMap;

        })
      },
      onBridgeReady() {
        console.log('支付请求');
        console.log('订单号：' + this.orderDetail.ordernumber)
        payOrderWx(this.orderDetail.ordernumber).then(res => {
          let that = this;
          console.log('===支付参数返回====')
          // payOrderWx('180201000267178606').then(res => {
          console.log(res.pay.appid, res.pay.timestamp, res.pay.nonce_str, res.packageValue, res.pay.sign)
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": res.pay.appid, //公众号名称，由商户传入
              "timeStamp": res.pay.timestamp, //时间戳，自1970年以来的秒数
              "nonceStr": res.pay.nonce_str, //随机串
              "package": res.packageValue,
              "signType": "MD5", //微信签名方式:
              "paySign": res.pay.sign //微信签名
            }, function (res) {
              console.log(res.err_code + ";" + res.err_desc + ";" + res.err_msg);
              WeixinJSBridge.log(res.err_msg);
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$createDialog({
                  type: 'alert',
                  title: '支付结果',
                  content: '支付成功'
                }).show()
                // 使用以上方式判断前端返回,微信团队郑重提示：reserr_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
              } else {
                that.$createDialog({
                  type: 'alert',
                  title: '支付结果',
                  content: '支付失败'
                }).show()
              }
            }
          );
        })

        // $.post('/siteH5/play.json?act=play', {orderNo: '20180102167656317'}, function (data) {
        //
        // }, "json");

      },
      pay() {
        this.directRightUrl();
        console.log('当前地址'+location.href)
        console.log('发起微信支付。。。')
        if (this.val == 2) {
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
        } else if (this.val == 1) {
          this.$createDialog({
            type: 'alert',
            title: '支付选项',
            content: '选择了账号支付'
          }).show()

        }

      },
      directRightUrl() {
        let {href, protocol, host, search, hash} = window.location
        const pathname = '/templates/h5/index.html' // 解决支付路径问题添加的前缀，替换成你的
        search = search || '?'
        hash = hash || '#/'
        let newHref = `${protocol}//${host}${pathname}${search}${hash}`
        if (newHref !== href) {
          console.log(newHref);
          // window.location.replace(newHref)
        }
      },
      getVal() {
        console.log('==切换了支付方式==')
        console.log(this.val)
      }
    }
  }
</script>

