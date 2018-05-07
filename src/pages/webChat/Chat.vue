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
      <div class="no-msg" >没有更多消息啦~</div>
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
            <input type="text" placeholder="输入消息" class="input-txt fl">
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
  export default {
    name: "chat-list"
  }
</script>

<style scoped>

</style>
