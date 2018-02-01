/*Created by soft on 2018/1/1 */

<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass} from '../config/myUtils'

    export default {
        data() {
            return {
                dots: [],
                currentPageIndex: 0,
                timer: null
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()
            }, 20)

            if(this.autoPlay) {
                this._play()
            }


        },
        methods: {
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _setSliderWidth() {
                this.children = this.$refs.sliderGroup.children
                //
                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i=0; i<this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                //
                if(this.loop) {
                    width += 2 * sliderWidth
                }
                console.log(width)
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
//                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    },
                    preventDefault: false,
                    click: true
                })

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX ;
                    // console.log("currentPageIndex:" + this.currentPageIndex)

                    if (this.loop) {
                        pageIndex -= 1
                    }

                  this.currentPageIndex = pageIndex;
                  // console.log("currentPageIndex:" + this.currentPageIndex)

                  if(this.autoPlay) {

                        clearTimeout(this.timer);
                        this._play()
                    }
                })
            },
            _play() {
                // console.log("currentPageIndex:" + this.currentPageIndex);
                let pageIndex = this.currentPageIndex + 1;

                if (this.loop) {
                    pageIndex += 1
                }

                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval);
            }
        },
        destroyed() {
            clearTimeout(this.timer)  //当组件中用到timer时，在销毁时要清除
        }

    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


