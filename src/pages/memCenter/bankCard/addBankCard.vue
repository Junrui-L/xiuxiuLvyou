<template>
  <div class="addBankCard">
    <HeadTop go-back='true' :headBg="true">
      <div slot="select-title" class="select-title" >

        <span class="title_head black" >新增银行卡</span>

      </div>
      <div slot="message" class="addto fr" @click=""><button class="commit">保存</button></div>
    </HeadTop>
    <p class="b-tip">以下信息为必填</p>
    <div class="input-wrapper clearfix">
      <span class="label fl">持卡人</span>
      <input class="bankcard fl"  maxlength="12" type="text" pattern="/n" v-model="bankCard" placeholder="请输入持卡人姓名"/>
    </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">卡 号</span>
        <input class="bankcard fl"  maxlength="18" type="tel" pattern="/n" v-model="bankCard" placeholder="请输入银行卡号"/>
      </div>
      <div class="input-wrapper clearfix">
        <span class="label fl">开户行</span>
        <input class="deposit-num fl"  maxlength="8" type="number" v-model="depositNum" placeholder="请输入开户行"/>
      </div>

      <div class="input-wrapper clearfix">
        <span class="label fl">资金密码</span>
        <input class="trade-code fl"  maxlength="6" type="tel" v-model="tradeCode" placeholder="请输入资金密码"/>
      </div>

  </div>
</template>

<script>
  import HeadTop from '../../../components/HeadTop.vue'

  export default {
        name: "addBankcard",
    data() {
          return{

          }
     },
    components: {
      HeadTop
    }

    }
</script>

<style scoped>

</style>
