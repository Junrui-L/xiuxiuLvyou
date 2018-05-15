<template>
    <div class="assessList">
      <HeadTop go-back='true' :headBg="true">
        <div slot="select-title" class="select-title" @click="">

          <span class="title_head black" >游客评价</span>

        </div>
      </HeadTop>
      <ul class="assess-container">
        <li class="no-assess" v-if="commenList.length === 0">暂无评论</li>
        <li class="assess-wrapper" v-for="item in commenList">
          <dl class="clearfix">
            <dt class="visitor-img fl"><img :src="item.visitorImg || defalutHead" alt=""></dt>
            <dd class="user-name fl">{{item.accoutnName}}</dd>
            <dd class="evlu-wrap fr"><EvaluateStar :code="item.score/2"></EvaluateStar></dd>
          </dl>
          <div class="time-name">{{item.created_at}} {{item.orderdoc}}</div>
          <div class="assess-txt">
            {{item.content}}
          </div>
          <ul class="img-wrapper clearfix">
            <li class="img-container" v-for="i in getStr(item.pjImgs)">
              <img :src="basePath + i" alt="">
            </li>
          </ul>
        </li>
        <!--<li class="assess-wrapper">-->
          <!--<dl class="clearfix">-->
            <!--<dt class="visitor-img fl"><img src="../../assets/img/taiwdy.png" alt=""></dt>-->
            <!--<dd class="user-name fl">苟富贵</dd>-->
            <!--<dd class="evlu-wrap fr"><EvaluateStar :code="3.5"></EvaluateStar></dd>-->
          <!--</dl>-->
          <!--<div class="time-name">2018-03-09 天安门一日游啊</div>-->
          <!--<div class="assess-txt">-->
            <!--萨德该如何让他居然还挺舒服-->
          <!--</div>-->
          <!--<ul class="img-wrapper clearfix">-->
            <!--&lt;!&ndash;<li class="img-container" v-for="i in getStr(img.imgs)">&ndash;&gt;-->
            <!--<li class="img-container">-->
              <!--&lt;!&ndash;<img :src="basePath + i" alt="">&ndash;&gt;-->
              <!--<img src="../../assets/img/home_list-1.jpg" alt="">-->
            <!--</li>-->
            <!--<li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>-->
            <!--<li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>-->
            <!--<li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>-->
          <!--</ul>-->
        <!--</li>-->
      </ul>

      <div v-if="commenList.length !== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>
      <loading v-show="loading"></loading>
    </div>
</template>

<script>
  import { mapState, mapMutations} from 'vuex'
  import { getAssessPlayList } from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import EvaluateStar from '../../components/EvaluateStar.vue'
    export default {
        name: "assesslist",
      data(){
          return {
            page: 1,
            playId: this.$route.query.playId,
            guideId: this.$route.query.guideId,
            commenList: [],
            nomore: false,
            loading: true,
            defalutHead: require('../../assets/img/defalutHead.jpg')
          }
      },
      computed: {
        ...mapState([
          'basePath'
        ]),
      },
      components: {
        EvaluateStar,
        HeadTop
      },
      mounted(){
          console.log(this.$route.query.playId)
        this.getList();
      },
      methods: {
        getList(){

          getAssessPlayList({guideId: this.guideId, playId: this.playId, page: this.page}).then(res => {
            console.log(res)
            if (res.list.length === 0) {
              if (this.page > 1) {
                this.nomore = true
              } else {
                this.commenList = res.list;
              }
            } else {
              this.commenList = res.list;
              console.log(this.commenList)
              if (res.list.length < 25) {
                this.nomore = true
              }
            }
            this.loading = false
          })
        },
        loadMore(){
          this.page++
          getAssessPlayList({guideId: this.guideId, playId: this.playId, page: this.page}).then(res => {
            console.log(res)
            // this.commenList = res.list
            if (res.list.length === 0) {
              if (this.page !== 1) {
                this.nomore = true
              }
            } else {
              this.commenList.push(...res.list)
              if (res.list.length < 25) {
                this.nomore = true
              }
            }
          })
        },
        getStr(str) {
          if( str && str != ''){
            let strList = str.split(';');
            strList =  trimSpace(strList)
            return strList;
          } else {
            return [];
          }

          function trimSpace(array){
            for(let i = 0 ;i<array.length;i++)
            {
              if(array[i] == "" || typeof(array[i]) == "undefined")
              {
                array.splice(i,1);
                i= i-1;
              }
            }
            return array;
          }
        }
      }
    }
</script>
