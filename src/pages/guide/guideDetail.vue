<template>
  <div class="guide_detail">
    <header ref="uiHeader">
      <HeadTop go-back='true' :headBg="headBg">
      </HeadTop>
    </header>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="swiper-slide" v-for="(item, index) in getStr(guideInfos.lifeimgs)" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="guide-info clearfix">
      <ul class="guide-name fl">
        <li class="name">{{guideInfos.userName}} <span>{{guideInfos.agetype}}</span>
          <!--<span>{{guideInfos.signature}}</span>-->
          <!--<span class="guide-price" v-if="guideInfos.dayprice != null">￥{{guideInfos.dayprice}}<span>起/天</span></span>-->
        </li>
        <li class="certification">
          <span>导游已认证</span>
          <span>{{servicetype}}</span>
          <span>英语{{guideInfos.englishLevel}}级</span>
        </li>
      </ul>
      <div class="img-wrapper fr">
        <img :src="guideInfos.userImg" alt="">
        <i class="male" :class="{'female': guideInfos.sex == 2}"></i>
      </div>
    </div>
    <ul class="guide-date clearfix">
      <li class="date-item fl">
        <strong>3600</strong>
        <p>浏览量</p>
      </li>
      <li class="date-item fl">
        <strong>{{guideInfos.fwcount}}</strong>
        <p>接单量</p>
      </li>
      <li class="date-item fl">
        <strong>{{guideInfos.assess || 0}}</strong>
        <p>评价数</p>
      </li>
      <li class="date-item fl" v-if="guideInfos.dayprice">
        <strong class="guid-p">  ￥{{guideInfos.dayprice}} <span>起</span></strong>
        <p>价格</p>
      </li>
    </ul>
    <div class="detail-container">
      <div class="about">
        <h3>关于我</h3>
        <p class="introduce " :class="{'clipFive': clipInroduce == true}">
          {{guideInfos.abstract}}
        </p>
        <span class="see-all" :class="{'hide': clipInroduce == false}" @click="clipInroduce = false">查看全部</span>
      </div>
      <div class="tourist-eval">
        <h3 class="tite">游客评价</h3>

        <div class="all-command">
          <div class="command-tit clearfix">
            <p class="command-num">全部{{guideInfos.assess}}条评论</p>
            <EvaluateStar :code="guideInfos.level"></EvaluateStar>
            {{guideInfos.level}}分
            <span class="see-command"
                  @click="$router.push({path: '/assessList',  query: {playId: '', guideId: guideInfos.visitorId}})">查看点评</span>
          </div>
          <ul class="command-tip clearfix">
            <li class="tip fl">细心周到（1）</li>
            <li class="tip fl">热情好客（2）</li>
            <li class="tip fl">当地通（1）</li>
            <li class="tip fl">细心周到（1）</li>
            <li class="tip fl">细心周到（1）</li>
            <li class="tip fl">幽默开朗（55）</li>
          </ul>
        </div>
      </div>

      <div class="other-playmethos" v-if="playList.length > 0">
        <h3 class="tite">提供玩法</h3>
        <ul class="methos-wrapper">
          <li class="methods" v-for="item in playList">
            <router-link class="nav-link"
                         :to="{name: 'scenicDetail',  query: {playId: item.id, accountId: item.accountid}}">
              <dl class="clearfix">
                <dt class="method-img fl">
                  <img :src="basePath + item.wfimg" alt="">
                </dt>
                <dd class="method-detail fl">
                  <div class="method-name">{{item.wfname}}</div>
                  <div class="method-desc"><span>{{item.servicetype | servicetypeText}}</span> {{ item.servicecity}}
                  </div>
                  <div class="method-tip">类别：<span v-for="i in getStr(item.wfbq)">{{i }}</span></div>
                </dd>
              </dl>
              <div class="method-txt">
                <p>
                  {{item.xdtx}}
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

    </div>
    <div class="secnic-footer ">
      <div class="clearfix">
        <div class="fucc fl">
          <span class="favarate">收藏</span>
          <span class="chat">咨询</span>
        </div>
        <button class="order-btn fr" @click="touchMe">找我预约</button>
      </div>
    </div>
    <cube-popup type="plays-popup" :center="false" ref="choosePopup">
      <div class="plays-content">
        <i class="close" @click="hideChoosePopup"></i>
        <h3 class="head-tit">
          选择玩法
        </h3>
        <ul class="choose-wrap">
          <li v-if="playList.length == 0" class="no-play">暂未发布玩法</li>
          <li v-else class="choose-item choose-playmethos clearfix" v-for="item in playList"
              @click="$router.push({name: 'scenicDetail',  query: {playId: item.id, accountId: item.accountid}})">
            <dl class="clearfix methods">
              <dt class="method-img fl">
                <img :src="basePath + item.wfimg" alt="">
              </dt>
              <dd class="method-detail fl">
                <div class="method-name">{{item.wfname}}</div>
                <div class="method-desc"><span>{{item.servicetype | servicetypeText}}</span> {{ item.servicecity}}</div>
                <!--<div class="method-tip">类别：<span v-for="i in getStr(item.wfbq)">{{i }}</span></div>-->
              </dd>
              <dd class="fr">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </cube-popup>
    <cube-popup type="choose-popup" :center="false" ref="orderPopup">
      <div class="bootom-cotent">
        <i class="close" @click="hideOrderPopup"></i>

        <div class="head-wrapper">
          <h3 class="region-name">{{plays.servicecity}}-{{plays.scenicspot}} <span v-show="plays.sfzcty == 1">可团游</span>
          </h3>
          <div class="region-adress">{{plays.serviceCity}} <span>{{plays.wfname}}</span></div>
          <ul class="tips clearfix">
            <li class="tip fl" v-for="word in getStr(plays.wfbq)">{{word}}</li>

          </ul>
        </div>
        <ul class="choose-wrap">
          <li class="choose-item clearfix" @click="showDatePicker">选择出行日期 <span class="fr">{{travalDate.txt}}
                <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
          </li>
          <li class="choose-item clearfix" @click="showDayPicker">游玩天数 <span class="fr">{{travalDay.txt }}
                <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
          </li>
          <li class="choose-item clearfix" @click="showMealPicker">可选套餐
            <span class="fr"> {{mealType.type}}
                   <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
                </span>
          </li>
          <li class="choose-item clearfix" @click="showPeoplePicker">出行人数
            <span class="fr">{{peopleNum.txt}}
                   <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
                </span>
          </li>
        </ul>

        <div class="secnic-footer ">
          <div class="clearfix">
            <div class="fucc fl">
              <span class="favarate">收藏</span>
              <span class="chat">咨询</span>
            </div>
            <button class="order-btn fr" @click="nextStep">下一步</button>
          </div>
        </div>
      </div>
    </cube-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  // import VueAwesomeSwiper from 'vue-awesome-swiper'
  import {mapState, mapMutations} from 'vuex'
  import {guideHome, loadPackage, initOrder} from '../../http/getDate'
  import {dateFmt, throttle} from '../../config/myUtils'
  import HeadTop from '../../components/HeadTop.vue'
  import Banner from '../../components/Banner.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import EvaluateStar from '../../components/EvaluateStar.vue'
  import DatePicker from '../../components/date-picker'
  import {peopleNum, peoleData} from '../../config/datajs'
  createAPI(Vue, DatePicker, ['select', 'cancel'], false)

  export default {
    data() {
      return {
        headBg: false,

        swiperOption: {
          loop: true,     //轮播图配置
          autoplay: 5000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
          autoplayDisableOnInteraction: false,
        },
        clipInroduce: true, //查看更多详情
        guideInfos: [],
        playList: [], //玩法列表
        mealdata: [], //套餐列表
        travalDate: '',
        travalDay: '',
        mealType: '',
        peopleNum: '',
        newPricePackelist: [],
        plays: {},
      }
    },
    computed: {
      ...mapState([
        'basePath', 'location', 'userInfo', 'baseOrder', 'guideInfo', 'play'
      ]),
      servicetype: function () {
        let type = this.guideInfos.servicetype
        if (type == 1) {
          return '向导服务类型'
        } else if (type == 2) {
          return '当地游玩类型'
        } else if (type == 3) {
          return '专线游类型'
        }
      },
      ability: function () {
        return this.guideInfos.ability;
      }
    },
    components: {
      HeadTop,
      Banner,
      EvaluateStar,
      swiper,
      swiperSlide
    },
    mounted() {
      //请求当前导游详情，玩法列表
      this.getGuideHome(this.$route.query.id);
      //玩法选择初始化
      this.dayPicker = this.$createPicker({
        title: '出行天数',
        data: [peoleData],
        alias: {
          value: 'num',
        },
        onSelect: this.selectDayHandle,
        onCancel: this.cancelHandle
      })

      this.peoplePicker = this.$createPicker({
        title: '出行人数',
        data: [peopleNum],
        alias: {
          value: 'num',
        },
        onSelect: this.selectpeopleHandle,
        onCancel: this.cancelHandle
      })
      //获取当前日期
      let nowTime = new Date();
      if(nowTime.getHours() >= 18) {
        //超高跟18点默认订明天
        nowTime.setTime(nowTime.getTime()+24*60*60*1000)
      }
      let nowday = dateFmt(nowTime, 'yyyy-M-dd');

      let minDay  = nowday.split('-');
      let mindate = [];
      minDay.forEach((v,i)=>{
        mindate[i] = parseInt(v)
      });
      this.datePicker = this.$createDatePicker({
        min: mindate,
        max: [2020, 12, 31],
        onSelect: this.selecTimetHandle,
        onCancel: this.cancelHandle
      })

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
      ...mapMutations(['BASE_ORDER', 'SAVE_PLAY','SAVE_PRICEPACKAGE']),
      getGuideHome(guideId) {

        guideHome(guideId).then(res => {
          this.guideInfos = res.guide;
          console.log(this.guideInfos)
          this.playList = res.playlist;
          console.log(this.playList)
          if(this.playList.length == 1) {
            this.plays = this.playList[0];
          }
        })
      },
      priceList(godate, accountId, playId) {
        loadPackage(godate, accountId, playId).then(res => {
          this.newPricePackelist = res.pricepackageList;   //根据日期的套餐集合
          for(let i=0; i< this.newPricePackelist.length; i++) {
            this.mealdata[i] = {value:this.newPricePackelist[i].id, text: this.newPricePackelist[i].name}
          }
          let tcData = JSON.parse(JSON.stringify(this.mealdata));
          this.mealPicker = this.$createPicker({
            title: '套餐选择',
            data: [tcData],
            onSelect: this.selectMealHandle,
            onCancel: this.cancelHandle
          })

          console.log('.....套餐选择初始化......')
        })
      },
      showChoosPopup() {
        const component = this.$refs.choosePopup
        component.show()
      },
      hideChoosePopup() {
        const component = this.$refs.choosePopup;
        component.hide();
      },
      showOrderPopup() {
        const component = this.$refs.orderPopup;
        component.show()
      },
      hideOrderPopup() {
        const component = this.$refs.orderPopup;
        component.hide();
      },
      showDatePicker() {
        this.datePicker.show();
      },
      showMealPicker() {
        if (this.mealPicker) {
          this.mealPicker.show();
        } else {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先选择日期'
          }).show()
        }

      },
      showPeoplePicker() {
        this.peoplePicker.show();
      },
      showDayPicker() {
        this.dayPicker.show();
      },
      selecTimetHandle(selectedVal, selectedIndex, selectedText) {
        //加0
        let sv = selectedVal.map((i) => {
          return i < 10 ? '0' + i : i
        })
        this.travalDate = {value: sv.join('-'), txt: selectedText.join('')}
        this.priceList(this.travalDate.value, this.plays.accountid, this.plays.id)
      },
      selectDayHandle(selectedVal, selectedIndex, selectedText) {

        this.travalDay = {value: selectedVal[0], txt: selectedText[0]}
      },
      selectMealHandle(selectedVal, selectedIndex, selectedText) {
        this.mealType = {type: selectedText[0], id: selectedVal[0]};
        this.SAVE_PRICEPACKAGE(this.newPricePackelist[selectedIndex[0]])
      },
      selectpeopleHandle(selectedVal, selectedIndex, selectedText) {
        // this.peopleNum = selectedVal[0] + '人'
        this.peopleNum = {value: selectedVal[0], txt: selectedText[0]}
      },
      touchMe() {
        console.log('点击预约' +this.playList.length )
        if (this.playList.length == 0) {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '该向导暂未发布玩法',
            showClose: true
          }).show()
        } else if (this.playList.length == 1) {
          this.showOrderPopup()
        } else if (this.playList.length > 1) {
          this.showChoosPopup();
        }
      },
      toOrder() {
        this.$router.push({path: '/orderDetail', query: {guideId: this.$route.params.id}})
      },
      nextStep() {
        console.log('就下一步了')
        if(this.travalDate == '' ){
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先选择日期'
          }).show()
        } else if(this.travalDay == '' ) {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先选择出行天数'
          }).show()
        }else if(this.travalDay.value < this.plays.playDay ) {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '出行天数须大于玩法天数'
          }).show()
        } else if(this.mealType == '' ){
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先选择套餐'
          }).show()
        } else  if(this.peopleNum == '') {
          this.$createDialog({
            type: 'alert',
            title: '温馨提示',
            content: '请先选择人数'
          }).show()
        } else if(this.travalDate != '' && this.mealType!= '' && this.peopleNum != '' && this.travalDay.value >= this.plays.playday) {

          //初始化订单 更新初步订单到数据仓库
          console.log('去下一步')
          initOrder(this.travalDate.value,this.travalDay.value, this.plays.accountid, this.plays.id, this.peopleNum.value, this.mealType.id, 0, 0).then(res => {
            console.log(res);
            if(res.msg){
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: res.msg,
                showClose: true
              }).show()
            }else  {
              this.BASE_ORDER({travalDate:this.travalDate,travalDay: this.travalDay, mealType: this.mealType, peopleNum: this.peopleNum})
              this.$router.push({name: 'orderDetail',query: {guideId: this.plays.accountid, playId: this.plays.id}})
            }
          })

          // this.BASE_ORDER({travalDate:this.travalDate,travalDay: this.travalDay, mealType: this.mealType, peopleNum: this.peopleNum})
          // this.$router.push({name: 'orderDetail',query: {guideId: this.accountId, playId: this.playId}})

        }

        console.log( this.plays.playDay)
        console.log(`travalDate: ${this.travalDate.value},travalDay: ${this.travalDay.value}, mealType: ${JSON.stringify(this.mealType)}, peopleNum: ${JSON.stringify(this.peopleNum)}`)
      },
      getStr(str) {
        if (str && str != '') {
          let strList = str.split(';');
          return strList;
        } else {
          return [];
        }

      }

    }

  }
</script>

<style lang="scss">

</style>
