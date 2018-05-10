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
        <!--<li class="chat-item" @click = "$router.push({path: '/chatList/33', query: {username: 1}})">-->
          <!--<div class="nav-text">-->
            <!--<div>wk19991024<span-->
              <!--class="ant-badge ant-badge-not-a-wrapper">33</span></div>-->
            <!--<div class="nav-text-desc">-->
                    <!--sss-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="nav-op">05-06 01:14 AM</div>-->
        <!--</li>-->
        <li class="chat-item" @click = "$router.push({path: '/chatList/me', query: {from_username: 1,to_username:2}})">
          <div class="nav-text">
            <div>张三丰<span
              class="ant-badge ant-badge-not-a-wrapper">33</span></div>
            <div class="nav-text-desc">
              sss
            </div>
          </div>
          <div class="nav-op">05-06 01:14 AM</div>
        </li>
        <li class="chat-item" @click = "$router.push({path: '/chatList/me', query: {from_username: 2,to_username:1}})">
          <div class="nav-text">
            <div>李小龙<span
              class="ant-badge ant-badge-not-a-wrapper">33</span></div>
            <div class="nav-text-desc">
            </div>
          </div>
          <div class="nav-op">05-06 01:14 PM</div>
        </li>

      </ul>
      <ul class="chats-list records-list" v-if="currentTab == 'records'">
        <li class="chat-item">
          <div class="nav-text">
            wk19991024
          </div>
        </li>
        <li class="chat-item">
          <div class="nav-text">
            张三丰
          </div>
        </li>
        <li class="chat-item">
          <div class="nav-text">
            李小龙
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
    name: "chatlist",
    data() {
      return {
        currentTab: 'chats'
      }
    },
    mounted() {

    },
    methods: {
      changeType(type) {
        //返回消息列表
        this.$router.push({path: '/chatList'})
        this.currentTab = type;
        if (type == 'chats') {
          //TODO: 聊天列表
        } else {
          //联系人列表
        }
      }
    }
  }
</script>

<style scoped>

</style>
