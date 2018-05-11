<template>
  <div class="Chat">
    <div class="chat-header">
      <div class="fl" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
          <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
        </svg>
        张三丰
      </div>
      <div class="fr">
        <span class="chat-action">
            ...
         </span>
      </div>
    </div>
    <div class="chat-content">
      <div class="no-msg">没有更多消息啦~</div>

      <div class="x-message-group" :class="item.from==from_username ? 'x-message-right' : ''"
           v-for="item in chatHistory">
        <div class="x-message-user">{{item.from}}</div>
        <div class="x-message-content">
          <p class="x-message-text">
            {{item.sourceMsg}}
          </p>
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
            <a class="adropdown-trigger" href="#">
              <i class="iconfont icon-biaoqing2" style="color: rgba(0, 0, 0, 0.65);"></i>
            </a>
          </div>
        </div>
        <label for="uploadImage" class="chat-ops-icon ib">
          <i class="iconfont icon-tupian"></i>
          <input type="file" id="uploadImage" class="hide">
        </label>
        <label for="uploadFile" class="chat-ops-icon ib">
          <i class="iconfont icon-wenjian"></i>
          <input type="file" id="uploadFile" class="hide">
        </label>
        <label class="chat-ops-icon ib">
          <i class="iconfont icon-shanchu"></i>
        </label>
      </div>
      <div class="chat-send">
        <span class="input-group-wrapper">
          <span class="input-wrapper">
            <input type="text" placeholder="输入消息" id="inputcontent" @keyup.enter="sendTextMsg()" class="input-txt fl">
            <span class="input-group-addon" @click="sendTextMsg">
               <i class="iconfont icon-send" style="cursor: pointer;">
            </i>
            </span>
          </span>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'chat-list',
    data () {
      return {
        from_username: '', // url中的发起方用户名
        to_username: '', // url中的接收方用户名
        conn: {}, // 与环信的通信长连接
        chatHistory: [], // 聊天记录数组
        currentUserpwd: 'xiuxiutrip123456' // 当前用户环信密码
      }
    },
    mounted () {
      // URL格式 http://localhost:8082/#/chatList/me/?from_username=1&to_username=2
      document.querySelector('#inputcontent').focus()
      let urlParams = this.getParamsFromUrl()
      if (urlParams.from_username && urlParams.to_username) {
        this.from_username = urlParams.from_username
        this.to_username = urlParams.to_username
        this.loginEasemob()
      } else {
        this.$createDialog({
          type: 'alert',
          title: '温馨提示',
          content: '路径错误,缺少from_username和to_username'
        }).show()
      }
    },
    methods: {
      // 登录环信
      loginEasemob () {
        this.$imoption.user = this.from_username
        this.$imoption.pwd = this.currentUserpwd
        this.$imconn.open(this.$imoption)
        this.$imconn.listen({
          onOpened: function (message) {
            console.log('用户已上线')
          },
          onClosed: function (message) {
            console.log('用户已下线')
          },
          onEmojiMessage: this.receiveEmojiMessage,
          onPictureMessage: this.receivePictureMessage,
          onTextMessage: this.receiveTextMsg
        })
      },
      // 接受文本消息
      receiveTextMsg (message) {
        // message:{"id":"465540634703299052","type":"chat","from":"1","to":"2","data":"5共和国","ext":{"weichat":{"originType":"webim"}},"sourceMsg":"5共和国","error":false,"errorText":"","errorCode":"","time":"2018-05-10T12:55:27.432Z"}
        message.time = new Date()
        let receiveMessage = {
          from: message.from,
          sourceMsg: message.sourceMsg,
          time: new Date()
        }
        this.chatHistory.push(receiveMessage)
      },
      // 接受表情消息
      receiveEmojiMessage (message) {
        this.chatHistory.push(message)
      },
      // 接受图片消息
      receivePictureMessage (message) {
        this.chatHistory.push(message)
      },
      // 发送文本消息
      sendTextMsg () {
        var text = document.querySelector('#inputcontent').value
        if (!text) {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先输入发送内容'
          }).show()
          return
        }
        var id = this.$imconn.getUniqueId()
        var msg = new WebIM.message('txt', id)
        let fromUserName = this.from_username
        let _thisChatHistory = this.chatHistory
        msg.set({
          msg: text,
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
            document.querySelector('#inputcontent').value = ''
            let sendMessage = {
              from: fromUserName,
              sourceMsg: text,
              time: new Date()
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

    }
  }
</script>

<style scoped>

</style>
