<template>
    <div class="assessList">
      <HeadTop go-back='true' :headBg="true">
        <div slot="select-title" class="select-title" @click="">

          <span class="title_head black" >游客评价</span>

        </div>
      </HeadTop>
      <ul class="assess-container">
        <li class="assess-wrapper">
          <dl class="clearfix">
            <dt class="visitor-img fl"><img src="../../assets/img/taiwdy.png" alt=""></dt>
            <dd class="user-name fl">苟富贵</dd>
            <dd class="evlu-wrap fr"><EvaluateStar :code="3.5"></EvaluateStar></dd>
          </dl>
          <div class="time-name">2018-03-09 天安门一日游啊</div>
          <div class="assess-txt">
            萨德该如何让他居然还挺舒服
          </div>
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
        </li>
        <li class="assess-wrapper">
          <dl class="clearfix">
            <dt class="visitor-img fl"><img src="../../assets/img/taiwdy.png" alt=""></dt>
            <dd class="user-name fl">苟富贵</dd>
            <dd class="evlu-wrap fr"><EvaluateStar :code="3.5"></EvaluateStar></dd>
          </dl>
          <div class="time-name">2018-03-09 天安门一日游啊</div>
          <div class="assess-txt">
            萨德该如何让他居然还挺舒服
          </div>
          <ul class="img-wrapper clearfix">
            <!--<li class="img-container" v-for="i in getStr(img.imgs)">-->
            <li class="img-container">
              <!--<img :src="basePath + i" alt="">-->
              <img src="../../assets/img/home_list-1.jpg" alt="">
            </li>
            <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
            <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
            <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {guideHome} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import EvaluateStar from '../../components/EvaluateStar.vue'
    export default {
        name: "assesslist",
      data(){
          return {

          }
      },
      components: {
        EvaluateStar,
        HeadTop
      },
      mounted(){

      },
      methods: {

      }
    }
</script>
