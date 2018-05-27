<template>
    <div class="recharge">
      <h3 class="heads">充值</h3>
      <div class="bank-charge charges">
        <div class="charge-choose">
          <pay-radio paymethod="银行充值" v-model="val" value="1" @change="getVal"></pay-radio>
        </div>
          <!-- 切换按钮 -->
        <div v-if="showBank">
          <section class="change_show_type" ref="chooseType">
            <div>
              <span :class='{activity_show: accoutType =="public"}' @click="accoutType ='public'">对公账户</span>
            </div>
            <div>
              <span :class='{activity_show: accoutType == "private"}' @click="accoutType = 'private'">对私账户</span>
            </div>
          </section>
          <div class="charge_content private_content" v-if="accoutType == 'public' ">
            <ul class="bank-info">
              <li class="cont-item clearfix"><span class="item-name fl">收款人：</span><span class="fl">{{handleBank(bankInfo.gsBank)[0]}}</span></li>
              <li class="cont-item">
                <span class="item-name fl">收款账号：</span><span class="fl">{{handleBank(bankInfo.gsBank)[1]}}</span>
              </li>
              <li class="cont-item clearfix"><span class="item-name fl">支 行 名：</span> <span class="fl">{{handleBank(bankInfo.gsBank)[2]}}</span></li>
              <li class="cont-item clearfix"><span class="item-name fl">充值金额</span><span class="fl"><input type="tel" v-model="bankChargeMoney" maxlength="8" placeholder="请输入金额" />（最低充值金额100）</span></li>
              <li class="cont-item clearfix"><span class="item-name fl">转账人</span><span class="fl"><input type="text" v-model="bankChargeName" maxlength="8" placeholder="请输入姓名" /></span></li>
            </ul>
          </div>
          <div class="charge_content public_content" v-if="accoutType == 'private' ">
            <ul class="bank-info">
              <li class="cont-item clearfix"><span class="item-name fl">收款人：</span><span class="fl">{{handleBank(bankInfo.grBank)[0]}}</span></li>
              <li class="cont-item">
                <span class="item-name fl">收款账号：</span><span class="fl">{{handleBank(bankInfo.grBank)[1]}}</span>
              </li>
              <li class="cont-item clearfix"><span class="item-name fl">支 行 名：</span> <span class="fl">{{handleBank(bankInfo.grBank)[2]}}</span></li>
              <li class="cont-item clearfix"><span class="item-name fl">充值金额</span><span class="fl"><input type="tel" v-model="bankChargeMoney" maxlength="8" placeholder="请输入金额" />（最低充值金额100）</span></li>
              <li class="cont-item clearfix"><span class="item-name fl">转账人</span><span class="fl"><input type="text" v-model="bankChargeName" maxlength="8" placeholder="请输入姓名" /></span></li>
            </ul>
          </div>
          <p class="tips">请确认填写的姓名与您的付款姓名一致，否则将无法申请通过</p>
        </div>

      </div>
      <div class="wx-charge charges">
        <div class="charge-choose">
          <pay-radio paymethod="微信充值" v-model="val" value="2" @change="getVal"></pay-radio>
        </div>
        <div class="charge_content" v-if="!showBank">
          <div class="wx_charge_content cont-item">
              <span class="item-name fl">充值金额</span><span class="fl"><input type="tel" maxlength="8"  v-model="wxCharegMoney" placeholder="请输入金额" />（最低充值金额100）</span>
          </div>

        </div>

      </div>

      <div class="btn-wrapper">
        <button class="charge-btn" :disabled="isCharge" @click="accoutPay">发起申请</button>
      </div>
      <transition name="tip-scale">
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="paySuccess" :alertText="alertText"></alert-tip>
      </transition>
      <loading v-show="loading"></loading>
    </div>
</template>

