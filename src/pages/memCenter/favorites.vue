<template>
  <div class="favorites">
    <ul class="tab-wrap">
      <li class="tab-item" :class="currentTab=='guide' && 'active' " @click="clickTabItem('guide')"><span>向导</span></li>
      <li class="tab-item" :class="currentTab=='playway'&& 'active'" @click="clickTabItem('playway')"><span>玩法</span>
      </li>
      <li class="tab-item" :class="currentTab=='scenic'&& 'active'" @click="clickTabItem('scenic')"><span>景点</span></li>
    </ul>

    <div v-if="currentTab=='guide'" class="guide-wrapper">
      <ul class="guide-list">
        <li class="guide" v-for="gui in collectionList">
          <div class="guide-t clearfix">
            <div class="guide-img fl">
              <img :src="gui.userImg" alt="">
            </div>
            <div class="guide-detail fl">
              <h5 class="guide-name"><span class="fl">{{gui.userName}}</span><span class="fl guide-type">{{ gui.servicetype | guideTypeText }}</span></h5>
              <div class="region-level"><span>{{gui.wfcount}}种玩法 </span></div>
              <!--<div class="guide-star"><span>类别：</span>历史古迹、历史博物馆</div>-->
            </div>
          </div>
          <!--<div class="guide-txt">-->
            <!--<p>-->
              <!--这是一块神奇的大陆，欧扎加拉圣诞节来看啥地这是一块神奇的大陆，欧扎加拉圣诞节来看啥地-->
              <!--这是一块神奇的大陆，欧扎加拉圣诞节来看啥地方了卡收到积分跑文件发了-->
            <!--</p>-->
          <!--</div>-->
        </li>
      </ul>
      <div v-if="collectionList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>
    </div>

    <div v-if="currentTab=='playway'" class="playway-wrapper">
      <ul class="region-list">
        <li class="region" v-for="(item,index) in collectionList">
          <!--<router-link class="nav-link">-->
          <dl class="clearfix">
            <dt class="region-img fl">
              <img src="http://www.youdingsoft.com/fileUploadsmall/20171221222332828838.jpg" alt="">
            </dt>
            <dd class="region-detail fl">
              <div class="region-name"><span>闪电发货水电费华盛顿我饿水电费微微闪电发货水电费华盛顿我饿水电费微微闪电发货水电费华盛顿我饿水电费微微闪电发货水电费华盛顿我饿水电费微微</span>
              </div>
              <div class="region-price fr"><span>¥4,888</span>起/人</div>
            </dd>
          </dl>
          <div class="region-txt">
            <p>11111111111}</p>
          </div>
          <!--</router-link>-->
        </li>
      </ul>
    </div>

    <div v-if="currentTab=='scenic'" class="region-wrapper">
      <ul class="region-list">
        <li class="region" v-for="(item,index) in collectionList">
          <!--<router-link class="nav-link" :to= "{ name:'guide', query: {scenicId: item.id} }">-->
          <dl class="clearfix">
            <dt class="region-img fl">
              <img src="http://www.youdingsoft.com/fileUploadsmall/20171221222332828838.jpg" alt="">
            </dt>
            <dd class="region-detail fl">
              <h5 class="region-name"><span>1111</span></h5>
              <div class="region-level">111</div>
              <div class="region-category"><span>类别：</span>11</div>
            </dd>
          </dl>
          <div class="region-txt">
            <p>1111</p>
          </div>
          <!--</router-link>-->
        </li>

      </ul>
    </div>

    <!--我的收藏-->
  </div>
</template>

<script>
  import HeadTop from '../../components/HeadTop.vue'
  import {getCollectionList} from '../../http/getDate'

  export default {
    name: "my-favorites",
    data() {
      return {
        headBg: true,
        currentTab: 'playway',// 当前选择的Tab,
        page:1,
        type:1,
        nomore:false,
        collectionList: [],// 向导列表
      }
    },
    components: {
      HeadTop
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

      }
    }
  }
</script>

<style>

</style>
