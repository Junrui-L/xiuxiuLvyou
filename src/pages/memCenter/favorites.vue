<template>
  <div class="favorites">
    <ul class="tab-wrap">
      <li class="tab-item" :class="currentTab=='guide' && 'active' " @click="clickTabItem('guide')"><span>向导</span></li>
      <li class="tab-item" :class="currentTab=='playway'&& 'active'" @click="clickTabItem('playway')"><span>玩法</span>
      </li>
      <li class="tab-item" :class="currentTab=='scenic'&& 'active'" @click="clickTabItem('scenic')"><span>景点</span></li>
    </ul>

    <div v-if="currentTab=='guide'" class="guide-wrapper">
      <!--收藏导游-->
      <ul class="guide-list">
        <li class="guide" v-for="gui in collectionList">
          <router-link class="nav-link" :to="{path: '/guideDetail',  query: {id: gui.gzkey}}">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="gui.userImg" alt="">
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name"><span class="fl">{{gui.userName}}</span><span class="fl guide-type">{{ gui.servicetype | guideTypeText }}</span></h5>
              <div class="region-level"><span>{{gui.wfcount}}种玩法 </span></div>
     ·           <!--<div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>-->
            </div>
          </div>
        </router-link>
        </li>
      </ul>
      <div v-if="collectionList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>
    </div>

    <div v-if="currentTab=='playway'" class="playway-wrapper">
      <!--收藏玩法-->
      <ul class="methos-list">
        <li class="method" v-for="(item,index) in collectionList">
          <!--<router-link class="nav-link"
                     :to="{name: 'scenicDetail',  query: {playId: item.id, accountId: item.accountid}}">-->
          <dl class="clearfix methods">
            <dt class="method-img fl">
              <img :src="basePath + item.wfImg"  alt="">
            </dt>
            <dd class="method-detail fl">
              <div class="method-name">{{item.wfname}}</div>
              <div class="method-desc"><span>{{item.servicetype | servicetypeText}}</span> {{ item.servicecity}}
              </div>
              <div class="method-tip">类别：<span v-for="i in getStr(item.wfbq)">{{i}}</span></div>
            </dd>
          </dl>
          <!--</router-link>-->
        </li>
      </ul>
      <div v-if="collectionList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>
    </div>

    <div v-if="currentTab=='scenic'" class="region-wrapper">
      <!--收藏景点-->
      <ul class="region-list">
        <li class="region" v-for="(item,index) in collectionList">
          <router-link class="nav-link" :to= "{ name:'guide', query: {scenicId: item.gzkey} }">
          <dl class="clearfix">
          <dt class="region-img fl">
            <img :src="basePath + item.scenicImg" alt="">
          </dt>
          <dd class="region-detail fl">
            <h5 class="region-name"><span>{{item.name}}</span></h5>
            <div class="region-level">国家{{item.level}}A级景区</div>
            <div class="region-category"><span>类别：</span>{{item.typename}} <span v-if="item.distance">距离： {{item.distance | showDistance}} </span></div>
          </dd>
          </dl>
          </router-link>
        </li>
      </ul>
      <div v-if="collectionList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>
    </div>

    <!--我的收藏-->
  </div>
</template>

<script>
  import HeadTop from '../../components/HeadTop.vue'
  import {getCollectionList} from '../../http/getDate'
  import {mapState} from 'vuex'
  export default {
    name: "my-favorites",
    data() {
      return {
        headBg: true,
        currentTab: 'guide',// 当前选择的Tab,
        page:1,
        type:1,
        nomore:false,
        collectionList: [],// 向导列表
      }
    },
    computed: {
      ...mapState([
        'basePath'
      ]),
    },
    components: {
      HeadTop
    },
    mounted(){
      this.clickTabItem('guide');
    },
    methods: {
      // 获取向导列表
      queryList() {
        getCollectionList({page:this.page,type:this.type}).then(res=>{
          if (res.list.length === 0) {
            if (this.pages !== 1) {
              this.nomore = true
            }
          } else {
            this.collectionList = res.list;
            console.log(this.collectionList)
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      },
      // 点击tabitem
      clickTabItem(tabName) {
        this.currentTab = tabName
        this.page=1
        this.nomore = false
        if (tabName === 'guide') {
          this.type=1
          this.queryList()
        } else if (tabName === 'playway') {
          this.type=2
          this.queryList()
        } else if (tabName === 'scenic') {
          this.type=3
          this.queryList()
        }
      },
      loadMore(){

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

<style>

</style>
