<template>
  <div class="memberCenter">
    <header class="header">
      <div class="hd">
        <router-link to="/memberInfo">
        <div class="img-wrapper fl"><img :src="userInfo.headimgurl" alt=""></div>
        <span class="username fl">{{userInfo.userName || '--'}}

          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
        </router-link>
        <div class="message" @click="$router.push({path: '/chatList', query: {from_username: currentUserName}})"></div>
      </div>
      <ul class="mem-wrap clearfix">
        <router-link tag="li" to="/scores" class="mem-item fl">
          <div>{{userInfo.tourismScore || 0}}</div>
          <p>积分</p>
        </router-link>
        <router-link tag="li" to="/coupons" class="mem-item fl">
          <div>{{userInfo.yhjcount || 0}}</div>
          <p>优惠券</p>
        </router-link>
        <router-link tag="li" to="/favorites" class="mem-item fl">
          <div>{{userInfo.collect || 0}}</div>
          <p>收藏</p>
        </router-link>
        <router-link tag="li" to="/myWallet" class="mem-item fl">
          <div>{{userInfo.accountBalance || 0}}</div>
          <p>钱包</p>
        </router-link>
      </ul>
    </header>
    <div class="order-container">
      <ul class="tab-wrap">
        <li class="ordertab" :class="currentTab=='all' && 'active' " @click="clickOrderStateTab('all')"><span>全部</span>
        </li>
        <li class="ordertab" :class="currentTab=='waitpay'&& 'active'" @click="clickOrderStateTab('waitpay')">
          <span>待付款</span></li>
        <li class="ordertab" :class="currentTab=='doing'&& 'active'" @click="clickOrderStateTab('doing')">
          <span>进行中</span></li>
        <li class="ordertab" :class="currentTab=='waitEvaluate'&& 'active'" @click="clickOrderStateTab('waitEvaluate')">
          <span> 待评价</span>
        </li>
        <li class="ordertab" :class="currentTab=='haveCancle'&& 'active'" @click="clickOrderStateTab('haveCancle')">
          <span>已取消</span>
        </li>
      </ul>
      <div class="order-list">
        <p class="no_data_text" v-if="orderList.length===0">暂无数据</p>
        <div class="order-list-item" v-for="v in orderList">
          <div class="order-item clearfix" @click="$router.push({path: '/order' , query: { orderNum: v.ordernumber}})">
            <p class="fl h44">出行时间：{{v.godate}} （{{v.playDay}} 天）</p>
            <p class="fr  h44 orderstate">{{v.status | orderStateText}}</p>
            <div class="scenicInfo fl">
              <img :src="basePath + v.orderplayImg"/>
              <div class="desc">
                <p class="title">{{v.username}}</p>
                <p class="payway">{{v.wfname}}</p>
                <p class="playway">{{v.orderMode}}</p>
              </div>
            </div>
            <div class="order-info fl">
              <p><span>下单时间</span><span class="fr">{{v.created_at}}</span></p>
              <p><span>人数</span><span class="fr">{{v.tripsnum}}人</span></p>
              <p><span>总价</span><span class="fr">{{v.orderSumPrice}}元</span></p>
            </div>
          </div>

            <div class="fr">
              <button class="order-handle-btn" v-if="v.status===0" @click="cancleOrderConfirm(v)" >取消订单</button>
            <button class="to-pay" v-if="v.status===1">
              <router-link :to="{path: '/order' , query: { orderNum: v.ordernumber}}">去付款</router-link>
            </button>
            <button class="order-handle-btn red" v-if="v.status===2|| v.status===3|| v.status===4 ||v.status===5 ">联系向导</button>
            <button class="order-handle-btn" v-if="v.status===6" @click="$router.push({path: '/comment' , query: { orderNum: v.ordernumber}})">去评价</button>
            <button class="order-handle-btn" v-if="v.status===9">
              <router-link :to="{path : '/scenicDetail',query: {playId:v.playid,accountId: v.userid}}">
              重新下单
              </router-link>
            </button>
          </div>
        </div>
      </div>
      <div v-if="orderList.length!== 0">
        <p class="load-more" v-show="!nomore" @click="loadMore">加载更多</p>
        <p class="load-more" v-show="nomore">没有更多了</p>
      </div>

    </div>
    <CancelBox v-if="showCancel" confirmText="请输入取消原因" :showCancelBox = "showCancel" @closeTip = ' shows '  @confirmCancel="cancelOdr"></CancelBox>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {userLogin, userPersonal, cancelOrder, getMyOrderList, userAccounts} from '../../http/getDate'
  import CancelBox from '../../components/cancelBox.vue'

  export default {
    name: "member-center",
    data() {
      return {
        userInfo: {  // 用户信息对象
          headimgurl: '',
          userName: '',
          tourismScore: 0,
          yhjcount: 0,
          collect: 0,
          accountBalance: 0,
        },
        ordernum: '',
        showCancel: false,
        staticNum: {},// 统计数字,积分,优惠券
        currentTab: 'doing',// 当前选中的订单tab
        orderList: [],// 订单列表
        tabMap: {'all': 0, 'waitpay': 1, 'doing': 2, 'waitEvaluate': 3, 'haveCancle': 4},
        page: 1,
        nomore: false,
        loading: true,
        currentUserName:'1', // 当前登录人的环信账号
      }
    },
    components: {
      CancelBox
    },
    computed: {
      ...mapState([
        'basePath'
      ]),
    },
    mounted() {
        console.log('---登录----')
        this.getUserInfo();
        this.getOrderList()
        this.queryWallet()
    },
    methods: {
      // 获取订单列表
      getOrderList() {
        getMyOrderList({page: this.page, status: this.tabMap[this.currentTab]}).then(res => {
          if (res.list.length === 0) {
            if (this.page > 1) {
              this.nomore = true
            } else {
              this.orderList = res.list;
            }
          } else {
            this.orderList = res.list;
            console.log(this.orderList)
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      },
      // TODO 获取个人信息 需要知道当前用户的环信账号
      getUserInfo() {
        userPersonal().then(res => {
          this.userInfo.headimgurl = res.headimgurl
          this.userInfo.userName = res.userName
          this.userInfo.tourismScore = res.tourismScore
          this.userInfo.yhjcount = res.yhjcount
          this.userInfo.collect = res.collect
          this.loading = false
        })
      },
      // 取消订单
      cancleOrderConfirm(obj){
        this.$createDialog({
          type: 'confirm',
          title: '取消订单',
          content: '确定取消该订单吗？',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            console.log('确认取消订单')
            //TODO: 按单号取消订单
            //取消订单
            this.showCancelList(obj.ordernumber);
            this.ordernum = obj.ordernumber;
          }
        }).show()
      },
      // 点击订单状态Tab
      clickOrderStateTab(currentTab) {
        this.currentTab = currentTab
        this.page = 1
        this.nomore = false
        this.getOrderList()
      },
      shows(msg){
        this.showCancel = false;
        // console.log(this.showCancel)

      },
      showCancelList(orderNo){
        console.log('是否取消订单')
        let orderNom  = orderNo;
        this.$createActionSheet({
          title: '取消原因',
          data: [
            {
              content: '太久没人接单',
              type: 1,
              align: 'left'
            },
            {
              content: '微信没钱付款',
              type:2,
              align: 'left'

            },
            {
              content: '行程有变',
              type:3,
              align: 'left'
            },
            {
              content: '价格太贵',
              type:4,
              align: 'left'
            },
            {
              content: '玩法不满意',
              type:5,
              align: 'left'
            },
            {
              content: '向导态度不好',
              type:6,
              align: 'left'
            },{
              content: '向导带导不满足我要求',
              type:7,
              align: 'left'
            },
            {
              content: '其他',
              type:8,
              align: 'left'
            },

          ],
          onSelect: (item, index) => {
            if(index == 7) {
              this.showCancel = true;
            } else {
              console.log('订单取消原因' + item.content + orderNom)
              this.cancelOdr( item.content, orderNom )
            }
          },
          onCancel: () => {
            console.log('取消了')
          }
        }).show();

      },
      // 取消订单
      cancelOdr(msg) {
        console.log(msg)
        if(this.showCancel) {
          this.showCancel = false
        }
        cancelOrder(this.ordernum, msg).then(res => {
          if (res.msg) {
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: res.msg
            }).show()
          } else {
            this.$createToast({
              txt: '取消成功',
              type: 'correct',
              mask: true,
              time: 2000
            }).show();
            setTimeout(()=> {
              this.getUserInfo();
              this.getOrderList();
              this.queryWallet();
            }, 1000)
          }
        })
      },
      // 查询钱包
      queryWallet(){
        userAccounts().then(res => {
          this.userInfo.accountBalance = res.capital.accountBalance
        })
      },
      // 加载更多
      loadMore() {
        this.page++
        getMyOrderList({page: this.page, status: this.tabMap[this.currentTab]}).then(res => {
          if (res.list.length === 0) {
            if (this.page !== 1) {
              this.nomore = true
            }
          } else {
            this.orderList.push(...res.list)
            if (res.list.length < 25) {
              this.nomore = true
            }
          }
        })
      }
    },
  }
</script>
