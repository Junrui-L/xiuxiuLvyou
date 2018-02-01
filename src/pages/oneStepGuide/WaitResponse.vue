<template>
  <div class="wait_response">
    <HeadTop go-back='true'  :headBg="headBg" headTitle="等待应答...">
      <div slot="message" class="message"></div>
    </HeadTop>
    <div class="tip-txt">正在为您通知附近向导...</div>
    <div class="custom-info">
      <div class="info-wrapper">
        <h3 class="info-tit">订单信息</h3>
        <ul class="info-list">
          <li class="info-item">游玩地址 <span class="fr">北京故宫</span></li>
          <li class="info-item">游玩时间 <span class="fr">2017-11-22至2017-11-25</span></li>
          <li class="info-item">游玩人数 <span class="fr">3人</span></li>
          <li class="info-item">向导类型 <span class="fr">专导</span></li>
          <li class="info-item">是否团游 <span class="fr">是（3人）</span></li>
          <li class="info-item">捎话内容 <span class="fr">幽默开朗、女、可带车接幽默开朗、女、可带车接幽默开朗、女、可带车接幽默开朗、女、可带车接</span></li>
        </ul>
      </div>
      <div class="another clearfix">10元 <button class="cancel-btn fr">取消呼叫</button></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import HeadTop from '../../components/HeadTop.vue'
    export default {
        name: "wait-response",
       data() {
          return {
            headBg: true,
          }
       },
      components: {
          HeadTop
      }
    }
</script>

<style>

</style>
