<template>
    <div class="expandedList">
      <!--<div class="title">我的推广列表</div>-->
      <template v-for="da in expanList">
        <h3 class="title">
          <span>{{ da.month | fmt }}</span>
          <!--<a href="" class="more-link fr">查看更多-->
          <!--<svg>-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
          <!--</svg>-->
          <!--</a>-->
        </h3>
        <ul class="expan-list per-month">
          <li class="expan-item clearfix" v-for="item in da.data">
            <div class="time fl">
              <!--{{item.created_at | fmtDate('yyyy-MM-dd')}}-->
              <p class="date">{{item.created_at | fmtDate('MM-dd')}}</p>
              <p class="bz">{{item.created_at | fmtDate('hh:mm')}}</p>
            </div>
            <div class="img-wrap fl">
              <img :src="item.headimgurl" alt="">
              <!--<img :src="item.typeicon" alt="" />-->
            </div>
            <div class="desc fl">
              {{item.nickname}}
            </div>
            <span class="expan-num fr">推广人数 {{item.subordinateCout}}</span>

          </li>
        </ul>
      </template>
      <div v-if="expanList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>

    </div>
</template>

<script>
  import {userExpande} from '../../http/getDate'

    export default {
        name: "expanded-list",
        data(){
          return {
            expanList: [],
            pages: 1,
            monthMap: {},
            returnArr: [],
            nomore: false
          }
        },
        mounted() {
            this.getData(this.pages);
        },
        methods: {
          getData(p){
            userExpande(p).then(res => {
                  console.log(res);
                  // if(res.list.length > 0) {
                  //   this.expanList = this.groupData(res.list);
                  // }

              if (res.list.length === 0) {
                if (this.page > 1) {
                  this.nomore = true
                } else {
                  this.expanList =this.groupData(res.list);
                }
              } else {
                this.expanList = this.groupData(res.list);
                if (res.list.length < 25) {
                  this.nomore = true
                }
              }

            })
          },
          groupData(data){

              function getMonth (str) {
                let year = new Date(str).getFullYear();
                let month = new Date(str).getMonth() + 1;
                year = String(year)
                month = month > 9 ? String(month) : '0'+ month;
                  return year + month
              }

              function srotMonth(a,b) {
                return b - a
              }

              for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let currMon = getMonth(item.created_at.replace(/-/g,'/'))
                if (currMon in this.monthMap) {
                  this.monthMap[currMon].push(item)
                } else {
                  this.monthMap[currMon] = [item]
                }
              }

              for (let mo of Object.keys(this.monthMap).sort(srotMonth)) {
                this.returnArr.push({'month': mo, data: this.monthMap[mo]})
              }
              return this.returnArr;
            },
          // 加载更多
          loadMore() {
            this.pages++
            userExpande(this.pages).then(res => {
              if (res.list.length === 0) {
                if (this.pages !== 1) {
                  this.nomore = true
                }
              } else {
                this.expanList.push(...res.list)
                if (res.list.length < 25) {
                  this.nomore = true
                }
              }
            })
          }
        },
      filters: {
          fmt: function (val) {
            let a = val.split('');
            let b = a[0] + a[1] + a[2] + a[3] + '年' + a[4] + a[5] + '月';
            return b
          }
      }
    }
</script>

