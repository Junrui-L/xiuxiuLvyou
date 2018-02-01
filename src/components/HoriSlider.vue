/*Created by soft on 2018/1/1 */

<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass, getWidth} from '../config/myUtils'

    export default{
        data() {
            return {
            }
        },
        props:{
            spaceBetween: {
                type: Number,
                default: 15
            },
        },
        mounted() {
           this.init();
        },
        methods:{
          init() {
            this._setSliderWidth()
            setTimeout(() => {
              // 在初始化slider前初始化dot
//                this._initDots()
              this._initSlider()
            }, 20)
            // 监听窗口大小改变时间
            window.addEventListener('resize', () => {
              if (!this.slider) {
                return
              }
              this._setSliderWidth(true)
              this.slider.refresh()
            })
          },
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children
                let width = 0
                // slider 可见宽度
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    let childWidth = child.offsetWidth;
                    width += childWidth + this.spaceBetween
                }

                this.$refs.sliderGroup.style.width = width  + 'px';

            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    preventDefault: false,
//                    snapThreshold: 0.3,
//                    snapSpeed: 400,
//                    eventPassthrough: 'horizontal'
                    // click:true
                })
            }
        },
        // 生命周期destroyed销毁清除定时器，有利于内存释放
    }
</script>
<style lang="scss">

</style>

