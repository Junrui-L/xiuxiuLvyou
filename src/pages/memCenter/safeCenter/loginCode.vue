<template>
  <div class="loginCode">
    <HeadTop go-back='true' :headBg="true">
      <div slot="select-title" class="select-title" >

        <span class="title_head black" >登陆密码</span>

      </div>
      <div slot="message" class="addto fr" @click="updateMoneyCode"><button class="commit">保存</button></div>
    </HeadTop>

    <div class="input-wrapper readonly">
      手机号码：<span class="input-txt phone readonly"> {{ userPhone | plusXing(3, 4) }}</span>
      <!--<input type="tel" id="phone" v-model="userPhone | plusXing(3, 4)" readonly class="input-txt phone readonly"  maxlength="11" placeholder="请输入手机号码" name="phone">-->
    </div>
    <div class="input-wrapper verify">
      <input type="tel" id="verifyCode" v-model="verifyCode" class="input-txt verify-code" maxlength="4" placeholder="请输入验证码"
             name="verifyCode"/>
      <button class="getCode" @click="sendCode" :disabled="isDisabled">{{ btnText }}</button>
    </div>
    <div class="input-wrapper opwd">
      <input type="password" v-model="tradePwd" class="input-txt" maxlength="8" placeholder="请输入登陆密码"
             name="loginPwd">
    </div>
    <div class="input-wrapper">
      <input type="password" v-model="multradePwd" class="input-txt" maxlength="8" placeholder="再次输入登陆密码"
             name="tradePwd">
    </div>
    <p class="tips">注：登录密码应为6-12位数字+字母组成</p>
  </div>
</template>

<script>

      import {userPerDetail, getVeryCode, updatePassword} from '../../../http/getDate'
      import HeadTop from '../../../components/HeadTop.vue'
      export default {
        name: 'member-info',
        data() {
          return {
            userPhone: '',
            isDisabled: false,
            btnText: '获取验证码',
            verifyCode: '',
            tradePwd: '',
            multradePwd: '',
            userInfo: {}
          }
        },
        components: {
          HeadTop
        },
        mounted() {
          userPerDetail().then(res => {
            console.log(res)
            this.userPhone = res.visitor.mobile;
          })
        },
        methods: {
          updateMoneyCode(){

            if(this.verifyCode == ''){
              this.$createToast({
                txt: '请输入验证码',
                type: 'error',
                mask: false,
                time: 1000
              }).show();
            } else if(this.tradePwd == ''){
              this.$createToast({
                txt: '请输入新密码',
                type: 'error',
                mask: false,
                time: 1000
              }).show();
            } else if( this.tradePwd != this.multradePwd) {
              this.$createToast({
                txt: '两次密码输入不一致',
                type: 'correct',
                mask: false,
                time: 1000
              }).show();
            }else {
              updatePassword(this.verifyCode, this.tradePwd, 'loginPassword').then(res => {
                console.log(res);
                if(res.msg) {
                  this.$createDialog({
                    type: 'alert',
                    title: '温馨提示',
                    content: res.msg
                  }).show()
                } else {
                  this.$router.push({path: '/memberInfo'})
                }
              })
            }

          },
          sendCode(){
            //发送验证码60s倒计时
            let setf = this;
            let countdown = 60;
            //获取验证码
            getVeryCode(this.userPhone).then(res => {
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
                  content: res.data
                }).show()
              }
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

        }
    }
</script>


