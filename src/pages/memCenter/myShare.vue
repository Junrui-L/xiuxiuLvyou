<template>

  <div class="myShare">
    <div class="container">
      <img :src="imgPath" alt="">
      <p class="atention">（长按此图片分享给朋友或保存到手机本地）</p>
    </div>
  </div>
</template>

<script>
  import {userShareImg, userLogin} from '../../http/getDate'

  export default {
        name: "myShare",
      data(){
          return {
            // baseUrl: 'http://www.youdingsoft.com',
            imgPath: ''
          }
      },
      mounted(){
        this.getImg();
      },
        methods: {
          getImg(){
            userShareImg().then(res=> {
              console.log(res)
              this.imgPath = res.data.userpath;
            })
          }
      }
    }
</script>

<style >



</style>
