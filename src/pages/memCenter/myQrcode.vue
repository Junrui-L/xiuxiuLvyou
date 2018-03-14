<template>
    <div class="myQrcode">
      <div class="qr-code">
        <img :src="codeInfo.expandedodeUrl" alt="">
        <p class="tips">长按分享或保存到本地</p>
      </div>
      <ul class="expand-wrap clearfix">
        <li  class="mem-item fl">
          <div>{{codeInfo.subordinateCout || 0}}</div>
          <p>推广人数</p>
        </li>
        <li  class="mem-item fl">
          <div>{{codeInfo.suboTosuboCout || 0}}</div>
          <p>二级推广人数</p>
        </li>
      </ul>
        <div class="expand-list clearfix">
          <router-link to="/expandedList" class="item-wrapper clearfix">
            <span class="title">进入推广列表</span>
            <span class="txt fr">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </router-link>
        </div>


      <h3>推广说明</h3>
      <p>
        {{codeInfo.explain}}
        使用微信扫描二维码进行首次关注，关注者成为您的推广人，您推广的人可以继续进行推广
          ，只要您或您的推广人推广的用户消费或带导收益都将获得返利，返利规则则为您的推广人
        不管消费或收益都可以获得2%返利，而二级推广人推广的用户不管消费还是收益都有1%的收益。
      </p>
    </div>
</template>

<script>

    import {userQrcode, userLogin} from '../../http/getDate'
    export default {
      name: "my-qrcode",
      data() {
        return {
          codeInfo: {}
        }
      },
      mounted() {
        userQrcode().then(res => {
          console.log(res)
          this.codeInfo = res.codeMap;
        })
      },
      methods: {

      }
    }
</script>

<style >

</style>
