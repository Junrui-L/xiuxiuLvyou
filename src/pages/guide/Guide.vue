   /*Created by soft on 2018/1/3 */
<template>
  <div class="Guide">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="headBg">
        <div slot="select-title" class="select-title">
          <span class="spotname ">{{scenicInfo.name}} </span>
        </div>
      </HeadTop>
      <img class="head-img" v-if="scenicInfo.scenicimg" :src="baseUrl + scenicInfo.scenicimg" alt="">
    </header>

    <drop-down :dropDownData = "dropDownData" :selectCallback="selectCallback" ></drop-down>
    <div class="guide-wrapper">
      <ul class="guide-list">
        <li  v-if="guidesList.length == 0" class="noGuide">暂无向导</li>
        <li v-else class="guide" v-for="item in guidesList"  @click="goDetail(item.servicetype, item.visitorid)">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="item.userimg" alt="用户头像"/>
              <i class="male" :class="{'female': item.sex == 2}"></i>
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name clearfix" ><span class="fl">{{item.username}}</span><span class="fl guide-type">{{ item.servicetype | guideTypeText }}</span></h5>
              <div class="guide-count"><span>{{item.wfcount}}种玩法 </span> |<span> 服务{{item.fwcount}}人 </span><span class="guide-price"  v-if="item.dayprice != null">￥{{item.dayprice}}<span>起/天</span></span> </div>
              <!--<div class="guide-price"  v-if="item.dayprice != null">￥{{item.dayprice}}<span>起/天</span></div>-->
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
              {name: '景区讲解', value: 1},
              {name: '当地带玩', value: 2},
              {name: '专线旅游', value: 3},
              {name: '全部类型', value: ''}
            ]
          },
          {
            name: '默认排序',
            value: 'sort',
            children: [
              {name: '评分高低', value: 1, type: 'price'},
              {name: '服务单数', value: 2, type: 'todaytuan'},
              {name: '价格由低到高', value: 3, type: 'baojiesong'},
              {name: '价格由高到低', value: 1, type: 'peoplenum'},
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
          isshuttle: '',
          sort: ''
        }
      }
    },
    components: {
      HeadTop,
      DropDown,
    },
    mounted() {
      this.sendData.scenicspotId = this.$route.query.scenicId;
      console.log(this.sendData);
      this.getGuideList(this.sendData);

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
      },
      goDetail(type,id){
        if(type == 1) {
          //景区向导
          this.$router.push({path: '/scenicDetail',  query: {scenicspot: this.scenicId, accountId: id}})
        } else {
          //其他向导
          this.$router.push({path: '/guideDetail',  query: {id: id}})
        }
      }

    }
  }
</script>

<style lang="scss">
  /*引入样式表*/
</style>


