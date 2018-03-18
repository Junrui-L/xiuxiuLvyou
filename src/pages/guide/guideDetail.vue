<template>
  <div class="guide_detail">
    <div class="guide-info clearfix">
      <ul class="guide-name fl">
        <li class="name">{{guideInfos.userName}} <span>{{guideInfos.agetype}}</span>
          <!--<span>{{guideInfos.signature}}</span>-->
        </li>
        <li class="certification">
          <span>导游已认证</span>
          <span>{{servicetype}}</span>
          <span>英语{{guideInfos.englishLevel}}级</span>
        </li>
      </ul>
      <div class="img-wrapper fr">
        <img :src="guideInfos.userImg" alt="">
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

    </ul>
    <div class="detail-container">
      <div class="about">
        <h3>关于我</h3>
        <p class="introduce " :class="{'clipFive': clipInroduce == true}">
          {{guideInfos.abstract}}
        </p>
        <span class="see-all" :class="{'hide': clipInroduce == false}"  @click="clipInroduce = false">查看全部</span>
      </div>
      <div class="tourist-eval">
        <h3 class="tite">游客评价</h3>

        <div class="all-command">
          <div class="command-tit clearfix">
            <p class="command-num">全部{{guideInfos.assess}}条评论</p>
            <EvaluateStar :code="guideInfos.level"></EvaluateStar> {{guideInfos.level}}分
            <span class="see-command" @click="$router.push({path: '/assessList',  query: {playId: '', guideId: guideInfos.visitorId}})">查看点评</span>
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
            <router-link class="nav-link" :to="{name: 'scenicDetail',  query: {playId: item.id, accountId: item.accountid}}">
              <dl class="clearfix">
                <dt class="method-img fl">
                  <img :src="basePath + item.wfimg" alt="">
                </dt>
                <dd class="method-detail fl">
                  <div class="method-name">{{item.wfname}}</div>
                  <div class="method-desc"><span>{{item.servicetype | servicetypeText}}</span> {{ item.servicecity}}</div>
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
        <button class="order-btn fr" @click="showChoosPopup">找我预约</button>
      </div>
    </div>
    <cube-popup type="plays-popup"  :center="false" ref="choosePopup">
      <div class="plays-content">
        <i class="close" @click="hideChoosePopup"></i>
        <h3 class="head-tit">
         选择玩法
        </h3>
        <ul class="choose-wrap">
          <li v-if="playList.length == 0" class="no-play">暂未发布玩法</li>
          <li v-else class="choose-item choose-playmethos clearfix" v-for="item in playList" @click="$router.push({name: 'scenicDetail',  query: {playId: item.id, accountId: item.accountid}})">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {guideHome} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import EvaluateStar from '../../components/EvaluateStar.vue'
  export default {
    data() {
      return {
        clipInroduce: true,
        guideInfos: [],
        playList: []
      }
    },
    computed: {
      ...mapState([
        'basePath','location','userInfo', 'baseOrder','guideInfo','play'
      ]),
      servicetype: function(){
        let type = this.guideInfos.servicetype
        if(type == 1) {
          return '向导服务类型'
        } else if(type == 2) {
          return '当地游玩类型'
        } else if(type == 3) {
          return '专线游类型'
        }
      },
      ability: function () {
        return this.guideInfos.ability;
      }
    },
    components: {
      HeadTop,
      EvaluateStar
    },
    mounted() {
        //请求当前导游详情，玩法列表
        this.getGuideHome(this.$route.query.id)
    },
    methods: {
      getGuideHome(guideId) {

        guideHome(guideId).then(res=> {
          this.guideInfos = res.guide;
          console.log(this.guideInfos)
          this.playList = res.playlist;
          console.log(this.playList)
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
      toOrder(){
        this.$router.push({path: '/orderDetail', query: {guideId: this.$route.params.id}})
      },
      getStr(str) {
        if( str && str != ''){
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
