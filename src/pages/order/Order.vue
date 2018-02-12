<template>
  <div class="order">
    <template v-if="orderInfo.status == 9">
      <div class="header">
        <div class="order-state">
          已下单待接单
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <TimeCountDown :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>
        <div class="btn-topay clearfix">
          <button class="cancel btn fl" @click="showCancel = true">取消定单</button>
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
        <TimeCountDown :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>
        <div class="btn-topay clearfix">
          <button class="cancel btn fl" @click="cancelOdr">取消定单</button>
          <button class="confirm btn fr" @click="goPay">去付款</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 2">
      <div class="header">
        <div class="order-state">
          已付款
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr">确认到达</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 3">
      <div class="header">
        <div class="order-state">
          汇合中
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">已接待</button>
          <button class="backpay btn fr">已出行</button>
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
          <button class="backpay btn fr">已出行</button>
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
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">

          <button class="backpay btn fr">出行结束</button>
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
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-triped clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="onemore btn ">再游一场</button>
          <button class="evalu btn fr">评价</button>
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
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
        <div class="btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr">再游一场</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 8">
      <div class="header">
        <div class="order-state">
          行程已完成
        </div>
        <div class="btn-triped btn-topay clearfix">
          <button class="backpay btn fl">申请退款</button>
          <button class="backpay btn fr">再游一场</button>
        </div>
      </div>
    </template>
    <template v-else-if="orderInfo.status == 9">
      <div class="header">
        <div class="order-state">
          已取消
        </div>
        <div class="btn-triped  clearfix">
          <button class="backpay btn ">重新下单</button>
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
        <!--<TimeCount :endTime="endT" :nowTime="nowT" :countCallback="endLog"/>-->
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

    <!--<div class="triping hide show">-->
    <!--<button class=" btn">出行中</button>-->
    <!--</div>-->
    <!--<div class="cancel-order hide">-->
    <!--<button class="btn">重新下单</button>-->
    <!--</div>-->
    <!--<div class="trip-end hide show">-->
    <!--<button class="btn">旅行结束</button>-->
    <!--</div>-->
    <!--<div class="btn-triped">-->
    <!--<button class="backpay btn fl">申请退款</button>-->
    <!--<button class="onemore btn ">再游一场</button>-->
    <!--<button class="evalu btn fr">评价</button>-->
    <!--</div>-->
    <div class="guide-info clearfix">
      <div class="guide-img fl">
        <img src="../../assets/img/taiwdy.png" alt="">
      </div>
      <dl class="guide-detail fl">
        <dt class="guide-name">{{orderInfo.username}} <span class="message"></span></dt>
        <dd class="guide-scenic"><span>{{orderInfo.playaddre}}</span><span>{{orderInfo.wfname}}</span></dd>
        <dd class="guide-mode">
          <template v-if="orderInfo.servicetype === 1">
            景点详解
          </template>
          <template v-else-if="orderInfo.servicetype === 2">
            带游服务
          </template>
          <template v-else-if="orderInfo.servicetype === 3">
            当地游玩
          </template>
          <template v-else-if="orderInfo.servicetype === 4">
            专线类型
          </template>
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
        <li class="info-item">联系人 <span class="fr">{{orderInfo.limkman}}</span></li>
        <li class="info-item">联系电话 <span class="fr">{{orderInfo.linkPhone}}</span></li>
        <li class="info-item">游玩日期 <span class="fr">{{ orderInfo.godate }}</span></li>
        <li class="info-item">出行人数 <span class="fr">{{ orderInfo.tripsnum}} 人</span></li>
        <li class="info-item">是否团游 <span class="fr">{{orderInfo.sfty == 1 ? '是' : '否'}}（{{ orderInfo.tripsnum}}人）</span>
        </li>
      </ul>
    </div>
    <div class="order-price">
      <ul class="trip-meal">
        <li class="price-item meal-n clearfix">
          <span class="fl">游玩套餐</span>
          <div class="price fr">
            <p>{{orderInfo.orderdoc}}</p>
            <p class="price-num">￥{{orderInfo.packagePrice}} X {{ orderInfo.tripsnum}}</p>
          </div>
        </li>
        <li class="price-item coupon clearfix">
          <span class="fl">优惠券</span>
          <div class="price fr">
            <p>无</p>
            <p class="price-num">￥ {{orderInfo.yh_price ? orderInfo.yh_price : 0 }}元</p>
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
          <template v-if="orderInfo.playmoneyType == 1">
              余额支付
            </template>
            <template v-else-if="orderInfo.playmoneyType == 2">
              微信支付
            </template>

        </span></li>
      <li class="check-item clearfix">团游优惠 <span class="group-count fr">团游优惠埃里克健身卡收代理费开数据库费啦jflsf啥地方</span></li>
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
        endT: '2018-01-31 21:55:00',
        nowT: '2018-01-09 19:50:00',
        orderInfo: '',
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
      ])
    },
    mounted() {
      this.getOrderInfo();
    },
    methods: {
      ...mapMutations(['ORDER_DETAIL']),
      getOrderInfo() {
        orderDetail(this.orderNum).then(res => {
          console.log(res)
          this.orderInfo = res.order
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
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '取消成功'
            }).show()
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
            // this.$createDialog({
            //   type: 'alert',
            //   title: '提示',
            //   content: '状态修改成功'
            // }).show()
            this.$router.go(0)
          }
        })
      },
      endLog() {
        console.log('.....倒计时结束了.....')
      }
    }
  }
</script>

