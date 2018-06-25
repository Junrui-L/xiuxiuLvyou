/*Created by soft on 2018/1/2 景区列表页 */

<template>
    <div class="ScenicRegion">
        <header>
            <HeadTop go-back='true' :headBg="headBg">
              <div slot="select-title" class="select-title" @click="">

                <span class="cityname " @click="showCityPicker">{{city}}</span>

              </div>
              <div class="select-options" slot="selectoption" @click="showActive"></div>
            </HeadTop>
            <img  class="head-img" :src="baseUrl + citySenic.cityimg" alt="">
        </header>
        <div class="region-wrapper">
            <ul class="region-list">
              <li class="region" v-for="(item,index) in senicList" :key="item.id">
                <router-link class="nav-link" :to= "{ name:'guide', query: {scenicId: item.id} }">
                  <dl class="clearfix">
                    <dt class="region-img fl">
                      <img :src="baseUrl + item.scenicimg" alt="">
                    </dt>
                    <dd class="region-detail fl">
                      <h5 class="region-name"><span>{{item.name}}</span></h5>
                      <div class="region-level">国家{{item.level}}A级景区 （{{item.guidecount ? item.guidecount : 0}}位向导）</div>
                      <div class="region-category"><span>类别：</span>{{item.typename}} <span v-if="item.distance">距离： {{item.distance | showDistance}} </span></div>
                    </dd>
                  </dl>
                  <div class="region-txt">
                    <p>{{item.subexplanation}}</p>
                  </div>
                </router-link>
              </li>

            </ul>
        </div>
       <loading v-show="loading"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapMutations} from 'vuex'
    import HeadTop from '../../components/HeadTop.vue'
    import {spotsList, cityScenicspots} from '../../http/getDate'
    import {throttle} from '../../config/myUtils'
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
              city: '',
              cityValue: this.$route.query.citySn,
              citySenic:[{
                cityimg:''
              }],
              senicList: [],
              loading: true
            }
        },
        components: {
          HeadTop
        },
      computed: {
        ...mapState([
          'basePath','orderDetail'
        ]),
      },
        mounted() {
          this.cityPicker = this.$createCascadePicker({
            title: '选择城市',
            data: cityData,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })

          //默认按距离排
          this.getSpotsList(this.cityValue, 'distance');
          //获取区域
          window.addEventListener('scroll', throttle(() => {

              let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              if( scrollTop > 300) {
                  this.headBg = true;
              } else {
                  this.headBg = false;
              }
          },250))

        },
        methods: {
          showCityPicker() {
            this.cityPicker.show()
          },
          selectHandle(selectedVal, selectedIndex, selectedText) {

            this.city = selectedText[1];
            this.cityValue = selectedVal[1];
            this.getSpotsList(this.cityValue);

          },
          cancelHandle() {
            console.log('取消了')
          },
          getSpotsList(area, sortType) {

            spotsList(area, sortType).then(res => {

              //获取全国景区列表
              this.citySenic = res.cityMap;
              this.city = res.cityMap.name;
              this.senicList = res.scenicspotList;
              this.loading = false;
            })
          },
          showActive() {
            this.$createActionSheet({
              title: '景区筛选',
              // active: 0,
              data: [
                {
                  content: '级别',
                  sortType: 'level'
                },
                {
                  content: '距离',
                  sortType: 'distance'
                },
                {
                  content: '评分',
                  sortType: 'score'
                },
                {
                  content: '价格',
                  sortType: 'playprice'
                },
                {
                  content: '查看全部',
                  sortType: ''
                }
              ],
              onSelect: (item, index) => {
                this.getSpotsList(this.cityValue, item.sortType)
                console.log(item.sex)

              },
              onCancel: () => {
                console.log('取消了')
              }
            }).show()
          }

        }
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


