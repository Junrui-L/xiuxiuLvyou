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
    <div class="save-wrapper"><button class="save-btn">保存</button></div>
  </div>
</template>

<script type="text/ecmascript-6">
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
       }
    }
</script>


<style lang="scss">

</style>
