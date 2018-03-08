<template>
  <div class="accountBill">
    <template v-for="da in billList">
    <h3 class="title">
      <span>{{ da.month | fmt }}</span>
      <!--<a href="" class="more-link fr">查看更多-->
          <!--<svg>-->
        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
      <!--</svg>-->
      <!--</a>-->
    </h3>
    <div class="bill-list per-month">
      <div class="bill-item clearfix" v-for="(item, index) in da.data" @click="showDet(item)">
        <div class="time fl">
          <p class="date">{{item.created_at | fmtDate('MM-dd')}}</p>
          <p class="bz">{{item.created_at | fmtDate('hh:mm')}}</p>
        </div>
        <div class="img-wrap fl">
          <!--<img src="../../assets/img/taiwdy.png" alt="">-->
          <img :src="item.typeicon" alt="" />
        </div>
        <div class="money fl">
          <p class="num">-{{item.profitLossMoney}}</p>
          <p class="bz">
            <template v-if="item.type == 1">出行消费</template>
            <template v-if="item.type == 2">接单带导收益</template>
            <template v-if="item.type == 3">团游返折价/退单返款</template>
            <template v-if="item.type == 4">推广返利</template>
            <template v-if="item.type == 5">充值入款</template>
            <template v-if="item.type == 6">提现账单</template>
            <template v-if="item.type == 7">其他</template>
          </p>
        </div>
        <span class="balance fr">余额：{{item.lastBlance}}</span>
      </div>
    </div>
    </template>
    <transition name="slide-in">
      <div class="account-detail" v-show="showDetail">
        <div class='head_bak'>
          <section class="head_goback"  @click="showDetail = false">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
              <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
            </svg>
          </section>
          <section class="title_head ellipsis">
            <span class="title_text">账单详情</span>
          </section>
        </div>
        <AccountDetail :billDetail = "billChoose"></AccountDetail>
      </div>
    </transition>
  </div>
</template>

<script>
  import {userBill, userLogin} from '../../http/getDate'
  import AccountDetail from '../../components/accountDetail.vue'
  export default {
    name: "account-bill",
    data() {
      return {
        pageNo: 1,
        billList: [],
        showDetail: false,
        billChoose: {},
        nomore:false,
        monthMap:{},
        returnArr:[]
      }
    },
    components: {
      AccountDetail
    },
    mounted(){
      console.log('---登录----')
      this.getUserBill();

    },
    methods: {
      getUserBill() {
        userBill(this.pageNo, 1).then(res => {
          console.log(res)
//          this.billList = res.list;

          if (res.list.length === 0) {
            if (this.pageNo > 1) {
              this.nomore = true
            } else {
              this.billList =this.groupData(res.list);
            }
          } else {
            this.billList = this.groupData(res.list);
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
          if(item.created_at){
            let currMon = getMonth(item.created_at.replace(/-/g,'/'))
            if (currMon in this.monthMap) {
              this.monthMap[currMon].push(item)
            } else {
              this.monthMap[currMon] = [item]
            }
          }
        }

        for (let mo of Object.keys(this.monthMap).sort(srotMonth)) {
          this.returnArr.push({'month': mo, data: this.monthMap[mo]})
        }
        return this.returnArr;
      },
      showDet(item) {
//        this.$router.push({path:'/accountDetail', query: {ordernumber:this.billList[index].ordernumber}})
        this.billChoose = item;
        this.showDetail = true;
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

<style >

</style>
