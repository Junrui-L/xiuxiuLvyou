<template>
  <div class="tradeCode">
    <div class="input-wrapper">
      <input type="tel" id="phone" class="input-txt phone" maxlength="11" placeholder="请输入手机号码" name="phone">
    </div>
    <div class="input-wrapper verify">
      <input type="tel" id="verifyCode" class="input-txt verify-code" maxlength="4" placeholder="请输入验证码"
             name="verifyCode"/>
      <button class="getCode" id="sendCode">获取验证码</button>
    </div>
    <div class="input-wrapper">
      <input type="password" id="loginPwd" class="input-txt phone" maxlength="18" placeholder="请输入交易蜜码"
             name="loginPwd">
    </div>
    <div class="input-wrapper">
      <input type="password" id="tradePwd" class="input-txt phone" maxlength="6" placeholder="再次输入交易蜜码"
             name="tradePwd">
    </div>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
