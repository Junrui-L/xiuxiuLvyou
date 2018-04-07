<template>
    <div class="withdrawDeposit">
      <div class="input-wrapper clearfix" @click="$router.push({path: '/bankCardList'})">
        <span class="tits fl">{{bankName}}</span>
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
        <p>可用金额：￥{{accountBalance}} 元</p>
      </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">支付密码</span>
        <input class="trade-code fl"  maxlength="6" type="password" v-model="tradeCode" placeholder="请输入支付密码"/>
      </div>
      <div class="coupons" @click="showYHJ">优惠券
        <span class="coupon-txt  fr">
          {{selectYHJObj.text ? selectYHJObj.text : yjhArr.length-1 +'张优惠券可用'}}
          <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
      <div class="btn-wrapper"><button class="sure-btn" :class="{active: canDeposit}" @click="toWidtraw">确 定</button></div>
    </div>
</template>

<script>
  import {userBanks,userAccounts, getCanUseyhj,withdraw} from '../../http/getDate'
    export default {
        name: "withdrawDeposit",
      data(){
        return {
          bankName: '请选择银行卡',
          bankId: this.$route.query.id,
          depositNum: '',
          accountBalance: 0,
          tradeCode: '',
          yhjId: '',
          selectYHJObj:'', // 选中的优惠券对象
          yjhArr:[], // 可以使用的优惠券列表
          canDeposit: true

        }
      },
      computed: {

      },
      mounted(){
        userBanks().then(res => {
          console.log(res)
          let resp = res.list
          for(let i in  resp){
              console.log(resp[i])
            if(this.bankId == resp[i].id) {
                console.log(resp[i].id, resp[i].bankname)
                this.bankName = resp[i].bankname;
            }
          }
        })

        this.queryWallet();
        this.getCanUseYHJ ();
        //查询钱包余额
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
          } else if(parseInt(this.depositNum) < 50 ) {
            this.$createToast({
              txt: '最低提现金额50',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return
          } else if(parseInt(this.depositNum) > parseInt(this.accountBalance)) {
            this.$createToast({
              txt: '超过最大提取额度',
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
            if(this.selectYHJObj != '' && this.selectYHJObj.minprice > this.depositNum) {
              this.$createToast({
                txt: '提现金额不满足优惠券最低限额' + this.selectYHJObj.minprice,
                type: 'correct',
                mask: true,
                time: 2000
              }).show();
              return
            }
            withdraw(this.bankId, this.yhjId, this.depositNum, this.tradeCode).then( res => {
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
                setTimeout(()=>{
                  this.$router.push({path: '/myWallet'})
                },2000)
              }

            })
          }

        },
        // 查询钱包
        queryWallet(){
          userAccounts().then(res => {
            this.accountBalance = res.capital.accountBalance
          })
        },
        // 显示优惠券
        showYHJ(){
          this.yhjPicker.show()
        },
        // 获取未使用的优惠券
        getCanUseYHJ (){
          getCanUseyhj().then(res=>{
            this.yjhArr=res.list

            let yhjData = [];
            if(res.list.length > 0) {
              for(let i=0; i<res.list.length; i++) {
                if(res.list[i].type == 6){
                  yhjData.push({value: res.list[i].id, text: res.list[i].name, price: res.list[i].toprice, minprice: res.list[i].minprice})
                }

              }
              yhjData.push({value:'', text: '不使用优惠券', price: 0})
              console.log(yhjData);
            } else {
              yhjData = [{value:'', text: '暂无可用优惠券', price: 0}]
            }

            this.yjhArr = yhjData;
            this.yhjPicker = this.$createPicker({
              title: '可用优惠券',
              data: [this.yjhArr],
              onSelect: this.selectYHJHandle,
              onCancel: this.cancelHandle
            })

          })
        },
        // 选中优惠券
        selectYHJHandle(v, i, t){
          this.selectYHJObj = this.yjhArr[i];
          console.log(this.selectYHJObj);
          this.yhjId = this.selectYHJObj.value;
        }

      }
    }
</script>

