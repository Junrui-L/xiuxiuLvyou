<template>
    <div class="safeCenter">
      <div class=" list-item">
        <router-link to="/loginCode" class="item-wrapper clearfix">
          <span class="title">设置登录密码</span>
          <span class="txt fr">

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/tradeCode" class="item-wrapper clearfix">
          <span class="title">设置资金密码</span>
          <span class="txt fr">

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
        </router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "safe-center"
    }
</script>

<style scoped>

</style>
