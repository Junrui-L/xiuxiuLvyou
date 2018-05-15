/*Created by soft on 2018/1/3 */

<template>
  <div class="Guide near-guide">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="true">
        <div slot="select-title" class="select-title">
          <span class="spotname ">附近向导</span>
        </div>
        <div class="select-options" slot="selectoption" @click="showActive"></div>
      </HeadTop>

    </header>
    <!--<drop-down v-if="guidesList.length != 0" :dropDownData="dropDownData" :selectCallback="selectCallback" ></drop-down>-->
    <div class="guide-wrapper">
      <ul class="guide-list">
        <!--<li class="guide">-->
          <!--<div class="guide-t clearfix">-->
            <!--<div class="guide-img fl">-->
              <!--<img src="http://img1.jfdown.com/upload/5/kawfodxw.jpg" alt="用户头像"></div>-->
            <!--<div class="guide-detail fl"><h5 class="guide-name">张小倩<span> ( 当地游玩 )</span></h5>-->
              <!--<div class="guide-count"><span>种玩法</span> | <span>服务2人 </span></div>-->
              <!--<div class="guide-dis"><span>距离：</span>{{dis | showDistance}}</div></div>-->
            <!--<button class="guide-order fl">找Ta预订 </button></div>-->
          <!--<div class="guide-txt"><p>-->
          <!--带您玩，带你疯，让你快乐一整天。-->
        <!--</p></div>-->
        <!--</li>-->
        <li v-if="guidesList.length == 0" class="noGuide">附近暂无向导</li>
        <li v-else class="guide" v-for="item in guidesList"  @click="$router.push({path: '/guideDetail',  query: {id: item.id}})">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="item.headimgurl" alt="用户头像"/>
              <i class="male" :class="{'female': item.sex == 2}"></i>
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name">{{item.userName}}<span> ( {{item.servicetype | servicetypeText }} )</span></h5>
              <div class="guide-count"><span>{{item.wfcount}}种玩法</span> | <span>服务{{item.fwcount}}人 </span></div>
              <div class="guide-dis"><span>距离：</span>{{ item.distance | showDistance}}</div>
            </div>
            <!--<button class="guide-order fl" >找Ta预订 </button>-->
          </div>
          <div class="guide-txt" v-if="item.abstract != '' ">
            <p>
              {{ item.abstract }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getNearGuide , guideDetails} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import {throttle} from '../../config/myUtils'
  import DropDown from '../../components/DropDown.vue'


  import {provinceList, cityList, areaList} from '../../config/datajs'

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
        dis: 500,
        scenicInfo: '',
        dropDownData: [
          {
            name: '导游类型',
            value: 'servicetype',
            children: [
              {name: '景点讲解', value: 1},
              {name: '带游服务', value: 2}
            ]
          },
          {
            name: '年龄',
            value: 'agetype',
            children: [
              {name: '70后', value: '70后'},
              {name: '80后', value: '80后'},
              {name: '90后', value: '90后'},
              {name: '00后', value: '00后'},
            ]
          },
          {
            name: '默认排序',
            value: 'sort',
            children: [
              {name: '价格', value: 1, type: 'price'},
              {name: '今日可团游', value: 1, type: 'todaytuan'},
              {name: '包接送', value: 1, type: 'baojiesong'},
              {name: '人气', value: 1, type: 'peoplenum'},
            ]
          }
        ],
        locations: {  // 当前经纬度
          latitude: '',
          longitude: ''
        },
        guidesList: [],
        loading: true
      }
    },
    components: {
      HeadTop,
      DropDown,
    },
    mounted() {
      this.cityPicker = this.$createCascadePicker({
        title: '选择城市',
        data: cityData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
      this.locations.latitude = this.$route.query.latitude;
      this.locations.longitude = this.$route.query.longitude;
      this.getGuideList();

    },
    methods: {
      showCityPicker() {
        this.cityPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {

      },
      cancelHandle() {
        console.log('取消了')
      },
      getScrollY() {
        console.log(window.pageYOffset || document.documentElement.scrollTop)
        return window.pageYOffset || document.documentElement.scrollTop;
      },
      // 选择dropwodn的回调函数 cbData:[{type:'sex',value:1,name:'性别'}]
      selectCallback(cbData) {
        console.error(JSON.stringify(cbData))
        cbData.forEach(item => {
          this.sendData[item.type] = item.value
        })
        this.getGuideList(this.sendData)
      },
      getGuideList(sex) {

        if( this.locations.latitude != '' && this.locations.longitud != '') {
          this.loading = true;
          getNearGuide(this.locations.latitude, this.locations.longitude, sex).then(res => {
            this.loading = false;
            console.log('区导列表返回。。。。。')
            console.log(res);
            this.guidesList = res.list;
          })
          // this.getNearGuide(this.locations.latitude, this.locations.longitude);
        } else {
          this.loading = false;
          this.$createToast({
            txt: `未获取到您的位置，请返回首页重新进入`,
            type: 'error',
            time: 3000
          }).show()
        }

      },
      showActive() {
        this.$createActionSheet({
          title: '向导筛选',
          // active: 0,
          data: [
            {
              content: '只看女向导',
              sex: 2
            },
            {
              content: '只看男向导',
              sex: 1
            },
            {
              content: '查看全部',
              sex: ''
            }
          ],
          onSelect: (item, index) => {
            console.log(item.sex)
            this.getGuideList(item.sex)
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


