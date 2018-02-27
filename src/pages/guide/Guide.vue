/*Created by soft on 2018/1/3 */
<template>
  <div class="Guide">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="headBg">
        <div slot="select-title" class="select-title" @click="showCityPicker">
          <span class="cityname ">{{scenicInfo.name}}</span>
        </div>
      </HeadTop>
      <img class="head-img" v-if="scenicInfo.scenicimg" :src="baseUrl + scenicInfo.scenicimg" alt="">
    </header>
    <drop-down :dropDownData="dropDownData" :selectCallback="selectCallback"></drop-down>
    <div class="guide-wrapper">
      <ul class="guide-list">

        <li class="guide" v-for="gu in guideslist">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="gu.userimg" alt="">
            </div>
            <div class="guide-detail fl"
                 @click="$router.push({name: 'scenicDetail',  query: {scenicspot: scenicInfo.id, accountId:gu.id}})">
              <h5 class="guide-name"><span>{{gu.username}}</span></h5>
              <div class="region-level"><span>服务{{gu.fwcount}}人</span> | <span>{{gu.wfcount}}种玩法 </span></div>
              <div class="guide-star"><span>类别：</span>{{gu.servicetype}}</div>
            </div>
            <button class="guide-order fl" @click="$router.push({name: 'guideDetail',  params: {id: gu.id}})">找Ta预订

            </button>
          </div>
          <div class="guide-txt">
            <p>
              {{gu.signature}}
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
        },
        guideslist: []//向导集合
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
      this.sendData.scenicspotId = 4
      this.getGuideList(this.sendData);

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

         this.city = selectedText[1];
         this.cityValue = selectedVal[1];
         this.getSpotsList(this.cityValue);

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
        cbData.forEach(item => {
          this.sendData[item.type] = item.value
        })
        this.getGuideList(this.sendData)
      },
      getGuideList(data) {
        guideList(data).then(res => {
          this.scenicInfo = res.scenicspotMap;
          this.guideslist = res.guideslist
        })
      }

    }
  }
</script>

<style lang="scss">
  /*引入样式表*/
</style>


