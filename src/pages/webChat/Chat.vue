<template>
  <div class="Chat">
    <div class="chat-header">
      <div class="goback fl" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
          <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
        </svg>
      </div>
      {{receiveNickName}}

    </div>
    <div style="height: 20px;"  class="chat-content" @click="showEmoji = false" :style="{'height': h + 'px'}" id="dialogue_box">
        <div class="no-msg">没有更多消息啦~</div>
        <div class="x-message-group" :class="item.from == from_username ? 'x-message-right' : ''"
             v-for="item in chatHistory">
          <div class="x-message-user">{{item.nickName}}</div>
          <div class="x-message-content">
            <!--<template v-if="item.from != from_username">-->
              <!--<img class="headImg" src="http://www.youdingsoft.com/userfile/headsmall/20180524115017921140.jpg" alt="" />-->
            <!--</template>-->
            <p class="x-message-text" v-html="handleMsg(item.sourceMsg)"></p>
            <!--<template v-if="item.from == from_username">-->
              <!--<img class="headImg" :src="headimgurl" alt="" />-->
            <!--</template>-->
          </div>
          <div class="x-message-time">
            {{item.time}}
            <span class="x-message-status"></span>
          </div>
        </div>

    </div>
    <div class="chat-footer">
      <div class="chat-ops">
        <div class="chat-ops-icon ib">
          <div class="ib">
            <a class="adropdown-trigger" @click="showEmoji = !showEmoji">
              <i class="iconfont icon-biaoqing2" style="color: rgba(0, 0, 0, 0.65);"></i>
              <ul class="faces-ul" v-show="showEmoji">
                <li v-for="(value,key) in emojiMap" :key="key" @click="clickFace(key)" class="webim-emoji-item">
                  <img :src="value" alt="emoj"/>
                </li>
              </ul>
            </a>
          </div>
        </div>
        <label class="chat-ops-icon ib" @click="clearChat">
          <i class="iconfont icon-shanchu"></i>
        </label>
      </div>
      <div class="chat-send">
        <span class="input-group-wrapper">
          <span class="input-wrapper" @click="showEmoji = false">
            <input type="text" placeholder="输入消息" id="inputcontent" @keyup.enter="sendTextMsg()" class="input-txt fl">
            <span class="input-group-addon" @click="sendTextMsg">
               <i class="iconfont icon-send" style="cursor: pointer;"></i>
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { userPersonal } from '../../http/getDate'
  import ee_1 from '../../assets/img/faces/ee_1.png'
  import ee_2 from '../../assets/img/faces/ee_2.png'
  import ee_3 from '../../assets/img/faces/ee_3.png'
  import ee_4 from '../../assets/img/faces/ee_4.png'
  import ee_5 from '../../assets/img/faces/ee_5.png'
  import ee_6 from '../../assets/img/faces/ee_6.png'
  import ee_7 from '../../assets/img/faces/ee_7.png'
  import ee_8 from '../../assets/img/faces/ee_8.png'
  import ee_9 from '../../assets/img/faces/ee_9.png'
  import ee_10 from '../../assets/img/faces/ee_10.png'
  import ee_11 from '../../assets/img/faces/ee_11.png'
  import ee_12 from '../../assets/img/faces/ee_12.png'
  import ee_13 from '../../assets/img/faces/ee_13.png'
  import ee_14 from '../../assets/img/faces/ee_14.png'
  import ee_15 from '../../assets/img/faces/ee_15.png'
  import ee_16 from '../../assets/img/faces/ee_16.png'
  import ee_17 from '../../assets/img/faces/ee_17.png'
  import ee_18 from '../../assets/img/faces/ee_18.png'
  import ee_19 from '../../assets/img/faces/ee_19.png'
  import ee_20 from '../../assets/img/faces/ee_20.png'
  import ee_21 from '../../assets/img/faces/ee_21.png'
  import ee_22 from '../../assets/img/faces/ee_22.png'
  import ee_23 from '../../assets/img/faces/ee_23.png'
  import ee_24 from '../../assets/img/faces/ee_24.png'
  import ee_25 from '../../assets/img/faces/ee_25.png'
  import ee_26 from '../../assets/img/faces/ee_26.png'
  import ee_27 from '../../assets/img/faces/ee_27.png'
  import ee_28 from '../../assets/img/faces/ee_28.png'
  import ee_29 from '../../assets/img/faces/ee_29.png'
  import ee_30 from '../../assets/img/faces/ee_30.png'
  import ee_31 from '../../assets/img/faces/ee_31.png'
  import ee_32 from '../../assets/img/faces/ee_32.png'
  import ee_33 from '../../assets/img/faces/ee_33.png'
  import ee_34 from '../../assets/img/faces/ee_34.png'
  import ee_35 from '../../assets/img/faces/ee_35.png'

  export default {
    name: 'chat-list',
    data () {
      return {
        h:'',
        from_username: '', // url中的发起方用户名
        to_username: '', // url中的接收方用户名
        conn: {}, // 与环信的通信长连接
        chatHistory: [
        ], // 聊天记录数组
        currentUserpwd: 'xiuxiutrip123456', // 当前用户环信密码
        accence_token: '', // 权限token
        emojiMap: {
          '[):]': ee_1,
          '[:D]': ee_2,
          '[;)]': ee_3,
          '[:-o]': ee_4,
          '[:p]': ee_5,
          '[(H)]': ee_6,
          '[:@]': ee_7,
          '[:s]': ee_8,
          '[:$]': ee_9,
          '[:(]': ee_10,
          '[:\'(]': ee_11,
          '[:|]': ee_12,
          '[(a)]': ee_13,
          '[8o|]': ee_14,
          '[8-|]': ee_15,
          '[+o(]': ee_16,
          '[<o)]': ee_17,
          '[|-)]': ee_18,
          '[*-)]': ee_19,
          '[:-#]': ee_20,
          '[:-*]': ee_21,
          '[^o)]': ee_22,
          '[8-)]': ee_23,
          '[(|)]': ee_24,
          '[(u)]': ee_25,
          '[(S)]': ee_26,
          '[(*)]': ee_27,
          '[(#)]': ee_28,
          '[(R)]': ee_29,
          '[({)]': ee_30,
          '[(})]': ee_31,
          '[(k)]': ee_32,
          '[(F)]': ee_33,
          '[(W)]': ee_34,
          '[(D)]': ee_35
        }, // 表情集合
        showEmoji: false, // 是否显示表情
        myNickName: '', // 发送人昵称
        receiveNickName: '', //接收人昵称
        headimgurl:'' // 发送人头像
      }
    },
    computed: {
      getMyNickName () {
        return this.myNickName
      }
    },
    created(){
      userPersonal().then(res => {
        this.headimgurl = res.headimgurl
      })
    },
    mounted () {
      var div = document.getElementById('dialogue_box');
      this.h = div.offsetHeight
      // URL格式 http://localhost:8082/#/chatList/me/?from_username=1&to_username=2
      document.querySelector('#inputcontent').focus()
      let urlParams = this.getParamsFromUrl()
      if (urlParams.from_username && urlParams.to_username) {
        this.from_username = urlParams.from_username
        this.to_username = urlParams.to_username
        this.receiveNickName = decodeURI(urlParams.to_nickname)
        this.getChatListDataFromLocal()
        this.loginEasemob()
      } else {
        this.$createDialog({
          type: 'alert',
          title: '温馨提示',
          content: '路径错误,缺少用户名'
        }).show()
      }


    },
    watch: {
      chatHistory(){
        this.$nextTick(() =>{
          let div = this.$el.querySelector("#dialogue_box");
          div.scrollTop = div.scrollHeight;
        })
      }
    },
    methods: {
      // 登录环信
      loginEasemob () {
        this.$imoption.user = this.from_username
        this.$imoption.pwd = this.currentUserpwd
        this.$imoption.success = (res) => {
          this.accence_token = res.access_token
          this.myNickName = res.user.nickname
          this.addListen()
        }
        this.$imconn.open(this.$imoption)
      },
      addListen () {
        var that = this;
        this.$imconn.listen({
          onOpened: function (message) {
            console.log('用户已上线')
            that.sendCmdMsg();
          },
          onClosed: function (message) {
            console.log('用户已下线')
          },
          onEmojiMessage: this.receiveEmojiMessage,
          onPictureMessage: this.receivePictureMessage,
          onTextMessage: this.receiveTextMsg
        })
      },
      // 从环信服务器获取聊天历史记录
      getChatHistortData () {
        axios.get('http://a1.easemob.com/1138180320146984/testxiuxiu/chatmessages', {
          params: {
            org_name: '1138180320146984',
            app_name: 'testxiuxiu',
            Authorization: `Bearer ${this.accence_token}`
          }
        })
      },
      // 接受文本消息
      // 从localstroage获取聊天历史记录
      getChatListDataFromLocal () {
        var chatData = JSON.parse(localStorage.getItem('chatData'))
        if (chatData) {
          var currentChatData = chatData.chatHistoryData[this.to_username]
          if (currentChatData) {
            this.chatHistory.push(...currentChatData)
          }
        }
      },
      // 接受文本消息
      receiveTextMsg (message) {
        console.log(message.ext)
        // message:{"id":"465540634703299052","type":"chat","from":"1","to":"2","data":"5共和国","ext":{"weichat":{"originType":"webim"}},"sourceMsg":"5共和国","error":false,"errorText":"","errorCode":"","time":"2018-05-10T12:55:27.432Z"}
        let sendTimeWZ = message.time ? new Date(message.time) : new Date()
        let sendTime = sendTimeWZ.getMonth() + 1 + '-' + sendTimeWZ.getDate() + ' ' + sendTimeWZ.getHours() + ':' + sendTimeWZ.getMinutes()
        let receiveMessage = {
          from: message.from,
          sourceMsg: message.sourceMsg,
          ext: message.ext,
          time: sendTime,
          nickName: this.receiveNickName
        }
        let to_username = this.to_username
        var chatData = JSON.parse(localStorage.getItem('chatData'))
        if (chatData) {
          chatData.chatHistoryData[to_username].push(receiveMessage)
          localStorage.setItem('chatData', JSON.stringify(chatData))
        } else {
          let chatHistoryData = {}
          chatHistoryData[to_username] = [receiveMessage]
          localStorage.setItem('chatData', JSON.stringify({chatHistoryData}))
        }
        this.chatHistory.push(receiveMessage)
      },
      // 接受表情消息
      receiveEmojiMessage (message) {
        this.chatHistory.push(message)
      },
      // 接受图片消息
      receivePictureMessage (message) {
        console.log(message);
        this.chatHistory.push(message)
      },
      //发送命令消息
      sendCmdMsg() {
        // var id = conn.getUniqueId();            //生成本地消息id
        // var msg = new WebIM.message('cmd', id); //创建命令消息
        //
        // msg.set({
        //   msg: 'msg',
        //   to: 'username',                       //接收消息对象
        //   action : 'action'  ,                   //用户自定义，cmd消息必填
        //   ext :{'extmsg':'extends messages'} ,  //用户自扩展的消息内容（群聊用法相同）
        //   success: function ( id，serverMsgId ) {}//消息发送成功回调
        console.log('发送命令消息-->')
        var id = this.$imconn.getUniqueId()
        var msg = new WebIM.message('cmd', id) //创建命令消息
        let myNickName = this.getMyNickName
        let headimgurl = this.headimgurl
        msg.set({
          msg: 'msg',
          action: 'action',                     //用户自定义，cmd消息必填
          ext: {'nickName': myNickName,'headimgurl': headimgurl},    //用户自扩展的消息内容（群聊用法相同）
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
            console.log('命令消息发出成功'+ id)
          },
          fail: function (e) {
            console.log('Send private text error')
          }
        })
        msg.body.chatType = 'singleChat'
        this.$imconn.send(msg.body)

      },
      // 发送文本消息
      sendTextMsg () {
        var text = document.querySelector('#inputcontent').value
        if (!text) {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '发送内容不能为空'
          }).show()
          return
        }
        var id = this.$imconn.getUniqueId()
        var msg = new WebIM.message('txt', id)
        let fromUserName = this.from_username
        let to_username = this.to_username
        let _thisChatHistory = this.chatHistory
        let sendTime = this.getNowTime()
        let myNickName = this.getMyNickName
        let headimgurl = this.headimgurl
        msg.set({
          msg: text,
          action: 'action',                     //用户自定义，cmd消息必填
          ext: {'nickName': myNickName,'headimgurl': headimgurl},    //用户自扩展的消息内容（群聊用法相同）
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
            document.querySelector('#inputcontent').value = ''
            let sendMessage = {
              from: fromUserName,
              sourceMsg: text,
              time: sendTime,
              nickName: myNickName
            }
            var chatData = JSON.parse(localStorage.getItem('chatData'))
            if (chatData) {
              if (chatData.chatHistoryData[to_username]) {
                chatData.chatHistoryData[to_username].push(sendMessage)
              } else {
                chatData.chatHistoryData[to_username] = [sendMessage]
              }
              localStorage.setItem('chatData', JSON.stringify(chatData))
            } else {
              let chatHistoryData = {}
              chatHistoryData[to_username] = [sendMessage]
              localStorage.setItem('chatData', JSON.stringify({chatHistoryData}))
            }
            _thisChatHistory.push(sendMessage)
          },
          fail: function (e) {
            console.log('Send private text error')
          }
        })
        msg.body.chatType = 'singleChat'
        this.$imconn.send(msg.body)
      },
      getNowTime () {
        let now = new Date()
        return now.getMonth() + 1 + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
      },
      // 获取url中的当前用户环信账号和聊天对象账号
      getParamsFromUrl () {
        var urlhash = location.hash //获取url中"?"符后的字串
        var theRequest = {}
        if (urlhash.indexOf('?') != -1) {
          var index = urlhash.indexOf('?') + parseInt(1)
          var str = urlhash.substr(index)
          var strArr = str.split('&')
          for (var i = 0; i < strArr.length; i++) {
            let arr = strArr[i].split('=')
            theRequest[arr[0]] = arr[1]
          }
        }
        return theRequest
      },
      //清空当前聊天记录
      clearChat () {
        localStorage.removeItem('chatData')
        this.chatHistory = []
      },
      // 选中一个表情 直接发送 不经过输入框直接发送
      clickFace (key) {
        var id = this.$imconn.getUniqueId()
        var msg = new WebIM.message('txt', id)
        let fromUserName = this.from_username
        let to_username = this.to_username
        let _thisChatHistory = this.chatHistory
        let sendTime = this.getNowTime()
        let myNickName = this.getMyNickName
        msg.set({
          msg: key,
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
            let sendMessage = {
              from: fromUserName,
              sourceMsg: key,
              time: sendTime,
              nickName: myNickName
            }
            var chatData = JSON.parse(localStorage.getItem('chatData'))
            if (chatData) {
              if (chatData.chatHistoryData[to_username]) {
                chatData.chatHistoryData[to_username].push(sendMessage)
              } else {
                chatData.chatHistoryData[to_username] = [sendMessage]
              }
              localStorage.setItem('chatData', JSON.stringify(chatData))
            } else {
              let chatHistoryData = {}
              chatHistoryData[to_username] = [sendMessage]
              localStorage.setItem('chatData', JSON.stringify({chatHistoryData}))
            }
            _thisChatHistory.push(sendMessage)
          },
          fail: function (e) {
            console.log('Send emoji text error')
          }
        })
        msg.body.chatType = 'singleChat'
        this.$imconn.send(msg.body)
      },
      hideEmoji () {
        this.showEmoji = false
      },
      handleMsg (msg) {
        if (this.emojiMap[msg]) {
          return `<img src="${this.emojiMap[msg]}"/>`
        } else {
          return msg
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
