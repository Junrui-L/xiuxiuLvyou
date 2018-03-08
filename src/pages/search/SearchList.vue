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
      <input type="search" v-model="seacrhInput" @input="checkInput" placeholder="请尝试北京" class="search-input fl"/>
      <i v-if="seacrhInput != ''" class="delete" @click="clearInput"></i>
      <span class="fr search-btn" @click.prevent="getSearch('')">搜索</span>
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
      <section class="search_history" v-if="searchHistory.length&&showHistory">
        <h4 class="title_restaurant">搜索历史</h4>
        <ul>
          <li v-for="(item, index) in searchHistory" :key="index" class="history_list">
            <span class="history_text ellipsis" @click="getSearch(item)">{{item}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
              <line x1="8" y1="8" x2="28" y2="28" style="stroke:#999;stroke-width:3" />
              <line x1="28" y1="8" x2="8" y2="28" style="stroke:#999;stroke-width:3" />
            </svg>
          </li>
        </ul>
        <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
      </section>
      <div class="list-wrapper" v-if="emptyResult">
        <div class="list-item">很抱歉！暂无搜索结果</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {searchScenicspots} from '../../http/getDate'
  import {localStore} from '../../config/myUtils'
  let locHistory =  localStore('searchWord', 'localStorage')
  export default {
    data() {
      return {
        seacrhInput: '',
        showAlert: false,
        resultList: [],
        searchHistory: [],
        showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
        emptyResult: false, // 搜索结果为空时显示
      }

    },
    mounted() {
      if (locHistory.get('searchWord')) {
        this.searchHistory = locHistory.get('searchWord');
      }
    },
    methods: {
      getSearch(historyValue) {
        if (historyValue) {
          this.seacrhInput = historyValue;
        }else if (!this.seacrhInput) {
          return
        }
        searchScenicspots(this.seacrhInput).then((res) => {
          console.log(res);
          this.showHistory = false;
          this.resultList = res.list;
          this.emptyResult = !this.resultList.length;

          let history = locHistory.get('searchWord');
          console.log(history)
          if(history) {
            let checkrepeat = false;
            this.searchHistory = history;
            this.searchHistory.forEach(item => {
              if (item == this.seacrhInput) {
                checkrepeat = true;
              }
            })
            if (!checkrepeat) {
              if(this.seacrhInput != '') {
                this.searchHistory.push(this.seacrhInput)
              }

            }
          } else {
            if(this.seacrhInput != '') {
              this.searchHistory.push(this.seacrhInput)
            }

          }
          locHistory.set('searchWord', this.searchHistory)
        })
      },
      clearInput() {
        this.seacrhInput = '';
        this.showHistory = true; //显示历史记录
        this.resultList = []; //清空搜索结果
        this.emptyResult = false; //隐藏搜索为空提示
      },
      //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
      checkInput(){
        if (this.seacrhInput === '') {
          this.showHistory = true; //显示历史记录
          this.resultList = []; //清空搜索结果
          this.emptyResult = false; //隐藏搜索为空提示
        }
      },
      //点击删除按钮，删除当前历史记录
      deleteHistory(index){
        this.searchHistory.splice(index, 1);
        locHistory.set('searchWord',this.searchHistory);
      },
      //清除所有历史记录
      clearAllHistory(){
        this.searchHistory = [];
        locHistory.set('searchWord',this.searchHistory);
      }

    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // 让下个页面不缓存，即刷新
      next();
    }

  }
</script>

<style lang="scss">
  /*引入样式表*/

</style>


