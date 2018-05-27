<template>
    <div class="identification">
      <HeadTop go-back='true' :headBg="true">
        <div slot="select-title" class="select-title" >

          <span class="title_head black" >身份认证</span>

        </div>
        <div slot="message" class="save fr" @click="pushIndentify"><button class="commit">保存</button></div>
      </HeadTop>

      <div class="item-wrapper clearfix">
        <span class="title fl">身份证号</span>
        <span class="txt fl">
          <input v-model="idcard" type="text" class="idCard" maxlength="18" id="commm" placeholder="请填写身份证号码" />
        </span>
      </div>
      <div class="container">
        <div class="tit">身份证（正面）</div>
        <div class="img-wrap clearfix">

          <div class="upload fl" v-for="(img, index) in serverSrc" :key="index">
            <img :src="basePath + img" alt=""  />
            <i class="close" @click="removeImg(index)"></i>
          </div>
          <div class="upload fl" v-show="images.length < 1">
            <img src="../../assets/img/upimg.png" alt=""  @click="addImg" />
          </div>

        </div>

      </div>
      <div class="item-wrapper clearfix">
        <span class="title">状态</span>
        <span class="txt fr">
          <template v-if="userInfo.status == 0">未验证</template>
          <template v-if="userInfo.status == 1">审核中</template>
          <template v-if="userInfo.status == 2">已认证</template>
        </span>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {userPerDetail, ConfigWx, getImgPath, setCardId } from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
    export default {
        name: "identification",
      data(){
          return {
            userInfo: {},
            idcard: '',
            images: [],
            maxSize: 1,
            mediaId: [],
            serverSrc: [],
          }
      },
      computed: {
        ...mapState([
          'basePath','userInfo', 'baseOrder'
        ])
      },
      components: {
          HeadTop
      },
      mounted(){
        this.getDate();
        this.configWx();
      },
      methods: {
        getDate(){
          userPerDetail().then(res => {
            console.log(res)
            this.userInfo = res.visitor;
          });
        },
        pushIndentify(){
          console.log('保存认证信息');

          if(this.idcard == '') {
            this.$createToast({
              txt: '请填写身份证号码',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return false
          } else if(this.serverSrc.length === 0) {
            this.$createToast({
              txt: '请填上传身份证正面图',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return false
          }else if(this.idcard.length < 18) {
            this.$createToast({
              txt: '身份证号填写不正确',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
            return false
          }
          setCardId({
            cardId: this.idcard,
            cardImg: this.serverSrc[0]
          }).then(res => {
            console.log(res)
            if(res.msg){
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: res.msg,
                showClose: true
              }).show()
              this.showCancel = false;
            } else {
              this.$createToast({
                txt: '提交成功，请等待审核',
                type: 'correct',
                mask: true,
                time: 2000
              }).show();

              setTimeout(() => {
                this.$router.replace({path: '/memberInfo'})
              }, 1000)
            }

          })
        },
        configWx(){
          let signUrl = location.href;

          // signUrl = encodeURIComponent(signUrl)
          console.log(`要签名的url ${signUrl}`)
          ConfigWx(signUrl).then(res => {
            console.log('===》签名基本参数返回《====')
            console.log(res);
            this.configMap = res.configMap;
            wx.config({
              debug: false,
              appId: res.configMap.appid,
              timestamp: res.configMap.timestamp,
              nonceStr: res.configMap.nonceStr, //随机串
              signature: res.configMap.signature ,//微信签名
              jsApiList: ['chooseImage', 'uploadImage', 'downloadImage']  // 必填，需要使用的JS接口列表，这里与图片相关
            });

          })
        },
        addImg () {
          let that = this;
          wx.ready(function(){
            let currentSize = that.images.length;
            let count = that.maxSize;
            wx.chooseImage({
              count: count, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(localIds)
                localIds.forEach(li => {
                  that.images.push(li)
                });
                // this.readImages(currentSize)
                that.wxUploadImg(localIds);
              },
              fail: (err) => {
                console.log(err)
              }
            })

          })

        },
        wxUploadImg(arr){
          let length=arr.length;
          let that = this;
          let i=0
          function upload() {
            wx.uploadImage({
              localId: arr[i],
              success: function (res) {
                i++;
                that.mediaId.push(res.serverId); // 返回图片的服务器端ID
                console.log(res.serverId)
                getImgPath({type: 'image', media_ids: res.serverId}).then(res => {
                  console.warn(res);
                  that.serverSrc.push(res.imgpaths);
                  console.log(that.serverSrc)
                  if (i < length) {
                    upload();
                  }
                })
              },
              fail: function (res) {
                console.log(JSON.stringify(res));
              }
            });
          }
          upload();

        },
        removeImg(index){
          this.serverSrc.splice(index, 1);
          this.images = []
        }
      }
    }
</script>

