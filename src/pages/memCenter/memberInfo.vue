<template>
  <div class="memberInfo">
      <div class="header">
        <div class="service-area clearfix">
          <span class="title fl">个人头像</span>
          <div class="img-wrapper fr">
            <img :src="userInfo.headimgurl" alt="">
          </div>
        </div>
        <div class="head-item ">
          <div class="item-wrapper clearfix" >
            <span class="title">昵称</span>
            <span class="txt fr">
              {{userInfo.nickname}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </div>
      </div>
      <ul class="main">
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix" @click="showCancel = true">
            <span class="title">真实姓名</span>
            <span class="txt fr">
            {{ userInfo.userName || '--'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix" @click="setSex">
            <span class="title" >个人性别</span>
            <span class="txt fr">
              <template v-if="userInfo.sex == 1">男</template>
              <template v-if="userInfo.sex == 2">女</template>
              <template v-if="userInfo.sex == 0">未知</template>
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix" @click="showDatePicker">
            <span class="title">出生日期</span>
            <span class="txt fr">
            {{userInfo.brithDate || '未设置'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix">
            <span class="title">身份认证</span>
            <span class="txt fr">
              <template v-if="userInfo.status == 0">未验证</template>
              <template v-if="userInfo.status == 1">审核中</template>
              <template v-if="userInfo.status == 2">已认证</template>

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <router-link to="/setContact" class="item-wrapper clearfix">
            <span class="title">手机号码</span>
            <span class="txt fr">
            {{userInfo.mobile || '未设置'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </router-link>
        </li>
        <li class="head-item clearfix" @click="toSetBankCard">
          <div class="item-wrapper clearfix">
            <span class="title">银行卡设置</span>
            <span class="txt fr">

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix" @click="toSafeCenter">
          <div class="item-wrapper clearfix">
            <span class="title">安全中心</span>
            <span class="txt fr">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <router-link to="/myQrcode" class="item-wrapper clearfix">
            <span class="title">推广二维码</span>
            <span class="txt fr">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </router-link>
        </li>
      </ul>
    <CancelBox v-if="showCancel" confirmText="请输入您的姓名" :showCancelBox = "showCancel" @closeTip = 'shows' @confirmCancel="updateUsername"></CancelBox>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {userPerDetail, changePersonal , ConfigWx, getImgPath ,userLogin} from '../../http/getDate'
    import DatePicker from '../../components/date-picker'
    import {dateFmt} from '../../config/myUtils'
    import CancelBox from '../../components/cancelBox.vue'
    createAPI(Vue, DatePicker, ['select', 'cancel'], false)
    export default {
        name: 'memberInfo',
        data() {
          return {
            userInfo: {},
            configMap: '', //微信sdk初始化参数
            images: [],   //图片
            mediaId: [],
            serverSrc: [],
            showCancel: false
          }
        },
        components: {
          CancelBox
        },
        mounted() {
          this.getDate();
          this.datePicker = this.$createDatePicker({
            title: '出生日期',
            min: [1950, 1, 1],
            max: [2020, 12, 31],
            value: [1990, 1, 1],
            columnCount: 3,
            onSelect: this.selecTimetHandle,
            onCancel: this.cancelHandle
          })
        },
        methods: {
          getDate(){
            userPerDetail().then(res => {
              console.log(res)
              this.userInfo = res.visitor;
            });
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
              wx.chooseImage({
                count: 1, // 默认9
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
          toSetBankCard(){
            if(this.userInfo.mobile == '') {
              this.$createToast({
                txt: '请先设置手机号码',
                type: 'error',
                mask: false,
                time: 1500
              }).show();
              //设置手机号先
              setTimeout(() => {
                this.$router.push({path: '/setContact'})
              }, 1000)

            }else {
              this.$router.push({path: '/bankCardList'})
            }
          },
          toSafeCenter(){
            if(this.userInfo.mobile == '') {
              this.$createToast({
                txt: '请先设置手机号码',
                type: 'error',
                mask: false,
                time: 1500
              }).show();
              //设置手机号先
              setTimeout(() => {
                this.$router.push({path: '/setContact'})
              }, 1000)
            }else {
              this.$router.push({path: '/safeCenter'})
            }
          },
          shows(msg){
            this.showCancel = false;
          },
          updateUsername(name){
              console.log(name)
            changePersonal('userName' , name).then(res => {
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
                  txt: '设置成功',
                  type: 'correct',
                  mask: true,
                  time: 2000
                }).show();
                this.showCancel = false;
                this.getDate();
              }
            })
          },
          setSex() {
            this.$createActionSheet({
              title: '设置性别',
              // active: 0,
              data: [
                {
                  content: '女',
                  sex: 2
                },
                {
                  content: '男',
                  sex: 1
                }
              ],
              onSelect: (item, index) => {
                console.log(item.sex) //设置性别
                changePersonal('sex' , item.sex).then(res => {
                  if(res.msg){
                    this.$createDialog({
                      type: 'alert',
                      title: '温馨提示',
                      content: res.msg,
                      showClose: true
                    }).show()
                  } else {
                    this.$createToast({
                      txt: '设置成功',
                      type: 'correct',
                      mask: true,
                      time: 2000
                    }).show();
                    this.getDate();
                  }
                })
              },
              onCancel: () => {
                console.log('取消了')
              }
            }).show()
          },
          showDatePicker() {
            this.datePicker.show();
          },
          selecTimetHandle(v){
            let birth = dateFmt(v, 'yyyy-M-d')
            console.log(birth)
            changePersonal('brithDate', birth).then(res => {
              if(res.msg){
                this.$createDialog({
                  type: 'alert',
                  title: '温馨提示',
                  content: res.msg,
                  showClose: true
                }).show()
              } else {
                this.$createToast({
                  txt: '设置成功',
                  type: 'correct',
                  mask: true,
                  time: 2000
                }).show();
                this.getDate();
              }
            })
          }
        }
    }
</script>
