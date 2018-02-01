<template>
  <div class="slide_box">
    <div class="slider" ref="slider">
      <div class="slide-group" ref='slideGroup'>
        <slot>
        </slot>
      </div>
      <div class="dots">
        <span class="dot" :class="{dotActive: (currentPageIndex) === index }" v-for="(item, index) in dots"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      loop: {
        type: Boolean,
        default: true,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      interval: {
        type: Number,
        default: 2000
      }
    },
    data() {
      return {
        dots:[],
        currentPageIndex:0
      }
    },
    mounted() {
      this.setSliderWidth(); //设置轮播图的宽度
      this.init();
      if(this.autoPlay) {
        this.play();
      }

    },
    methods: {
      setSliderWidth() {
        this.children = this.$refs.slideGroup.children;
        this.dots = new Array(this.children.length)
        let width =0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for(let i = 0; i < this.children.length; i ++){
          width += sliderWidth;
        }
        if(this.loop){
          width += 2*sliderWidth;
        }
        this.$refs.slideGroup.style.width = width + 'px';
      },
      init(){
        var vm = this;
        // 实例化scroll
        this.scroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,   //关闭或者打开惯性运动的执行
          snap: true,       //隔断（翻页）
          snapLoop: this.loop,   //无限滚动
          snapThreshold: 0,
          snapSpeed: 400,   //滑动的时间
        })
        this.scroll.on('scrollEnd', () => {
          let pageIndex = this.scroll.getCurrentPage().pageX
          if(this.loop){
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;
          if(vm.autoPlay) {
            vm.play();
          }
        })
        this.scroll.on('beforeScrollStart', () => {
          if(vm.autoPlay){
            clearTimeout(vm.timer);
          }
        })

      },
      play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        var vm = this;
        this.timer = setTimeout(() => {
          vm.scroll.goToPage(pageIndex, 0 , 400);//跳转到的页数 初始化页数 滑动总时间
        },vm.interval)
      }
    }
  }
</script>
