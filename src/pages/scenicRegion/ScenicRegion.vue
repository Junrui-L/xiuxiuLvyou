/*Created by soft on 2018/1/2 景区列表页 */

<template>
    <div class="ScenicRegion">
        <header>
            <HeadTop go-back='true'>
              <div slot="select-title" class="select-title" @click="">

                <span class="cityname " @click="showCityPicker">{{city}}</span>

              </div>
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
                      <div class="region-category"><span>类别：</span>{{item.typename}}</div>
                    </dd>
                  </dl>
                  <div class="region-txt">
                    <p>{{item.subexplanation}}</p>
                  </div>
                </router-link>
              </li>

            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {spotsList, cityScenicspots} from '../../http/getDate'
    import HeadTop from '../../components/HeadTop.vue'
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
              senicList: []
            }
        },
        components: {
          HeadTop
        },
        mounted() {
          this.cityPicker = this.$createCascadePicker({
            title: 'City Picker',
            data: cityData,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })

          this.getSpotsList(this.cityValue);
          //获取区域

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

            this.city = selectedText[1];
            this.cityValue = selectedVal[1];
            this.getSpotsList(this.cityValue);

          },
          cancelHandle() {
            console.log('取消了')
          },
          getSpotsList(val) {

            spotsList(val).then(res => {

              //获取全国景区列表
              this.citySenic = res.cityMap;
              this.city = res.cityMap.name;
              this.senicList = res.scenicspotList;
              console.log(this.citySenic)
            })
          },
          getCityScenicspots(citysn) {
            this.cityScenicspots(citysn).then(res => {
              console.log(res)
            })
          }

        }
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


