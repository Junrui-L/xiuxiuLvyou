<template>
  <div class="ChatList">
    <div class="header">
      <ul class="menu-horizontal clearfix"
          id="x-header-tab" tabindex="0">
        <li class="menu-item " :class="currentTab == 'chats' && 'item-selected'" @click="changeType('chats')">
          聊天列表
          <i class="iconfont icon-liaotianweixuanzhong" :class="currentTab == 'chats' && 'icon-liaotianxuanzhong1'"></i>
        </li>
        <li class="menu-item" :class="currentTab == 'records' && 'item-selected'" @click="changeType('records')">
          群组
          <i class="iconfont icon-05qunzu" :class="currentTab == 'records' && 'icon-05qunzufill'"></i>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <ul class="chats-list" v-if="currentTab == 'chats'">

        <li class="chat-item" v-for="item in chatList"
            @click="$router.push({path: '/chatList/me', query: {from_username: currentUserName,to_username:item.sendMsgUsername}})">
          <div class="nav-text">
            <div>{{item.nickName}}<span class="ant-badge ant-badge-not-a-wrapper">33</span></div>
            <div class="nav-text-desc">{{item.lastmsg}}</div>
          </div>
          <div class="nav-op">{{item.updateTime}}</div>
        </li>

      </ul>
      <ul class="chats-list records-list" v-if="currentTab == 'records'">
        <li class="chat-item" v-for="item in groupList">
          <div class="nav-text">
            {{item.groupName}}
          </div>
        </li>
      </ul>
    </div>
    <transition name="slide-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'chatlist',
    data () {
      return {
        currentTab: 'chats',
        currentUserName: '1', // 当前人的环信账号
        chatList: [{
          sendMsgUsername: '2',
          nickName: '张三丰',
          lastmsg: '我要吃饭',
          updateTime: '05-06 01:14 AM'
        }, {
          sendMsgUsername: '3',
          nickName: '刘备',
          lastmsg: '我不加班',
          updateTime: '05-06 01:14 AM'
        }, {
          sendMsgUsername: '4',
          nickName: '陆逊',
          lastmsg: '得之淡然,失之坦然',
          updateTime: '05-06 01:14 AM'
        }], // 聊天列表
        groupList: [{groupName: '三国群英'}, {groupName: '桃园三结义'}, {groupName: '附近兼职妹'}], // 群组列表
      }
    },
    mounted () {
      let urlParams = this.getParamsFromUrl()
      if (!urlParams.from_username) {
        this.$createDialog({
          type: 'alert',
          title: '温馨提示',
          content: '路径错误,缺少from_username和to_username'
        }).show()
      } else {
        this.currentUserName = urlParams.from_username
      }
    },
    methods: {
      changeType (type) {
        this.currentTab = type
        if (type == 'chats') {
          this.getChatListData()
        } else {
          this.getGroupListData()
        }
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
      // TODO 获取聊天列表
      getChatListData () {
        this.chatList = [{
          sendMsgUsername: '2',
          nickName: '张三丰',
          lastmsg: '我要吃饭',
          updateTime: '05-06 01:14 AM'
        }, {
          sendMsgUsername: '3',
          nickName: '刘备',
          lastmsg: '我不加班',
          updateTime: '05-06 01:14 AM'
        }, {
          sendMsgUsername: '4',
          nickName: '陆逊',
          lastmsg: '得之淡然,失之坦然',
          updateTime: '05-06 01:14 AM'
        }]
      },
      // TODO 获取群组列表
      getGroupListData () {
        this.groupList = [{groupName: '三国群英'}, {groupName: '桃园三结义'}, {groupName: '附近兼职妹'}]
      }
    }
  }
</script>

<style scoped>

</style>
