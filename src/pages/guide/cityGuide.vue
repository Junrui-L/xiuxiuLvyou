/*Created by soft on 2018/1/3 */

<template>
  <div class="Guide">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="headBgs">
        <div slot="select-title" class="select-title" @click="showCityPicker">
          <span class="cityname ">{{scenicInfo.name}}</span>
        </div>

      </HeadTop>
      <img  class="head-img" :src="basePath + scenicInfo.cityimg" alt="">
    </header>
    <div >
      <drop-down :dropDownData="dropDownData" @selectCallback="selectCallback"></drop-down>

    </div>
    <div class="guide-wrapper">

      <ul class="guide-list">
        <li v-if="guidesList.length == 0" class="noGuide">暂无向导</li>
        <li v-else class="guide" v-for="item in guidesList"  @click="$router.push({path: '/guideDetail',  query: {id:item.visitorid}})">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="item.userimg" alt="用户头像"/>
              <i class="male" :class="{'female': item.sex == 2}"></i>
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name"><span>{{item.username}}</span> <span class="hascar" v-if="item.havecar == 1">(有车)</span></h5>
              <div class="guide-count"><span>{{item.wfcount}}种玩法 </span> |<span> 服务{{item.fwcount}}人 </span><span class="guide-price"  v-if="item.dayprice != null">￥{{item.dayprice}}<span>起/天</span></span></div>
              <!--<div class="guide-price"  v-if="item.dayprice != null">￥{{item.dayprice}}<span>起/天</span></div>-->
            </div>
            <!--<button class="guide-order fl" >找Ta预订 </button>-->
          </div>
          <div class="guide-txt" v-if="item.abstract != '' ">
            <p>
              {{  item.abstract  }}
            </p>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {cityGuideList, guideDetails} from '../../http/getDate'
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
        baseUrl: 'http://www.youdingsoft.com',
        headBgs: false,
        scenicId: this.$route.query.citySn,
        scenicInfo: '',
        guidesList: [],
        dropDownData: [
          {
            name: '导游类型',
            value: 'servicetype',
            children: [
              {name: '景区讲解', value: 1},
              {name: '当地带玩', value: 2},
              {name: '专线旅游', value: 3}
            ]
          },
          {
            name: '默认排序',
            value: 'sort',
            children: [
              {name: '距离', value: 'distance'},
              {name: '评分高低', value: 'distance'},
              {name: '价格由低到高', value: 'playprice'},
              {name: '价格由高到低', value: 'playprice2'},
            ]
          }
        ],
        sendData: {  // 景区导游列表请求参数
          citySn: '',
          servictype: '',
          sex: '',
          agetype: '',
          minprice: '',
          maxprice: '',
          todaytuan: '',
          isbuyticket: '',
          isshuttle: '',
          havecar: '',
          sort: ''
        }
      }
    },
    components: {
      HeadTop,
      DropDown,
    },
    computed: {
      ...mapState([
        'basePath', 'location', 'userInfo', 'baseOrder'
      ]),
    },
    mounted() {
      this.cityPicker = this.$createCascadePicker({
        title: '选择区域',
        data: cityData,
         onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })

      this.sendData.citySn = this.$route.query.citySn;
     // this.sendData.citySn = 440100;
      console.log(this.sendData);
      this.getGuideList(this.sendData);

      window.addEventListener('scroll', throttle(() => {

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if( scrollTop > 300) {
          this.headBgs = true;
        } else {
          this.headBgs = false;
        }
      },250))

    },
    methods: {
      showCityPicker() {
        this.cityPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.sendData.citySn = selectedVal[1];
        console.log(this.sendData);
        this.getGuideList(this.sendData);
      },
      cancelHandle() {
        console.log('取消了')
      },
      // 选择dropwodn的回调函数 cbData:[{type:'sex',value:1,name:'性别'}]
      selectCallback(cbData) {
        console.error(JSON.stringify(cbData))
        cbData.forEach(item => {
          if(item.value == '') {
            this.sendData[item.type] = ''
          } else {
            this.sendData[item.type] = item.value
          }
        })
        console.log('------请求数据------')
        console.warn(JSON.stringify(this.sendData))
        this.getGuideList(this.sendData);

      },
      getGuideList(data) {
        console.log('请求参数' + JSON.stringify(data))
        cityGuideList(data).then(res => {
          console.log('区导列表返回。。。。。')
          console.log(res);
          this.scenicInfo = res.cityMap;  //地区信息
          this.guidesList = res.list;    //向导列表
        })
      }

    }
  }
</script>

<style lang="scss">
  /*引入样式表*/
</style>


