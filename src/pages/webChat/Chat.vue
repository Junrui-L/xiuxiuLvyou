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
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            哈哈哈哈
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            好开心啊，是不是啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            好开心啊，是不是啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            好开心啊，是不是啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            好开心啊，是不是啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group">
        <div class="x-message-user">heigukeji</div>
        <div class="x-message-content">
          <p class="x-message-text">
            好开心啊，是不是啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
          <span class="x-message-status"></span>
        </div>
      </div>
      <div class="x-message-group x-message-right">
        <div class="x-message-user"></div>
        <div class="x-message-content">
          <p class="x-message-text">
            好啊
          </p>
        </div>
        <div class="x-message-time">
          05-06 11:35 AM
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
        <label for="clearMessage" class="chat-ops-icon ib">
          <i class="iconfont icon-shanchu"></i>
        </label>
      </div>
      <div class="chat-send">
        <span class="input-group-wrapper">
          <span class="input-wrapper">
            <input type="text" placeholder="输入消息" id="inputcontent" class="input-txt fl">
            <span class="input-group-addon">
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
//  require('@/assets/lib/easemob-sdk/webim.config.js')
//  require('@/assets/lib/easemob-sdk/strophe-1.2.8.js')
//  require('@/assets/lib/easemob-sdk/websdk-1.4.13.js')
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
      // URL格式 http://localhost:8081/#/chatList/?from_username=1&to_username=2
      // this.from_username = this.getQueryString('from_username')
      // this.to_username = this.getQueryString('to_username')
      // this.loginEasemob()
    },
    methods: {
      // 登录环信
      loginEasemob () {
        this.conn = new WebIM.connection({
          isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
          https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
          url: WebIM.config.xmppURL,
          heartBeatWait: WebIM.config.heartBeatWait,
          autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
          autoReconnectInterval: WebIM.config.autoReconnectInterval,
          apiUrl: WebIM.config.apiURL,
          isAutoLogin: true
        })
        this.conn.open({
          apiUrl: WebIM.config.apiURL,
          user: this.from_username,
          pwd: this.currentUserpwd,
          appKey: WebIM.config.appkey,
          success: function (token) { },
          error: function () { }
        })
      },
      // 接受文本消息
      receiveTextMsg () {

      },
      // 发送文本消息
      sendTextMsg () {
        var text = document.querySelector('#inputcontent').value
        var id = conn.getUniqueId()                 // 生成本地消息id
        var msg = new WebIM.message('txt', id)      // 创建文本消息
        msg.set({
          msg: text,                  // 消息内容
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
            this.chatHistory.push({
              msgcontent: text,
              msgtype: 'text',
              createTime: new Date(),
              createUser: this.to_username
            })
            document.querySelector('#inputcontent').value = ''
          },
          fail: function (e) {
            console.log('Send private text error')
          }
        })
        msg.body.chatType = 'singleChat'
        conn.send(msg.body)
      },
      // 获取url中的当前用户环信账号和聊天对象账号
      getParamsFromUrl (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },

    }
  }
</script>

<style scoped>

</style>
