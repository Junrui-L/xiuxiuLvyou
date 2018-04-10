<template>
  <div class="order">
    <template v-if="orderInfo.status == 0">
      <div class="header">
        <div class="order-state">
          已下单待接单
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <!--<TimeCountDown :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">
          <button class="cancel btn fl" @click="showCancel = true">取消订单</button>
          <button class="confirm btn fr" @click="waitGuide">联系向导</button>
        </div>
      </div>
    </template>

    <template v-else-if="orderInfo.status == 1">
      <div class="header">
        <div class="order-state">
          已接单待付款
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <TimeCountDown :endTime="endT"  :countCallback="endLog"/>
        <div class="btn-topay clearfix">
          <button class="cancel btn fl" @click="showCancel = true">取消订单</button>
          <button class=" btn fr" @click="goPay">去付款</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 2 || orderInfo.status == 3">
      <div class="header">
        <div class="order-state">
          汇合中
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <TimeCountUp :startTime="payT" countText="汇合已耗时"  :countCallback="endLog"/>
        <div class="btn-topay btn-triped clearfix">
          <button class="cancel btn fl" @click="showCancel = true">取消订单</button>
          <button class="backpay btn fl" @click="updateOrder(4)">已接待</button>
          <button class="backpay btn fr" @click="updateOrder(5)">已出行</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 4">

      <div class="header">
        <div class="order-state">
          已接待准备出行中
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">
          <button class="backpay btn"  @click="updateOrder(5)">已出行</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 5">
      <div class="header">
        <div class="order-state">
          出行中
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <TimeCountUp :startTime="startGoT" countText="出行已耗时"  :countCallback="endLog"/>
        <div class="btn-topay clearfix">

          <button class="backpay btn" @click="updateOrder(6)">出行结束</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 6">

      <div class="header">
        <div class="order-state">
          行程结束
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <div class="btn-triped clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="onemore btn " @click="$router.push({path : '/scenicDetail',query: {playId:orderInfo.playid, accountId: orderInfo.accountid}})">再游一场</button>
          <button class="evalu btn fr" @click="$router.push({name: 'comment'})">评价</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 7">

      <div class="header">
        <div class="order-state">
          已评价
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr" @click="tripMore">再游一场</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 8">
      <div class="header">
        <div class="order-state">
          行程已完成
        </div>
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr" @click="tripMore">再游一场</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 9">
      <div class="header">
        <div class="order-state">
          已取消
        </div>
        <div>
          <div class="btn-triped  clearfix">
            <button class="backpay btn " @click="tripMore">重新下单</button>
          </div>
          <ul class="cancel-info">
            <li class="cancel-item clearfix">取消方 <span class="fr">{{orderInfo.canceltype | cancleTxt}}</span></li>
            <li class="cancel-item clearfix">取消时间 <span class="fr">{{orderInfo.canceltime}}</span></li>
            <li class="cancel-item clearfix">取消原因 <span class="cancel-rea fr">{{orderInfo.canceltitle || '其他原因'}}</span></li>
            <li class="cancel-item clearfix">退款金额 <span class="fr">￥{{orderInfo.refundMoney || 0}}</span></li>
            <li class="cancel-item clearfix">取消违约费 <span class="fr">￥{{orderInfo.kmoney || 0}}</span></li>
          </ul>
        </div>

      </div>
    </template>
    <template v-else-if="orderInfo.status == 10">

      <div class="header">
        <div class="order-state">
          退款处理中
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr">确认到达</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 11">

      <div class="header">
        <div class="order-state">
          已退款
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <div class="btn-topay clearfix">
          <button class="backpay btn ">重新下单</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 12">
      <div class="header">
        <div class="order-state">
          已拒绝
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
        </div>
      </div>
    </template>
    <div class="guide-info clearfix">
      <div class="guide-img fl">
        <img :src="basePath + orderInfo.orderplayImg" alt="">
      </div>
      <dl class="guide-detail fl">
        <dt class="guide-name">{{orderInfo.username}} <span  v-if="orderInfo.status > 1" class="message"></span></dt>
        <dd class="guide-scenic"><span>{{orderInfo.playaddre}}</span><span>{{orderInfo.servicetype | servicetypeText }}</span></dd>
        <dd class="guide-mode">
          <span> {{orderInfo.wfname}} ({{ orderInfo.orderMode}}) </span>
          {{orderInfo.tytype | tymodeText }}
          <template v-if="orderInfo.tymode === 0">
            (平分模式)
          </template>
          <template v-else-if="orderInfo.tymode === 1">
            (固定折扣模式)
          </template>
          <template v-else-if="orderInfo.tymode === 2">
            (剃分模式)
          </template>
        </dd>
      </dl>
    </div>
    <div class="order-info">
      <h3 class="title">订单信息</h3>
      <ul class="order-list">
        <li class="info-item clearfix">联系人 <span class="fr">{{orderInfo.limkman}}</span></li>
        <li class="info-item clearfix" >联系电话 <span class="fr">{{orderInfo.linkPhone}}</span></li>
        <li class="info-item clearfix">游玩天数 <span class="fr">{{ orderInfo.playDay }} 天</span></li>
        <li class="info-item clearfix">游玩日期 <span class="fr">{{ orderInfo.godate }}</span></li>
        <li class="info-item clearfix">结束日期 <span class="fr">{{ orderInfo.godate }}</span></li>
        <li class="info-item clearfix">出行人数 <span class="fr">{{ orderInfo.tripsnum}} 人</span></li>
        <li class="info-item clearfix">是否团游 <span class="fr">{{orderInfo.sfty == 1 ? '是' : '否'}}</span>
        </li>
      </ul>
    </div>
    <div class="order-price">
      <ul class="trip-meal">
        <li class="price-item meal-n clearfix">
          <span class="fl">游玩套餐</span>
          <div class="price fr">
            <p>{{orderInfo.packagename}}</p>
            <p class="price-num">￥{{orderInfo.packagePrice}} X {{ orderInfo.tripsnum}}</p>
          </div>
        </li>
        <li class="price-item meal-n clearfix">
          <span class="fl">门票套餐</span>
          <div class="price fr">
            <p>{{orderInfo.ticketpackage}}</p>
            <p class="price-num">￥{{orderInfo.ticketpackageprice}} X {{ orderInfo.ticketpackagecount}}</p>
          </div>
        </li>
        <li class="price-item coupon clearfix">
          <span class="fl">优惠券</span>
          <div class="price fr">
            <p>{{orderInfo.yhj_name ? orderInfo.yhj_name : '无'}}</p>
            <p class="price-num">￥ {{orderInfo.yh_price ? orderInfo.yh_price : 0 }}</p>
          </div>

        </li>
        <li class="price-item coupon clearfix">
          <span class="fl">小 费</span>
          <div class="price fr">
            <p> </p>
            <p class="price-num">￥ {{orderInfo.tipamount ? orderInfo.tipamount : 0 }}</p>
          </div>

        </li>

        <li class="total-pay">
          小计 <span class="total-num fr">￥{{orderInfo.payPrice}}</span>
        </li>
      </ul>
    </div>
    <ul class="order-check">
      <li class="check-item">订单号 <span class="fr">{{orderInfo.ordernumber}}</span></li>
      <li class="check-item">订单时间 <span class="fr">{{orderInfo.created_at}}</span></li>
      <li class="check-item" v-if="orderInfo.playmoneyType != null">支付方式 <span class="fr">
          <template v-if="orderInfo.playmoneyType == 0">
              余额支付
            </template>
            <template v-else-if="orderInfo.playmoneyType == 1">
              微信支付
            </template>

        </span></li>
      <template v-if="orderInfo.sfty == 1">
        <li class="check-item clearfix"  v-if="orderInfo.status == 0 || orderInfo.status == 1 || orderInfo.status == 2 || orderInfo.status == 3 || orderInfo.status == 4" > 团游优惠 <span class="group-count fr">团正在确认中，出行后将会统计团友人数和价格。</span></li>
        <li class="check-item clearfix"  v-if="orderInfo.status == 5 " > 团游优惠 <span class="group-count fr">总共人游，打{{orderInfo.tyval}}折 共优惠**元（XX*XX*XX）订单完成后将会按优惠价格自动返到个人账户中</span></li>
        <li class="check-item clearfix"  v-if="orderInfo.status == 6 || orderInfo.status == 7 || orderInfo.status == 8 " > 团游优惠 <span class="group-count fr">总共8人游，打{{orderInfo.tyval}}折 共优惠60元（100*3*0.2） 订单完成后将会按优惠价格自动返到个人账户中</span></li>
      </template>
    </ul>
    <div class="foot-blank"></div>
    <CancelBox v-if="showCancel" confirmText="请输入取消原因" :showCancelBox = "showCancel" @closeTip = ' shows '  @confirmCancel="cancelOdr"></CancelBox>
  </div>
