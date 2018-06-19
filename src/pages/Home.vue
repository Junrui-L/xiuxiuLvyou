<template>
  <div class="Home">
    <div class="header" @click="goSearch">
      <!--<img class="logo-img" src="../assets/img/logo.png" alt="">-->

      <div class="search-input">
        <svg class="search-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
        </svg>
        请尝试 “北京”
      </div>
    </div>
    <div class="banner">
      <!--<img src="../assets/img/home_banner.jpg" alt=''/>-->
      <!--<div ref="slideWrapper" class="slide-container">-->
        <!--<cube-slide-->
          <!--ref="silde"-->
          <!--:initial-index="initialIndex"-->
          <!--:loop="loop"-->
          <!--:auto-play="autoPlay"-->
          <!--:interval="interval"-->
          <!--:threshold="threshold"-->
          <!--:speed="speed"-->
          <!--:allow-vertical="allowVertical"-->
         <!--&gt;-->

          <!--<cube-slide-item v-for="(item, index) in banners"  :key="index">-->
            <!--<a :href="item.url">-->
              <!--<img :src="basePath + item.img" />-->
            <!--</a>-->
          <!--</cube-slide-item>-->
        <!--</cube-slide>-->

      <!--</div>-->
      <swiper :options="swiperOption"  ref="mySwiper">
        <!-- 这部分放你要渲染的那些内容 -->
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <a :href="item.url">
            <img :src="basePath + item.img" class="index_img">
          </a>
        </swiper-slide>
        <!-- 这是轮播的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <ul class="nav clearfix">
      <li class="nav-item fl">
        <router-link class="nav-link" :to="{path: '/scenicRegion' , query: { citySn: locations.areasn || 110100}}">
          <img class="nav-img" src="../assets/img/home_jingqu@2x.png" alt="">
          <p class="nav-tit">景区向导</p>
        </router-link>
      </li>
      <li class="nav-item fl">
        <router-link class="nav-link" :to="{path: '/cityGuide', query: {citySn: locations.areasn || 110100}}">
          <img class="nav-img" src="../assets/img/home_qudao_xhdpi.png" alt="">
          <p class="nav-tit">当地向导</p>
        </router-link>
      </li>
      <li class="nav-item fl">
        <router-link class="nav-link" :to="{path: '/NearGuide' , query: { latitude: location.latitude, longitude: location.longitude}}">
          <img class="nav-img" src="../assets/img/home_near@2x.png" alt="">
          <p class="nav-tit">附近向导</p>
        </router-link>
      </li>
      <li class="nav-item fl">
        <router-link class="nav-link" :to="{path: '/oneStepGuide', query: {citySn: locations.areasn || 110100}}">
        <!--<a class="nav-link" @click="tip">-->
          <img class="nav-img" src="../assets/img/home_one_xhdpi.png" alt="">
          <p class="nav-tit">一键选导</p>
        <!--</a>-->
        </router-link>
      </li>
    </ul>
    <div class="hot-spots">
      <h3 class="title">
        <span>热门景点</span>
        <router-link  :to="{path: '/cityGuide', query: {citySn:  110100}}" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>

      </h3>
      <div class="spots-wrapper slider-wrapper">
          <HoriSlider class="spots-list" ref="hotSpots">
            <div class="spot fl" v-for="item in hotSpotse">
              <router-link  :to="{path: '/guide' , query: { scenicId: item.modulekey }}">
                <div class="spot-img">
                  <img :src="basePath + item.cityimg" alt="">
                </div>
                <div class="spot-name">{{item.name}}</div>
                <!--<dd class="spot-guide">{{item.guidecout ? item.guidecout : 0}}位向导</dd>-->
              </router-link>
            </div>
        </HoriSlider>
      </div>
    </div>
    <div class="recommended-tours">
      <h3 class="title">
        <span>精选推荐专线</span>
        <!--<a href="" class="more-link fr">查看更多-->
          <!--<svg>-->
            <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
          <!--</svg>-->
        <!--</a>-->
      </h3>
      <div class="recom-wrapper">
        <cube-slide
          ref="silde2"
          :initial-index="initialIndex"
          :loop="loop"
          :auto-play="false"
        >
          <cube-slide-item v-for="(item,index) in hotLine" :key="index">
            <div class="tours-img"><img class="ads-img" src="../assets/img/home_ads.jpg" alt=""></div>
            <dl class="abstract clearfix">
              <dt class="tours-title">
                {{ item.name }}
              </dt>
              <dd class="tours-price fr"><span>￥{{item.dails.minprice}}</span>起/人</dd>
              <!--<dd class="tours-guide">6位中文向导导可服务</dd>-->
            </dl>
            <div class="guide-recom">

              <div class="cube-slide-item guide-intro" @click="$router.push({path: '/guideDetail',  query: {id: item.dails.accountid}})">
                <dl>
                  <dt class="guide-tit clearfix">
                    <img class="guide-img fl" :src="item.dails.userImg" alt="">
                    {{item.dails.username}}
                  </dt>
                  <dd class="guide-txt">
                    {{item.dails.abstract}}
                  </dd>
                </dl>
              </div>
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>

    </div>
    <div class="hot-spots  hot-area">
      <h3 class="title">
        <span>热门区域</span>
        <router-link :to="{path: '/scenicRegion', query: {citySn:  110100}}" href="" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </h3>
      <div class="area-wrapper slider-wrapper">
        <HoriSlider class="spots-list" ref="hotArea">
          <div class="spot fl" v-for="item in hotArea">
            <router-link  :to="{path: '/scenicRegion' , query: { citySn: item.areasn }}">
            <div class="spot-img">
              <img :src="basePath + item.img" alt="">
            </div>
            <div class="spot-name">{{item.areaname}}</div>
            <!--<dd class="spot-guide">{{item.guidecout ? item.guidecout : 0}}位向导</dd>-->
            </router-link>
          </div>
        </HoriSlider>

      </div>

    </div>
    <div class="recommended-guides" v-show="false" >
      <h3 class="title">
        <span>推荐向导</span>
        <a href="" class="more-link fr">查看更多
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </a>
      </h3>
      <div class="guides-wrapper  slider-wrapper" >
        <HoriSlider :spaceBetween="45" class="guides-list clearfix" ref="guideRecom">
          <div class="guide fl">
            <div class="guide-img">
              <img src="../assets/img/home_poist.jpg" alt="">
            </div>
            <div class="guide-txt">
              <div class="guide-intro"><b>姜老刀</b>本人从2002年工作到现在，埃里克森的骄傲拉速度快机法律手段发生的浪费看啊</div>
              <div class="guide-evalu clearfix">
                <div class="star fl">
                  <EvaluateStar :code="4.5"></EvaluateStar>
                </div>
                <div class="num fl">服务100人</div>
                <div class="method fl">2种玩法</div>
              </div>
              <button @click="showDialog" class="guide-order">找Ta预订</button>
            </div>
          </div>
          <div class="guide fl">
            <div class="guide-img">
              <img src="../assets/img/home_poist.jpg" alt="">
            </div>
            <div class="guide-txt">
              <div class="guide-intro"><b>姜老刀</b>本人从2002年工作到现在，埃里克森的骄傲拉速度快机法律手段发生的浪费看啊</div>
              <div class="guide-evalu clearfix">
                <div class="star fl">
                  <EvaluateStar :code="3"></EvaluateStar>
                </div>
                <div class="num fl">服务100人</div>
                <div class="method fl">2种玩法</div>
              </div>
              <button class="guide-order">找Ta预订</button>
            </div>
          </div>
        </HoriSlider>

      </div>
    </div>
      <!--<cube-button @click="showDialog">show dialog</cube-button>-->
    <div class="footer">拉到底了~<br/>可以尝试搜索看看</div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {homeData,getUserArea, userLogin, ConfigWx, userPerDetail} from '../http/getDate'
  import HoriSlider from '../components/HoriSlider.vue'
  import EvaluateStar from '../components/EvaluateStar.vue'
  import AlertTip from '../components/alertTip.vue'
  import {localStore} from '../config/myUtils'
  let localSn =  localStore('localSn', 'localStorage');
  let UserInfo = localStore('userInfo', 'localStorage')
  export default {
    name: 'Home',
    data() {
      return {
        // baseUrl: 'http://www.youdingsoft.com',
        locations: {areasn: 110100},
        local: null,
        hotSpotse: [],
        hotArea:  [],
        hotLine: [],
        guideRecom: [],
        showAlert: false,
        alertText: '',
        banners: [
        ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView: 'auto',
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          // loop: true,
          // autoPlay: true,
          paginationClickable: true,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            // this.page = swiper.realIndex+1;
            // this.index = swiper.realIndex;
          },
        },
        swiperid: '',   //轮播图片
        loop: true,
        autoPlay: true,
        interval: 4000,
        threshold: 0.3,
        speed: 400,
        allowVertical: false,
        initialIndex: 1,
        dotsSlot: false,
        addItem3: false,
        configMap: {},
        loading: true //加载动画
      }
    },
    components: {
      HoriSlider,
      EvaluateStar,
      AlertTip,
      swiper,
      swiperSlide
    },
    computed: {
      ...mapState([
        'basePath','location','userInfo', 'baseOrder'
      ]),
    },
    mounted() {
      //获取首页数据
      this.initHome();
      let _this=this;
      // this.$nextTick(() => {
      //
      // })
      setTimeout(() => {
        // _this.$refs.silde.refresh();
        _this.$refs.silde2.refresh();
      }, 1000)
      this.memoryLocation(); //查找本地记录



    },

    methods: {
      ...mapMutations(['GET_USERINFO','USER_AREA','RECORD_ADDRESS' ,'BASE_ORDER']),

      async initHome() {
        await homeData().then(res => {
          console.log(res);
          let resp = res;
          // if(resp.position.newcitySn != null) {
          //   this.locations.areasn = resp.position.newcitySn;
          // }
          this.banners = resp[1]   //banner图
          console.log(this.banners);
          console.log('轮播图呢')
          this.hotArea = resp[3]; //热门区域

          setTimeout(() => {
            this.$refs.hotArea.init();
          }, 20)

          this.hotSpotse = resp[4]; //热门景点
          setTimeout(() => {
            this.$refs.hotSpots.init();
          }, 20)


          this.hotLine = resp[5];  //热门路线
          // console.log(resp[5])
          console.log('这里取消Loading')
          this.loading = false
          userPerDetail().then(res => {
            console.warn('---------获取的个人信息-----------')
            console.log(res);
            if(res.visitor) {
              UserInfo.set('userInfo', res.visitor)
            }

          })
        }).catch(err => {

          console.log(err)
        });
        console.log('获取了首页数据')
        this.configWx();  //获取当前地理位置

      },
      goSearch() {
        this.$router.push({path: '/search/110000'}) //
      },
      configWx(){
        let signUrl = location.href;

        // signUrl = encodeURIComponent(signUrl)
        console.log(`要签名的url ${signUrl}`)
        ConfigWx(signUrl).then(res => {
          console.log('===》签名基本参数返回《====')
          console.log(res);
          if(res.configMap) {
            this.configMap = res.configMap;
            wx.config({
              debug: false,
              appId: res.configMap.appid,
              timestamp: res.configMap.timestamp,
              nonceStr: res.configMap.nonceStr, //随机串
              signature: res.configMap.signature ,//微信签名
              jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，这里只写获取地理位置
            });

          }

          this.getLocation();
        })
      },
      getLocation(){
        //获取地理位置
        let that = this;
        wx.ready(function(){

          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log('-----获取当经纬度-----')
              console.log(res);
              that.RECORD_ADDRESS({latitude: res.latitude, longitude: res.longitude})
              // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              // var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              // var accuracy = res.accuracy; // 位置精度
              getUserArea(res.latitude, res.longitude).then(res => {
                console.log('-----获取当前地区-----')
                let lastSn = localSn.get('areaSn');
                if(lastSn == null) {
                  localSn.set('areaSn', res.areasn);
                  that.locations = res;
                } else {
                  if(res.areasn == lastSn) {
                    console.log('位置没有变')
                  }else {
                    that.locations = res;
                    localSn.set('areaSn', res.areasn);
                    that.USER_AREA(res);
                    console.log('更新地理位置')
                  }
                }


                  console.log(res);
                console.log(that.locations);
                console.log(`当前地区编号${res.areasn}`)


              })
            }
          });
        })
      },
      memoryLocation(){
        let local = localSn.get('areaSn');
        console.log('记录的城市'+localSn)
        if(local == null || local == undefined) {
          console.log('没有记录，立即获取')
          this.configWx();  //立即获取当前地理位置
        } else {
          console.log('有记录，立即获取' + local)
          this.locations.areasn = local;
        }
      },
      showDialog() {
        this.$createDialog({
          type: 'alert',
          title: 'Alert',
          content: 'dialog content'
        }).show()
      },
      tip() {
        this.$createDialog({
          type: 'alert',
          title: '温馨提示',
          content: '暂未开放，敬请期待！'
        }).show()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
