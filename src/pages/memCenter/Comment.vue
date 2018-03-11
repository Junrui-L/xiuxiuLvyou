<template>
  <div class="comment">
    <HeadTop go-back='true' :headBg="true">
      <div slot="select-title" class="select-title" >

        <span class="title_head black" >发表评价</span>

      </div>
      <div slot="message" class="push fr" @click="pushComment"><button class="commit">提交</button></div>
    </HeadTop>
    <div class="container">
      <div class="tit">向导评分</div>
      <div class="stars-wrapper">
        <div class="stars">
          <Rate v-model="rateValue" :max="max"></Rate>
        </div>
        <div class="scores">{{rateValue}}分</div>
      </div>
      <div class="tit">评论内容</div>
      <div class="comment-content">
        <textarea v-model="contentTxt" name="com" maxlength="50" id="commm" placeholder="请输入您的评论内容" cols="30" rows="10"></textarea>
      </div>
      <div class="tit">精彩图片</div>
      <div class="img-wrap clearfix">

        <div class="upload fl" v-for="(img, index) in serverSrc" :key="index">
          <img :src="basePath + img" alt=""  />
          <i class="close" @click="removeImg(index)"></i>
        </div>
        <div class="upload fl" v-show="images.length < 9">
          <img src="../../assets/img/upimg.png" alt=""  @click="addImg" />
        </div>

      </div>
      <div class="tit">评价标签</div>
      <div class="tip-wrapper">
        <!--<check-box :checkText="checkText"  v-model="checkT"></check-box>-->
        <CheckGroup v-model="checkList">
          <CheckBox v-for="(v,i) in tipTxt" :checkText="v" :label='v' :key='i'></CheckBox>
        </CheckGroup>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {addCommnet, ConfigWx, getImgPath } from '../../http/getDate'
  import CheckBox from '../../components/check-box.vue'
  import HeadTop from '../../components/HeadTop.vue'
  import CheckGroup from '../../components/groupCheckBox'
  import Rate from '../../components/Rate'
    export default {
        name: "comment",
        data(){
          return {
            orn: this.$route.query.orderNum,
            configMap: '', //微信sdk初始化参数
            contentTxt: '',
            rateValue:0,
            max:10,
            images: [],
            maxSize: 9,
            mediaId: [],
            serverSrc: [],
            checkList: [],
            tipTxt: [
              '细心周到','热情好客','当地通','幽默开朗','诚信友善'
            ]
          }
        },
      components: {
        HeadTop,
        CheckBox,
        CheckGroup,
        Rate
      },
      computed: {
        ...mapState([
          'basePath','location','userInfo', 'baseOrder'
        ])
      },
      mounted(){
        this.configWx();
      },
      methods: {
        pushComment(){
          if(this.contentTxt == '') {
            this.$createToast({
              txt: '评论不能为空',
              type: 'error',
              mask: true,
              time: 2000
            }).show();
          }
          console.log(`发表评论${this.contentTxt} 标签 ${this.checkList.join(';')}`);
          let coImgs = this.serverSrc.join(';');
          let coTypes = this.checkList.join(';');
          addCommnet({ordernumber:this.orn,
            content: this.contentTxt,
            pjImgs: coImgs,
            types: coTypes,
            score: this.rateValue
          }).then(res => {
            console.log(res);
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: res.msg
              }).show()
            }
            let reg =JSON.stringify(res);
            if( reg == "{}") {
              this.$createToast({
                txt: '评价成功',
                type: 'correct',
                mask: true,
                time: 2000
              }).show();
              setTimeout(() => {
                this.$router.replace({path: '/memberCenter'})
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
            let count = that.maxSize === 0 ? 9 : that.maxSize - currentSize;
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
        }

      }
    }
</script>