</template>

<script type="text/ecmascript-6">
  import {orderDetail, updateOrder,cancelOrder} from "../../http/getDate";
  import {mapState, mapMutations} from 'vuex'
  import TimeCountDown from '../../components/timeCountDown.vue'
  import TimeCountUp from  '../../components/timeCountUp.vue'
  import CancelBox from '../../components/cancelBox.vue'
  export default {
    data() {
      return {
        orderNum: this.$route.query.orderNum,
        endT: '',  //付款截止时间
        takeT: '', //向导接单时间
        payT: '', //付款时间
        startGoT: '', //开始出发时间
        orderInfo: '', //订单信息
        cancelR: '',
        showCancel: false
      }
    },
    components: {
      TimeCountDown,
      TimeCountUp,
      CancelBox
    },
    computed: {
      ...mapState([
        'basePath', 'userInfo', 'baseOrder', 'guideInfo', 'play', 'pricePackage'
      ]),
    },
    mounted() {
      this.getOrderInfo();
    },
    methods: {
      ...mapMutations(['ORDER_DETAIL']),
      getOrderInfo() {
        orderDetail(this.orderNum).then(res => {
          console.log(res)
          this.orderInfo = res.order;


          let creatT = new Date(res.order.created_at.replace(/-/g,'/')).getTime();  //创建订单时间
          // this.endT = new Date(creatT + 1000 * 60 * 30).getTime();
          if(res.order.paytime && res.order.paytime != undefined) {
            this.payT = new Date(res.order.paytime.replace(/-/g,'/')).getTime()  //付款时间
          }
          if(res.order.takeOrderTime && res.order.takeOrderTime != undefined) {
            let takeorderT = new Date(res.order.takeOrderTime.replace(/-/g,'/')).getTime(); //向导接单时间
            this.endT = new Date(takeorderT + 1000 * 60 * 30).getTime();
          }
          if(res.order.startgoouttime && res.order.startgoouttime != undefined) {
            this.startGoT = new Date(res.order.startgoouttime.replace(/-/g,'/')).getTime() //开始出行时间
          }


          this.ORDER_DETAIL(res.order);
          // this.orderInfo = res.orderMap;
        })
      },
      waitGuide(){
        this.$createDialog({
          type: 'alert',
          title: '提示',
          content: '请等待向导接单'
        }).show()
      },
      goPay() {
        this.$router.push({name: 'prepayOrder', query: {orn: this.orderInfo.ordernumber}})
      },
      shows(msg){
        this.showCancel = false;
        // console.log(this.showCancel)

      },
      cancelOdr(msg) {
        this.showCancel = false;
        cancelOrder(this.orderNum, msg).then(res => {
          console.log(res);
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
              this.getOrderInfo();
            }, 1000)
          }
        })
      },
      updateOrder(state) {
        updateOrder(this.orderNum, state).then(res => {
          if (res.msg) {
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: res.msg
            }).show()
          } else {
            console.log('状态修改成功，刷新当前页面！')
            this.$createToast({
              txt: '修改行程状态成功',
              type: 'correct',
              mask: true,
              time: 2000
            }).show();
            setTimeout(()=> {
              this.getOrderInfo();
            }, 1000)
          }
        })
      },
      tripMore(){
        this.$router.push({name: 'scenicDetail', query: {playId: this.orderInfo.playid, accountId: this.orderInfo.userid}})
      },
      endLog() {
        this.getOrderInfo();
        console.log('.....倒计时结束了.....')
      }
    }
  }
</script>

