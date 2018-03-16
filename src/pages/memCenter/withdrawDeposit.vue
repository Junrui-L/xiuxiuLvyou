<template>
    <div class="withdrawDeposit">
      <div class="input-wrapper clearfix" @click="$router.push({path: '/bankCardList'})">
        <span class="tits fl">选择银行卡</span>
        <span class="txt fr">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span>
      </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">提现金额</span>
        <input class="deposit-num fl"  maxlength="8" type="number" v-model="depositNum" placeholder="请输入提现金额"/>
      </div>
      <div class="deposit-limit">
        <p>可用金额：￥333.00 元</p>
      </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">支付密码</span>
        <input class="trade-code fl"  maxlength="6" type="tel" v-model="tradeCode" placeholder="请输入支付密码"/>
      </div>
      <div class="btn-wrapper"><button class="sure-btn" :class="{active: canDeposit}" @click="toWidtraw">确 定</button></div>
    </div>
</template>

<script>
  import {withdraw} from '../../http/getDate'
    export default {
        name: "withdrawDeposit",
      data(){
        return {
          bankCard: '',
          depositNum: '',
          tradeCode: '',
          canDeposit: true
        }
      },
      mounted(){

      },
      watch: {
        canDeposit: function () {

        }
      },
      methods: {
        toWidtraw() {
          if(this.bankCard == '') {
            this.$createToast({
              txt: '请输入提现银行卡号',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return
          } else if(this.depositNum == '') {
            this.$createToast({
              txt: '请输入提现金额',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return
          } else if(this.tradeCode == '') {
            this.$createToast({
              txt: '请输入交易密码',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return
          } else {
            withdraw(this.bankCard, this.depositNum, this.tradeCode).then( res => {
              console.log('提交提现')
              if(res.msg) {
                this.$createDialog({
                  type: 'alert',
                  title: '提示',
                  content: res.msg
                }).show()
              }else {
                this.$createToast({
                  txt: '提现请求已提交',
                  type: 'correct',
                  mask: true,
                  time: 2000
                }).show();
              }
            })
          }

        }

      }
    }
</script>

