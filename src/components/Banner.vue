<!-- Banner图 组件 -->
<template>
  <div class="swiper-container" >
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination" :style="{'text-align':paginationDirection}"></div>
  </div>
</template>
<script>
  import '../assets/lib/swiper/js/swiper.js';
  export default {
    props: {
      effect: {
        type: String,
        default: 'slide'
      },
      loop: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      autoplay: {
        type: Number,
        default: 3000,
      },
      paginationType: {
        type: String,
        default: 'bullets'
      },
      pagination: {
        type: Boolean,
        default: true
      },
      paginationDirection:{
        type:String,
        default:'center'
      }
    },
    mounted() {
      let That = this;
      new Swiper('.swiper-container', {
        //循环
        loop: That.loop,
        //分页器
        pagination: '.swiper-pagination',
        //分页类型
        paginationType: That.paginationType, //fraction,progress,bullets
        //自动播放
        autoplay: That.autoplay,
        //方向
        direction: That.direction,
        //特效
        effect: That.effect, //slide,fade,coverflow,cube
        //用户操作swiper之后，是否禁止autoplay
        observeParents:true,
        autoplayDisableOnInteraction : false,
      })
    }
  }
</script>
<style>
  @import '../assets/lib/swiper/css/swiper.css';
  .swiper-container img{
    width: 100%
  }
  .swiper-pagination-bullet-active {
    background: #fff;
  }
</style>
