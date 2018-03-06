<template>
    <div class="expandedList">
      <!--<div class="title">我的推广列表</div>-->
      <h3 class="title">
        <span>本月</span>
        <!--<a href="" class="more-link fr">查看更多-->
          <!--<svg>-->
            <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
          <!--</svg>-->
        <!--</a>-->
      </h3>
      <ul class="expan-list per-month">
        <li class="expan-item clearfix" v-for="item in expanList">
          <div class="time fl">
            {{item.created_at | fmtDate('yyyy-MM-dd')}}
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

    </div>
</template>

<script>
  import {userExpande} from '../../http/getDate'
    export default {
        name: "expanded-list",
        data(){
          return {
            expanList: [],
            pages: 1
          }
        },
        mounted() {
            this.getData(this.pages);
        },
        methods: {
          getData(p){
            userExpande(p).then(res => {
                  console.log(res);
                  this.expanList = res.list;
            })
          }
        }
    }
</script>

