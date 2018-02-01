<template>
  <div class="guide_detail">
    <HeadTop go-back='true' :headBg="headBg">
    </HeadTop>
    <div class="guide-info clearfix">
      <ul class="guide-name fl">
        <li class="name">{{guideInfo.userName}} <span>{{guideInfo.agetype}}</span><span>{{guideInfo.signature}}</span></li>
        <li class="certification">
          <span>导游已认证</span>
          <span>{{servicetype}}</span>
          <span>英语{{guideInfo.englishLevel}}</span>
        </li>
      </ul>
      <div class="img-wrapper fr">
        <img :src="guideInfo.userImg" alt="">
      </div>
    </div>
    <ul class="guide-date clearfix">
      <li class="date-item fl">
        <strong>3600</strong>
        <p>浏览量</p>
      </li>
      <li class="date-item fl">
        <strong>{{guideInfo.fwcount}}</strong>
        <p>接单量</p>
      </li>
      <li class="date-item fl">
        <strong>89%</strong>
        <p>回复率</p>
      </li>

    </ul>
    <div class="detail-container">
      <div class="about">
        <h3>关于我</h3>
        <p class="introduce " :class="{'clipFive': clipInroduce == true}">
          {{guideInfo.abstract}}
        </p>
        <span class="see-all" :class="{'hide': clipInroduce == false}"  @click="clipInroduce = false">查看全部</span>
      </div>
      <div class="tourist-eval">
        <h3 class="tite">游客评价</h3>

        <div class="all-command">
          <div class="command-tit  clearfix">

            <p class="command-num">全部{{guideInfo.assess}}条评论</p>
            <EvaluateStar :code="guideInfo.level"></EvaluateStar> {{guideInfo.level}}分
            <span class="see-command">查看点评</span>
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

      <div class="other-playmethos">
        <h3 class="tite">向导其他玩法</h3>
        <ul class="methos-wrapper">
          <li class="methods" v-for="item in playList">
            <router-link class="nav-link" to="scenicRegion">
              <dl class="clearfix">
                <dt class="method-img fl">
                  <img :src="getImgUrl(item.ywimg)" alt="">
                </dt>
                <dd class="method-detail fl">
                  <div class="method-desc">{{item.wfjs}}</div>
                  <div class="method-price">￥{{item.minprice}}起/人</div>
                </dd>
              </dl>
              <div class="method-txt">
                <p>
                  {{item.xdtx}}
                </p>
              </div>
            </router-link>
          </li>
          <!--<li class="methods" >-->
            <!--<router-link class="nav-link" to="scenicRegion">-->
              <!--<dl class="clearfix">-->
                <!--<dt class="method-img fl">-->
                  <!--<img src="../../assets/img/tttt.png" alt="">-->
                <!--</dt>-->
                <!--<dd class="method-detail fl">-->
                  <!--<div class="method-desc">这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地-->
                    <!--这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收</div>-->
                  <!--<div class="method-price">￥4997起/人</div>-->
                <!--</dd>-->
              <!--</dl>-->
              <!--<div class="method-txt">-->
                <!--<p>-->
                  <!--这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地-->

                  <!--这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了啊打发-->
                <!--</p>-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</li>-->

        </ul>
      </div>

    </div>
    <div class="secnic-footer ">
      <div class="clearfix">
        <div class="fucc fl">
          <span class="favarate">收藏</span>
          <span class="chat">咨询</span>
        </div>
        <button class="order-btn fr" @click="toOrder">找我预订</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {guideHome} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import EvaluateStar from '../../components/EvaluateStar.vue'
  export default {
    data() {
      return {
        headBg: true,
        clipInroduce: true,
        guideInfo: [],
        playList: []
      }
    },
    computed: {
      servicetype: function(){
        let type = this.guideInfo.servicetype
        if(type == 1) {
          return '向导服务类型'
        } else if(type == 2) {
          return '当地游玩类型'
        } else if(type == 3) {
          return '专线游类型'
        }
      },
      ability: function () {
        return this.guideInfo.ability;
      }
    },
    components: {
      HeadTop,
      EvaluateStar
    },
    mounted() {
      console.log(this.$route.params.id)
        this.getGuideHome(1)
    },
    methods: {
      getGuideHome(guideId) {

        guideHome(guideId).then(res=> {
          this.guideInfo = res.guide;
          console.log(this.guideInfo)
          this.playList = res.playlist;
          console.log(this.playList)
        })
      },
      toOrder(){
        this.$router.push({path: '/orderDetail', query: {guideId: this.$route.params.id}})
      },
      getImgUrl(url, mode) {
        let baseUrl = 'http://www.youdingsoft.com/';
        let dUrl = url.split('/')[1];
        switch (mode) {
          case 'small':
            return baseUrl + 'fileUploadsmall/' + dUrl;
          case 'middle':
            return baseUrl + 'fileUploadmedium/' + dUrl;
          case 'orgin':
            return baseUrl + 'fileUpload/' + dUrl;
          default:
            return baseUrl + 'fileUpload/' + dUrl
        }
      }
    },

  }
</script>

<style lang="scss">

</style>
