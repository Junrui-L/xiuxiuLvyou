<template>
  <div class="addBankCard">
    <HeadTop go-back='true' :headBg="true">
      <div slot="select-title" class="select-title" >

        <span class="title_head black" >新增银行卡</span>

      </div>
      <div slot="message" class="addto fr" @click="addBankCard"><button class="commit">保存</button></div>
    </HeadTop>
    <p class="b-tip">以下信息为必填</p>
    <div class="input-wrapper clearfix">
      <span class="label fl">持卡人</span>
      <input class="bankcard fl"  maxlength="12" type="text" pattern="/n" v-model="bankUser" placeholder="请输入持卡人姓名"/>
    </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">卡 号</span>
        <input class="bankcard fl"  maxlength="20" type="tel" pattern="/n" v-model="bankCard" placeholder="请输入银行卡号"/>
      </div>
      <div class="input-wrapper clearfix" @click="showBankPicker">
        <span class="label fl">开户行</span>
        <span class="txt fl" :class="{gray: banks.bankname==''}">
          {{banks.bankname == '' ? '请选择开户行' : banks.bankname}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span>
      </div>

      <div class="input-wrapper clearfix">
        <span class="label fl">资金密码</span>
        <input class="trade-code fl"  maxlength="6" type="password" v-model="tradeCode" placeholder="请输入资金密码"/>
      </div>

  </div>
</template>

<script>

  import {initAddBank, AddBank} from '../../../http/getDate'
  // import {bankNum} from '../../../config/datajs'
  import HeadTop from '../../../components/HeadTop.vue'

  export default {
        name: "addBankcard",
        data() {
              return{
                banksList: [],
                bankUser: '',
                bankCard: '',
                banks: {
                  bankname: '',
                  bankId: ''
                },
                tradeCode: ''
              }
        },
        components: {
          HeadTop
        },

        mounted(){
          initAddBank().then(res => {
            console.log(res)

            for(let i=0 ;i< res.banklist.length; i++) {
              let obj = {}
              obj.value = res.banklist[i].id;
              obj.text = res.banklist[i].name;
              this.banksList.push(obj)
            }
            console.log(this.banksList)
            this.bankPicker = this.$createPicker({
              title: '选择开户行',
              data: [this.banksList],
              onSelect: this.selectBankHandle,
              onCancel: this.cancelHandle
            })
          })

        },
        methods: {
          addBankCard(){
            if(this.bankUser == '') {
              this.$createToast({
                txt: '请填写持卡人姓名',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            }else if(this.bankCard == '') {
              this.$createToast({
                txt: '请填写银行卡号',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            } else if(this.depositNum == ''){
              this.$createToast({
                txt: '请选择开户行',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            }else if(this.tradeCode == '') {
              this.$createToast({
                txt: '请填写资金密码',
                type: 'error',
                mask: true,
                time: 2000
              }).show();
            }else {
              AddBank({
                bankId: this.banks.bankId,
                accountName: this.bankUser,
                fundpassword: this.tradeCode ,
                accountNo: this.bankCard
              }).then(res => {
                console.log(res)
                if(res.msg) {
                  this.$createDialog({
                    type: 'alert',
                    title: '温馨提示',
                    content: res.msg
                  }).show()

                } else {
                  this.$router.go(-1);
                }
              })
            }
          },
          showBankPicker(){
            this.bankPicker.show();
          },
          selectBankHandle(v,i,t){
            console.log(v)
            this.banks.bankId = v[0]
            this.banks.bankname = t[0]
            console.log(this.banks.bankId, this.banks.bankname )
          }
        }

    }
</script>

