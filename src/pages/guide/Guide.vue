/*Created by soft on 2018/1/3 */

<template>
    <div class="Guide">
        <header ref="uiHeader">
            <HeadTop go-back='true' :headBg="headBg">

                  <div slot="select-title" class="select-title" @click="showCityPicker">

                    <span class="cityname ">{{scenicInfo.name}}</span>

                  </div>

            </HeadTop>
            <img  class="head-img" :src="baseUrl + scenicInfo.scenicimg" alt="">

        </header>
        <drop-down :dropDownData="dropDownData" :selectCallback="selectCallback" @proCondion="get"></drop-down>
        <div class="guide-wrapper">
            <ul class="guide-list">
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl" @click="$router.push({name: 'scenicDetail',  query: {scenicspot: 5, accountId: 1}})">
                            <h5 class="guide-name"><span>丁大力</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl"  @click="$router.push({name: 'guideDetail',  params: {id: 33}})">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl">
                            <h5 class="guide-name"><span>刘美玲</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl">
                            <h5 class="guide-name"><span>丁大力</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl">
                            <h5 class="guide-name"><span>丁大力</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl">
                            <h5 class="guide-name"><span>丁大力</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
                <li class="guide">
                    <div class="guide-t clearfix">
                        <div class="guide-img fl">
                            <img src="../../assets/img/tttt.png" alt="">
                        </div>
                        <div class="guide-detail fl">
                            <h5 class="guide-name"><span>丁大力</span></h5>
                            <div class="region-level"><span>服务100人</span> | <span>2种玩法 </span></div>
                            <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
                        </div>
                        <button class="guide-order fl">找Ta预订</button>
                    </div>
                    <div class="guide-txt">
                        <p>
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地
                            这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {guideList, guideDetails} from '../../http/getDate'
    import HeadTop from '../../components/HeadTop.vue'
    import { throttle } from  '../../config/myUtils'
    import DropDown from '../../components/DropDown.vue'


    import { provinceList, cityList, areaList } from '../../config/datajs'
    const cityData = provinceList
    cityData.forEach(province => {
      province.children = cityList[province.value]
      // province.children.forEach(city => {
      //   city.children = areaList[city.value]
      // })
    })
    export default {
        data() {
            return {
                baseUrl: 'http://www.youdingsoft.com',
                headBg: false,
                scenicId: this.$route.query.scenicId,
                city: '北京',
                scenicInfo: '',
                dropDownData: [
                    {
                        name: '导游类型',
                        children: [
                            { name: '景点讲解' ,
                              type: 1
                            },
                          { name: '带游服务' ,
                            type: 2
                          }
                        ]
                    },
                    {
                        name: '年龄',
                        children: [
                            { name: '70后' },
                            { name: '80后' },
                            { name: '90后' },
                            { name: '00后' },
                        ]
                    },
                    {
                        name: '默认排序',
                        children: [
                            { name: '价格' },
                            { name: '今日可团游' },
                            { name: '包接送' },
                            { name: '人气' },
                        ]
                    },

                ]}
        },
        components: {
            HeadTop,
            DropDown,
        },
        mounted() {
          console.log(this.scenicId);
          this.cityPicker = this.$createCascadePicker({
            title: 'City Picker',
            data: cityData,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
          this.getGuideList(4, '', '', '', '', '', '', '');

            // window.addEventListener('scroll', throttle(() => {
            //     console.log('--------------')
            //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            //     let headHeight = this.$refs.uiHeader.offsetHeight;
            //     if( scrollTop > headHeight) {
            //         console.log(headHeight)
            //         this.headBg = true;
            //     } else {
            //         this.headBg = false;
            //     }
            // },150))

        },
        methods: {
          showCityPicker() {
            this.cityPicker.show()
          },
          selectHandle(selectedVal, selectedIndex, selectedText) {
            // this.$createDialog({
            //   type: 'warn',
            //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
            //   icon: 'cubeic-alert'
            // }).show()

            // this.city = selectedText[1];
            // this.cityValue = selectedVal[1];
            // this.getSpotsList(this.cityValue);

          },
          cancelHandle() {
            console.log('取消了')
          },
          getScrollY(){
              console.log(window.pageYOffset || document.documentElement.scrollTop)
              return window.pageYOffset || document.documentElement.scrollTop;
              },
          selectCallback(msg) {
              console.log(msg);
          },
          getGuideList(scenicspotId, sex, agetype, minprice, maxprice, todaytuan, isbuyticket, isshuttle) {
            guideList(scenicspotId, sex, agetype, minprice, maxprice, todaytuan, isbuyticket, isshuttle).then(res => {
              console.log('区导列表返回。。。。。')
              console.log(res);
              this.scenicInfo = res.scenicspotMap;

            })
          },
          get(obj) {
              console.log(obj);
          }

        }
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


