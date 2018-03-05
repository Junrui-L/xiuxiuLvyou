<template>
  <div class="set_contact">
    <h1 class="title">设置联系方式</h1>
    <div class="input-wrapper"><input class="phone" type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号">
      <i v-if="phone != ''" class="delete" @click="clearPhone"></i>
      <button class="btn-txt" @click="sendCode" :disabled="isDisabled">{{ btnText }}</button>
    </div>
    <div class="input-wrapper"><input class="verify-code"  maxlength="6" type="tel" v-model="verifyCode" placeholder="请输入验证码"/>
      <button v-show="noRecive" class="btn-txt">没有收到?</button>
    </div>
    <div class="save-wrapper"><button class="save-btn" @click="setPhone">保存</button></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getVeryCode, userUpdateMobile} from '../../http/getDate'
    export default {
        name: "set-contact",
        data() {
          return {
            phone: '',
            verifyCode: '',
            btnText: '获取验证码',
            isDisabled: false,
            noRecive: false
          }
        },
        methods: {
          clearPhone() {
            this.phone = ''
          },
          sendCode() {
            //发送验证码60s倒计时
            let setf = this;
            this.noRecive = true;
            let countdown = 60;
            let reg = /^1[34578][0-9]{9}$/;
            if(this.phone == '') {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '请输入手机号'
              }).show()
            } else if(!reg.test(this.phone)) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '请输入正确的手机号'
              }).show()
            } else {
              getVeryCode(this.phone).then(res => {
                console.log(res)
              })
              let  settime = () => {
                if (countdown === 0) {
                  setf.isDisabled = false
                  setf.btnText = "重新获取";
                  countdown = 60;
                  return false;
                } else {
                  setf.isDisabled = true;
                  setf.btnText = "(" + countdown + "s)重新获取";
                  countdown--;
                }
                setTimeout(() => {
                  settime();
                },1000);
              };
              settime()
            }

          },
          setPhone(){
            let reg = /^1[34578][0-9]{9}$/;
            if(this.phone == ''){
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '请输入手机号'
              }).show()
            } else if(this.verifyCode == '') {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '请输入验证码'
              }).show()
            } else if(!reg.test(this.phone)) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '请输入正确的手机号'
              }).show()
            }else if(reg.test(this.phone)){
              userUpdateMobile(this.phone, this.verifyCode).then(res => {
                console.log(res)
              })
            }

          }
       }
    }
</script>


<style lang="scss">

</style>
