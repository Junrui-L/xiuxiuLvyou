<template>
  <div class="order_detail">
    <header class="guide-info clearfix">
      <div class="guide-img fl">
        <img :src="guideInfo.userImg" alt="">
      </div>
      <dl class="guide-detail fl">
        <dt class="guide-name">{{play.username}}</dt>
        <dd class="guide-scenic"><span>{{play.scenicspot}}</span><span>{{play.wfname}}</span></dd>
        <dd class="guide-mode">
          <template v-if="play.servicetype == 1">
            景点详解
          </template>
          <template v-else-if="play.servicetype == 2">
            带游服务
          </template>
          <template v-else-if="play.servicetype == 3">
            当地游玩
          </template>
          <template v-else-if="play.servicetype == 4">
            专线类型
          </template>
          <template v-if="play.tytype == 0">
            (平分模式)
          </template>
          <template v-else-if="play.tytype == 1">
            (固定折扣模式)
          </template>
          <template v-else-if="play.tytype == 2">
            (剃分模式)
          </template>
          </dd>
      </dl>
    </header>
    <div class="order-info">
      <h3 class="title">订单信息</h3>
      <ul class="order-list">
        <li class="info-item">游玩时间 <span class="fr">{{baseOrder.travalDate.txt}}</span></li>
        <li class="info-item">游玩人数 <span class="fr">{{baseOrder.peopleNum.txt}}</span></li>
        <li class="info-item">价格套餐 <span class="fr">{{pricePackage.name}}/{{pricePackage.price}}元</span></li>
      </ul>
    </div>
    <div class="group-trip">
      <switch-option name="开启团游" :isDisable = "play.sfzcty == 1 ? false : true"  @update:value="onGroup" ></switch-option>
    </div>
    <div class="notify group-notify">
      <!--<p>导游优惠模式：固定折扣模式，7，8折</p>-->

      <p>注意：团游必须有2个订单才生效，价格由最终团游数决定。而差价会在旅行结束后退到您的个人账户中。</p>
    </div>
    <div class="tickets">
      <div class="tickit-m" >游玩天数
        <span class="tickit-txt fr" >
          {{play.playDay || 1}}天
          <!--<input class="play-days" v-model="playday" placeholder="请输入天数" maxlength="3" max="99" type="number" pattern="[0-9]*">-->
        </span>
      </div>
      <div class="tickit-m" @click="showmpPackgePicker">门票套餐
        <span class="tickit-txt fr" >
          {{mpPackage.mpPackageName == '' ? '请选择门票套餐' : mpPackage.mpPackageName}}
          <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
      <div class="tickit-n" @click="showmpPackagecount">数量
        <span class="tickit-txt  fr">
          {{mpPackagecount == '' ? '选择套餐数量' : mpPackagecount}}人
          <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
    </div>
    <div class="notify tickit-notify" v-if="mpPackage.mpPackageNotice != ''">

      <p>门票说明：{{mpPackage.mpPackageNotice}}</p>
      <!--<p>注意：团游必须有2个订单才生效，价格由最终团游数决定。而差价会在旅行结束后退到您的个人账户中。</p>-->
    </div>
    <ul class="contact">
      <li class="contact-name">
        联系人
        <span class="contact-txt fr">
          <input class="contact-input" type="text" maxlength="8" v-model="linkman" placeholder="请输入姓名" />
        </span>
      </li>
      <li class="contact-phone" @click="$router.push({path: '/setContact'})">
        电话
        <span class="contact-txt fr">
          {{linkPhone}}
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </li>
    </ul>
    <div class="note-message">
      <div class="title">备注</div>
      <textarea class="note-text" maxlength="60" placeholder="备注" v-model="requiretxt">

      </textarea>
    </div>
    <div class="coupons">优惠券
      <span class="coupon-txt  fr">
          暂无优惠券可用
          <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
    </div>
    <div class="agreement">
      点击提交订单表示阅读并同意 <span>向导服务合同</span>
    </div>
    <div class="submit-order clearfix">
      <div class="total fl">
        总额:
        <span class="total-num fr">
         ￥{{total}}
           <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
      <div class="btn-wrapper fr">
        <button class="sub-btn" @click="newOrder">
          提交订单
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {initOrder, loadOrder, creatOrder} from '../../http/getDate'
  import {peopleNum} from '../../config/datajs'
  import {localStore} from '../../config/myUtils'
  import SwitchOption from  '../../components/switchOption.vue'
  export default {
    data() {
      return {
        godate: '',
        playday: '', //出游天数
        accountId: this.$route.query.guideId,
        playId: this.$route.query.playId,
        tripsnum: '',
        packageid: '',//套餐id
        mpPackList: '',
        mpPackage: {
          mpPackageId:'',
          mpPackagePrice: '',
          mpPackageNotice: '',
          mpPackageName: ''
        },
        mpPackagecount: '',
        istuan: 0,
        source: 0,
        tipmount: 1,
        linkman: '',
        linkPhone: '',
        requiretxt: '',
        yhjId: ''
      }
    },
    components: {
      SwitchOption
    },
    computed: {
      ...mapState([
        'basePath','userInfo', 'baseOrder','guideInfo','play','pricePackage'
      ]),
      total: function () {

        if(this.mpPackage.mpPackagePrice != '') {
          this.mpPackage.mpPackagePrice = parseInt(this.mpPackage.mpPackagePrice)
        } else {
          this.mpPackage.mpPackagePrice = 0
        }

        if(this.mpPackagecount != '') {
          this.mpPackagecount = parseInt(this.mpPackagecount)
        } else {
          this.mpPackagecount = 0
        }

        // if(this.playday != '') {
          this.playday = parseInt(this.play.playDay)
          // }
        console.log('...门票套餐价...门票套餐价')
        console.log(this.pricePackage.price, this.baseOrder.peopleNum.value, this.mpPackage.mpPackagePrice, this.mpPackagecount);
        if(this.playday != '') {
          return parseInt(this.pricePackage.price )* parseInt(this.baseOrder.peopleNum.value)* parseInt(this.playday)  + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
        }
      }
    },
    mounted() {
      /*获取优惠券的信息*/
      // loadYhj(1).then(res => {
      //   console.log('-------加载优惠券返回--------');
      //   console.log(res)
      //
      // })
      this.mpPicker = this.$createPicker({
        title: '门票数量',
        data: [peopleNum],
        alias: {
          value: 'num',
        },
        onSelect: this.selectCountHandle,
        onCancel: this.cancelHandle
      })

      this.initHeOrder();
    },
    methods: {
      ...mapMutations(['GET_USERINFO']),
      showmpPackagecount(){
        this.mpPicker.show();
      },
      selectCountHandle(v){
        this.mpPackagecount = v[0]
      },
      initHeOrder() {
        console.log(this.guide)
        this.godate = this.baseOrder.travalDate.value;
        this.tripsnum = this.baseOrder.peopleNum.value
        this.packageid = this.baseOrder.mealType.id

        initOrder(this.godate, this.accountId, this.playId, this.tripsnum, this.packageid, 0, 0).then(resp => {
          console.log('-------订单初始化返回--------');
            console.log(resp)
            loadOrder().then(res=> {
              console.log('---下单前订单加载返回-----')
              console.log(res);
              this.mpPackList = res.mpPackelist;
              this.linkman = res.visitor.userName;
              this.linkPhone = res.visitor.mobile;
              this.GET_USERINFO(res.visitor)
              let mpdata = [];
              for(let i=0; i<res.mpPackelist.length; i++) {
                mpdata[i] = {value: res.mpPackelist[i].id, text: res.mpPackelist[i].name}
              }
              console.log(mpdata)
              this.mpPackgePicker = this.$createPicker({
                title: '门票套餐',
                data: [mpdata],
                onSelect: this.selectmpHandle,
                onCancel: this.cancelHandle
              })
            })
        })
      },
      showmpPackgePicker(){
        this.mpPackgePicker.show();
      },
      selectmpHandle(v, i, t){
        this.mpPackage.mpPackageId = v[0];
        this.mpPackage.mpPackagePrice = this.mpPackList[i[0]]['price'];
        this.mpPackage.mpPackageNotice = this.mpPackList[i[0]]['remark'];
        this.mpPackage.mpPackageName = t[0];
      },
      newOrder() {
        console.log(this.linkman)
       if(this.linkman == '' || this.linkman == null){
          this.$createToast({
            txt: '请填写联系人',
            type: 'error',
            mask: true,
            time: 2000
          }).show();
        } else if(this.linkPhone == '') {
          this.$createToast({
            txt: '请填写联系人手机',
            type: 'error',
            mask: true,
            time: 2000
          }).show();
        } else if(this.requiretxt == '') {
          this.$createToast({
            txt: '请填写备注',
            type: 'error',
            mask: true,
            time: 2000
          }).show();
        } else {
          // console.log(this.mpPackage.mpPackageId)
          creatOrder(
            this.godate,
            this.playday,
            this.accountId,
            this.playId,
            this.tripsnum,
            this.packageid,
            this.mpPackage.mpPackageId,
            this.mpPackagecount,
            this.istuan,
            this.source,
            this.tipmount,
            this.linkman,
            this.linkPhone,
            this.requiretxt,
            this.yhjId
          ).then(res => {
            let self = this;
            console.log(res)
            console.log('---------新下的订单返回了-----------')
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: res.msg,
                showClose: true,
                onClose: () => {
                  // self.$router.push({name: 'order',query: {orderNum: 'takeMeOrderNum'}})
                }
              }).show()

            } else {
              //新下的订单号
              let loc =  localStore('orderNum', 'localStorage')
              loc.set('orn', res.data[1])
              self.$router.replace({name: 'order',query: {orderNum: res.data[1]}})
            }

          })

        }


      },

      endLog() {
        console.log('.....倒计时结束了.....')
      },
      onGroup(msg) {
        //是否开启团切换
        msg ? this.istuan = 1 : this.istuan = 0;

      }
    }
  }
</script>

