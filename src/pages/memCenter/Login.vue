<template>
    <div class="login">
      <div class="input-area">
        <div class="input-wrapper">
          <input type="tel" id="phone" class="input-txt phone" maxlength="18" placeholder="请输入登录蜜码"
                 name="loginPwd">
        </div>
        <div class="input-wrapper">
          <input type="password" id="tradePwd" class="input-txt pwd" maxlength="6" placeholder="请输入交易蜜码"
                 name="tradePwd">
        </div>
        <button class="to-register active" id="toRegister">登录</button>
      </div>
    </div>

</template>

<script>
  import {userLogin} from '../../http/getDate'

  export default {
        name: "login",
      data() {
          return {
            phone: '',
            passWord: ''
          }
      },
      mounted(){
          this.toLogin();
      },
      methods: {
          toLogin() {
            userLogin(this.phone, this.passWord).then(res => {
              console.log(res)
            })
          }
      }
    }
</script>

<style scoped>

</style>
