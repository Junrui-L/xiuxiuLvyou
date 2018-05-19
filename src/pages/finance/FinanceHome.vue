<template>
  <div class="financeHome">
    <header class="fixed">
      <i class="icons icons-logo fl"></i>
      <router-link  to="/myFinance" class="my-finance icons clearfix">
      </router-link>
    </header>
    <section class="view">
      <div class="banner">
        <swiper :options="swiperOption"  ref="mySwiper">
          <!-- 这部分放你要渲染的那些内容 -->
          <swiper-slide v-for="(item, index) in banners" :key="index">

              <img :src="item" class="index_img">

          </swiper-slide>
          <!-- 这是轮播的小圆点 -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <ul class="slogan box">
        <li class="box-flex text-ct">
          <a href="#">安全合规<br>
            <strong class="fs26">严格风控体系</strong>
          </a>
        </li>
        <li class="box-flex text-ct">
          <a href="#">优选资产<br>
            <strong class="fs26">资产配置多样</strong>
          </a>
        </li>
        <li class="box-flex text-ct">
          <a href="#">智能分散<br>
            <strong class="fs26">稳定投资收益</strong>
          </a>
        </li>
      </ul>
      <article class="host-profit text-ct relative">
        <div class="text-ct relative rate">
          <span class="big">{{homeInfo.shouyi}}</span>
          <span>{{homeInfo.shouyiUnit}}</span>%
          <i class="icons icons-rate absolute"></i>
        </div>
        <p class="text-ct txt-forgame fs22">
          咻咻向导旗下 合规赚取合理收益
        </p>
        <!--<button class="btn-buyin" >立即买入</button>-->
        <i class="icons icons-btn-buyin"></i>
        <p class="text-danger text-ct">
          理财非存款 投资需谨慎
        </p>
        <ul class="box rate-list">
          <li class="box-flex text-ct ">
            <div class="text-default clearfix">
              <i class="icons icons-money fl"></i>
              <div class="fl">
                <div>
                  <span class="relative">{{homeInfo.sumMoney}}
                  <span  class="txt">{{homeInfo.sumMoneyUnit}}</span>
                </span>
                </div>

                <small>{{homeInfo.sumMoneyTxt}}</small>
              </div>
            </div>


          </li>
          <li class="box-flex text-ct">
            <div class="text-default clearfix">
              <i class="icons icons-money icons-avatar fl"></i>
              <div class="fl">
                <div>
                  <span class="relative">{{homeInfo.sumUser}}
                  <span  class="txt">{{homeInfo.sumUserUnit}}</span>
                </span>
                </div>

                <small>{{homeInfo.sumUserTxt}}</small>
              </div>
            </div>
          </li>
        </ul>
      </article>
      <dl class="service-list">
        <dt class="text-ct">
          <i class="titles-index title-service"></i>
        </dt>
        <dd class="text-ct">
          <ul class="box">
            <li class="box-flex">
						<span class="circle"><i class="icons icons-service-1"></i>
						</span>
              <h2 class="fs24">
                多重保障更放心
              </h2>
              <p class="fs20">
                精选资产交易所产品、强大的智能分散技术、全面的账户保障体系、完善的安全防护措施、全方位法律保障。
              </p>
            </li>
            <li class="box-flex">
						<span class="circle"><i class="icons icons-service-2"></i>
						</span>
              <h2 class="fs24">
                太平洋保险
              </h2>
              <p class="fs20">
                太平洋保险将为咻咻理财的网络安全提供承保赔付服务，确保您的账户信息安全，避免遭受资金损失。
              </p>
            </li>
          </ul>
        </dd>
        <dd class="text-ct">
          <ul class="box">
            <li class="box-flex">
						<span class="circle"><i class="icons icons-service-3"></i>
						</span>
              <h2 class="fs24">
                信息安全认证
              </h2>
              <p class="fs20">
                目前咻咻理财已获得由公安部认证的国家信息安全等级保护制度第三级，确保您在简理财所有信息的保密安全。
              </p>
            </li>
            <li class="box-flex">
						<span class="circle"><i class="icons icons-service-4"></i>
						</span>
              <h2 class="fs24">
                优质资产
              </h2>
              <p class="fs20">
                咻咻理财所有资产在资产交易所均有备案，确保每一笔资产与资金的一一对应，且信息充分披露，让您投资更安心。
              </p>
            </li>
          </ul>
        </dd>
        <dd class="inOut-list">
          <i class="titles-index title-inOut title-service"></i>
        </dd>
      </dl>
    </section>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {licaiIndex} from '../../http/getDate'
  export default {
    name: "myFinance",
    data(){
      return {
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
        homeInfo: '',
        loading: true


      }
    },
  computed: {
  ...mapState([
      'basePath','location','userInfo'
    ]),
  },
    mounted(){
      this.initPage();
    },
    methods: {
      initPage(){
        //获取首页基本数据
        let _this = this;
        licaiIndex().then(res => {
          console.log(res);
          this.loading = false;
          this.banners = _this.handleBank(res.headimgs)
          this.homeInfo = res.zouzoulicai;

        })
      },
      handleBank(str){
        if( str && str.length > 0) {
          return str.split(';')
        } else {
          return ''
        }
      }
    },




  }
</script>

<style>

</style>
