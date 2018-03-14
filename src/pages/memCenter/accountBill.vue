<template>
  <div class="accountBill">
    <HeadTop go-back='true' :headBg="true">
      <div slot="select-title" class="select-title" >

        <span class="title_head black" >账单</span>

      </div>
      <div slot="message" class="selects fr" @click="selectPicker.show()"><button class="select-bill">筛选</button></div>
    </HeadTop>
    <div class="no-bill" v-if="billList.length === 0">暂无账单</div>
    <template v-for="da in billList">
    <h3 class="title">
      <span>{{ da.month | fmt }}</span>
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
          <p class="num"> {{ item.type | adderSubtractor('symbol')}}{{item.profitLossMoney}}</p>
          <p class="bz">
            {{ item.type | adderSubtractor('txt')}}
            <!--{{ item.title }}-->
          </p>
        </div>
        <span class="balance fr">余额：{{item.currentBlance}}</span>
      </div>
    </div>
    </template>
    <div v-if="billList.length!== 0">
      <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
      <p class="load-more" v-show="nomore">没有更多了</p>
    </div>
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
  import HeadTop from '../../components/HeadTop.vue'
  import AccountDetail from '../../components/accountDetail.vue'
  export default {
    name: "account-bill",
    data() {
      return {
        selects:[{value: '',text: '全部类别'},{value: 1,text: '出行消费'},{value: 2,text: '接单带导收益'},
          {value: 3,text: '团游返折价/退单返款'},{value: 4,text: '推广返利'},
          {value: 5,text: '充值入款'},{value: 6,text: '提现账单'},
          {value: 7,text: '其他'}
        ] ,
        currentSelect: '',
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
      AccountDetail,
      HeadTop
    },
    mounted(){
      console.log('---登录----')
      this.getUserBill();
      this.selectPicker = this.$createPicker({
        title: '账单类别',
        data: [this.selects],
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      getUserBill() {
        userBill(this.pageNo, this.currentSelect).then(res => {
          console.log(res);
          if (res.list.length === 0) {
            if (this.pageNo > 1) {
              this.nomore = true
            } else {
              this.billList = this.groupData(res.list);
            }
          } else {
            this.billList = this.groupData(res.list);
            console.log(this.billList)
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      },
      selectHandle(v, i, t){
        this.pageNo = 1;
        this.currentSelect = v[0];
        this.nomore = false
        console.log(this.currentSelect);
        this.billList = []
        this.monthMap={}
        this.returnArr= []
        this.getUserBill();
      },
      cancelHandle(){
        console.log('取消了')
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
      loadMore(){
        this.pageNo++
        userBill(this.pageNo, this.currentSelect).then(res => {
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
