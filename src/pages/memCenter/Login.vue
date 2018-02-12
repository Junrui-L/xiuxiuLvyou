<template>
    <div class="login">
        <!--<div class="pay-tit"> <span class="xiu">咻</span><span class="xiu">咻</span> <span class="tit">登录</span></div>-->
        <div class="pay-tit"> <span class="tit">用户登录</span></div>
      <div class="input-area">
        <div class="input-wrapper">
          <input type="tel" id="phone" class="input-txt phone" maxlength="11" placeholder="请输入用户名/手机号码"
                 v-model="phone" name="loginPwd">
        </div>
        <div class="input-wrapper">
          <input type="password" id="tradePwd" class="input-txt pwd" maxlength="16" placeholder="请输入登录蜜码"
                 v-model="passWord"  name="tradePwd">
        </div>
      </div>
      <button class="to-register active" id="toRegister" :disabled="canLogin" @click="toLogin">登录</button>
    </div>

</template>

<script>
  import {userLogin} from '../../http/getDate'

  export default {
        name: "login",
      data() {
          return {
            phone: '',
            passWord: '',
            canLogin: false
          }
      },
      mounted(){
          // this.toLogin();
      },
      methods: {
          toLogin() {
            let reg= /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            console.log(this.phone)
            if(this.phone == '') {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '手机号码不能为空'
              }).show()
            } else if(!reg.test(this.phone) ) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '手机号码输入不正确'
              }).show()
            }else if(this.passWord == '') {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: '蜜码不能为空'
              }).show()
            } else {
              this.canLogin = true
              userLogin(this.phone, this.passWord).then(res => {
                this.canLogin = false
                console.log(res)
                this.$router.go(-1);
              })
            }

          }
      }
    }
</script>

<style scoped>

</style>
