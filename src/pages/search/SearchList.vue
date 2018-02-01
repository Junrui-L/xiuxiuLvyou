/*Created by soft on 2018/1/7 */

<template>
  <div class="search_list">
    <div class="header clearfix">
      <section class="head_goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
          <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
        </svg>
      </section>
      <svg class="search-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
      </svg>
      <input type="search" v-model="seacrhInput" @input="cosol" placeholder="请尝试北京" class="search-input fl"/>
      <i v-if="seacrhInput != ''" class="delete" @click="clearInput"></i>
      <span class="fr search-btn" @click="getSearch">搜索</span>
    </div>
    <div class="search-list">
      <ul class="list-wrapper" v-if="resultList.length > 0">
        <li v-for="item in resultList" >
        <template v-if="item.type == 1">
          <router-link class="list-item local" :to="{path: '/scenicRegion' , query: { citySn: item.key}}">
            <i class="local"></i>{{item.name}}<span>, {{item.title}}</span>
          </router-link>
        </template>
        <template v-else-if="item.type == 2">
          <router-link class="list-item spot" :to="{path: '/scenicRegion' , query: { citySn: item.key}}">
            <i class="local"></i>{{item.name}}<span>, {{item.title}}</span>
          </router-link>
        </template>
        <template v-else-if="item.type == 3">
          <router-link class="list-item play"  :to="{path: '/guide', query: {scenicId: item.key }}">
            <i class="local"></i>{{item.name}}<span>, {{item.title}}</span>
          </router-link>
        </template>
          <template v-else-if="item.type == 4">
            <router-link class="list-item play" :to="{path: '/guide', query: {scenicId: item.key }}">
              <i class="local"></i>{{item.name}}<span>, {{item.title}}</span>
            </router-link>
          </template>
          <template v-else>
            <div class="list-item">
              <i class="local"></i>暂未查询相关信息
            </div>


          </template>
        </li>
      </ul>
      <div class="list-wrapper" v-else>
        <div class="list-item">暂无信息，请输入关键词搜索</div>
      </div>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import {searchScenicspots} from '../../http/getDate'
  import AlertTip from '../../components/alertTip.vue'

  export default {
    data() {
      return {
        seacrhInput: '',
        showAlert: false,
        resultList: [],
        alertText: '',

      }

    },
    components: {
      AlertTip,
    },
    mounted() {
    },
    methods: {
      getSearch() {
        searchScenicspots(this.seacrhInput).then((res) => {
          console.log(res)
          this.resultList = res.list;
        })
      },
      cosol(){
        this.$createDialog({
          type: 'alert',
          title: 'Alert',
          content: 'dialog content'
        }).show()
      },
      clearInput() {
        this.seacrhInput = '';
      },
      show() {
        this.showAlert = true;
        this.alertText = '请求成功';
      },
      closeTip() {
        this.showAlert = false;
      },

    }

  }
</script>

<style lang="scss">
  /*引入样式表*/

  .slier-item {
    width: 100%;
    height: 100%;
    background: #fea700;
    color: #fff;
  }

  .slier-item:nth-last-child(2) {
    background: #0000d0;
  }
</style>


