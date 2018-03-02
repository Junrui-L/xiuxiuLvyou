/*Created by soft on 2018/1/3 */
<template>
  <div class="Guide">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="headBg">
        <div slot="select-title" class="select-title">
          <span class="spotname ">{{scenicInfo.name}}</span>
        </div>
      </HeadTop>
      <img class="head-img" v-if="scenicInfo.scenicimg" :src="baseUrl + scenicInfo.scenicimg" alt="">
    </header>
    <drop-down :dropDownData="dropDownData" :selectCallback="selectCallback" ></drop-down>
    <div class="guide-wrapper">
      <ul class="guide-list">
        <li  v-if="guidesList.length == 0" class="noGuide">暂无向导</li>
        <li v-else class="guide" v-for="item in guidesList"  @click="$router.push({name: 'scenicDetail',  query: {scenicspot: scenicId, accountId: 1}})">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="item.userimg" alt="用户头像"/>
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name"><span>{{item.username}}</span></h5>
              <div class="region-level"><span>服务{{item.fwcount}}人</span> | <span>{{item.wfcount}}种玩法 </span></div>
              <div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>
            </div>
            <!--<button class="guide-order fl" @click="$router.push({name: 'guideDetail',  params: {id: 33}})">找Ta预订-->
            <button class="guide-order fl" >找Ta预订 </button>
          </div>
          <div class="guide-txt">
            <p>
              {{ item.signature }}
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
        headBg: false,
        scenicId: this.$route.query.scenicId,
        city: '北京',
        scenicInfo: '',
        guidesList: [], //向导集合
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
        sendData: {  // 景区导游列表请求参数
          scenicspotId: '',
          sex: '',
          agetype: '',
          minprice: '',
          maxprice: '',
          todaytuan: '',
          isbuyticket: '',
          isshuttle: ''
        }
      }
    },
    components: {
      HeadTop,
      DropDown,
    },
    mounted() {
      this.cityPicker = this.$createCascadePicker({
        title: 'City Picker',
        data: cityData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
      this.sendData.scenicspotId = this.$route.query.scenicId;
      console.log(this.sendData);
      this.getGuideList(this.sendData);

      // window.addEventListener('scroll', throttle(() => {
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
      getGuideList(data) {
        guideList(data).then(res => {
          console.log('区导列表返回。。。。。')
          console.log(res);
          this.scenicInfo = res.scenicspotMap;
          this.guidesList = res.guideslist;
        })
      }

    }
  }
</script>

<style lang="scss">
  /*引入样式表*/
</style>