<script>
  import PayRadio from '../../components/payRadio.vue'
  import {mongeyInit, moneyInByBan, payOrderWx} from '../../http/getDate'
  export default {
      name: "recharge",
      data(){
          return {
            bankInfo: '',
            val: 1,
            accoutType: 'public',
            // showBank: true,
            bankChargeMoney: '',  //银行充值金额
            bankChargeName: '',
            wxCharegMoney: '',  //微信充值金额
            isCharge: false,
            tradeCode: '',
            canWxPay:false,
            canAccountPay: false,
            showAlert: false,
            alertText: '',
            loading: true
          }
      },
      components: {
        PayRadio
      },
    computed: {
      showBank: {
        set: function () {
          if(this.val == 1) {
            return true
          } else {
            return false
          }
        },
        get: function () {
          if(this.val == 1) {
            return true
          } else {
            return false
          }
        }

      }
    },
      mounted(){
        this.loadBank()
      },
      methods:{
        loadBank(){
          mongeyInit().then( res => {
              this.loading=false
              console.log(res);
              console.log(`最小值 ${this.minMoney}`)
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: res.msg
              }).show()
            } else {
              this.bankInfo = res.data;
            }
          })
        },
        getVal(){
          console.log('==切换了支付方式==')
          console.log(this.val);
          this.showBank = !this.showBank;
        },
        accoutSurePay(){
          if(this.tradeCode.length === 6) {
            this.canAccountPay = true;
            this.accoutPay();
          } else if (this.tradeCode == ''){
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '请输入支付密码'
            }).show()
          } else {
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '支付密码输入不正确'
            }).show()
          }
        },
        accoutPay() {
          //银行卡充值提交充值订单
          // console.log(this.bankInfo.maxmin)
          let max = this.handleBank(this.bankInfo.maxmin)[1]

          if(this.val == 1) {
            console.log('银行卡充值')
            if(this.bankChargeMoney  == '') {
              this.$createToast({
                txt: '请输入充值金额',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else  if( this.bankChargeMoney < 100 || this.bankChargeMoney > max ) {
              this.$createToast({
                txt: '充值金额填写不正确',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else if(this.bankChargeName == '') {
              this.$createToast({
                txt: '请输入姓名',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else {
              if(this.accoutType == 'public'  ) {
                console.log(`'对公账户充值' + ${this.bankChargeMoney} + ${this.bankChargeName} `)
                moneyInByBan({
                  way: 2,
                  money: this.bankChargeMoney,
                  username: this.bankChargeName
                }).then(res => {
                  if(res.msg) {
                    this.$createDialog({
                      type: 'alert',
                      title: '提示',
                      content: res.msg
                    }).show()
                  } else {
                    console.log(res);
                    this.$createDialog({
                      type: 'alert',
                      title: '提示',
                      content: '已发起审核，请等待客服确认，如有疑问可联系在线客服。'
                    }).show()
                  }
                })
              } else if(this.accoutType == 'private'  ) {
                console.log('对私账户充值')
                moneyInByBan({
                  way: 1,
                  money: this.bankChargeMoney,
                  username: this.bankChargeName
                }).then(res => {
                  if(res.msg) {
                    this.$createDialog({
                      type: 'alert',
                      title: '提示',
                      content: res.msg
                    }).show()
                  } else {
                    this.$createDialog({
                      type: 'alert',
                      title: '提示',
                      content: '已发起审核，请等待客服确认，如有疑问可联系在线客服。'
                    }).show()

                  }

                })
              }
            }
          }else if(this.val == 2) {
            console.log('微信充值');
            let max = this.handleBank(this.bankInfo.maxmin)[1]
            if(this.wxCharegMoney  == '') {
              this.$createToast({
                txt: '请输入充值金额',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else  if( this.wxCharegMoney < 100 || this.wxCharegMoney > max ) {
              this.$createToast({
                txt: '充值金额填写不正确',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else {
              moneyInByBan({
                way: 0,
                money: this.wxCharegMoney,
                username: ''
              }).then(res => {
                if(res.msg) {
                  this.$createDialog({
                    type: 'alert',
                    title: '提示',
                    content: res.msg
                  }).show()
                } else {

                  let orderNo = res.moneyInData.ordernumber
                  console.log(orderNo);
                  //TODO: 调起微信支付
                  this.conPay(orderNo);
                }
              })
            }

          }

        },
        conPay(orn) {
          let that = this;
          console.log('支付请求');
          this.loading = true
          let signUrl = location.href;
          payOrderWx(orn, signUrl).then(res => {
            let that = this;
            console.log('===支付参数返回====')
            this.loading = false;
            wx.config({
              debug: false,
              appId: res.configMap.appid,
              timestamp: res.configMap.timestamp,
              nonceStr: res.configMap.nonceStr, //随机串
              signature: res.configMap.signature ,//微信签名
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
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
                    //支付成功的跳转
                    that.alertText = '支付成功';
                    that.showAlert = true;
                    // that.$router.push({name: 'order',query: {orderNum: that.$route.query.orn}})
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
        handleBank(str){
          if( str && str.length > 0) {
            return str.split(',')
          } else {
            return ''
          }
        }
      }

    }
</script>


