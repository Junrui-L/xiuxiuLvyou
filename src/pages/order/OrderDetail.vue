<template>
  <div class="order_detail">
    <header class="guide-info clearfix">
      <div class="guide-img fl">
        <img :src="guideInfos.userImg" alt="">
      </div>
      <dl class="guide-detail fl">

        <dt class="guide-name">{{plays.username}}</dt>
        <dd class="guide-scenic">
          <template v-if="plays.servicetype == 1">
            <span>{{plays.scenicspot}}</span>
          </template>
          <template v-else-if="plays.servicetype == 2">
            <span>{{plays.serviceCity}}</span>
          </template>
          <template v-else-if="plays.servicetype == 3">
            <span>{{plays.serviceCity}}</span>
          </template>
          <span>{{plays.servicetype | servicetypeText}}</span></dd>
        <dd class="guide-mode">
          {{ plays.wfname }}
          </dd>
      </dl>

    </header>
    <div class="order-info">
      <h3 class="title">订单信息</h3>
      <ul class="order-list">
        <li class="info-item">游玩天数 <span class="fr"> {{orderDatas.playday}}天</span></li>
        <li class="info-item">游玩时间 <span class="fr">{{orderDatas.godate | fmtDate('yyyy年M月d日')}}{{orderDatas.timehour}}点</span></li>
        <li class="info-item">截止游玩时间 <span class="fr">{{endate}}</span></li>
        <li class="info-item">游玩人数 <span class="fr">{{orderDatas.tripsnum}}人</span></li>
        <li class="info-item">价格套餐 <span class="fr">{{pricePackages.name}}/ ￥{{pricePackages.price }}/{{pricePackages.unit | unitText}}</span></li>
      </ul>
    </div>
    <div class="group-trip" v-if="pricePackages.sfzcty == 1">
      <switch-option name="开启团游" :isDisable = "pricePackages.sfzcty == 0 ? true : false"  @update:value="onGroup" ></switch-option>
    </div>
    <div class="notify group-notify" v-if="pricePackages.sfzcty == 1">
      <p >团游优惠模式：{{ plays.tytype | tymodeText}}    <template v-if="pricePackages.tytype == 2">{{ pricePackages.tyval}}折</template></p>

      <p v-if="istuan == 1">注意：团游必须有2个订单才生效，价格由最终团游数决定。而差价会在旅行结束后退到您的个人账户中。</p>
    </div>
    <div class="tickets" v-if="mpPackList.length > 0">
      <div class="tickit-m" @click="showmpPackgePicker">门票套餐
        <span class="tickit-txt fr" >
          {{mpPackage.mpPackageName == '' ? '请选择' : mpPackage.mpPackageName}}
          <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
      <div class="tickit-n" @click="showmpPackagecount">数量
        <span class="tickit-txt  fr">
          {{mpPackagecount == '' ? '请选择' : mpPackagecount}}人
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
      <!--<li class="contact-phone" @click="$router.push({path: '/setContact'})">-->
      <li class="contact-phone" @click="showSetPopup">
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

    <div class="coupons" @click="showYHJ">优惠券
      <span class="coupon-txt  fr">
          {{selectYHJObj.text ? selectYHJObj.text : yjhArr.length-1 +'张优惠券可用'}}
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
    <cube-popup type="choose-popup"  :center="true" ref="setPhonePopup">
      <div class="set_contact">
        <i class="close" @click="hideSetPopup"></i>
        <h1 class="title">设置联系手机</h1>
        <div class="input-wrapper"><input class="phone" type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号">
          <i v-if="phone != ''" class="delete" @click="clearPhone"></i>
          <button class="btn-txt" @click="sendCode" :disabled="isDisabled">{{ btnText }}</button>
        </div>
        <div class="input-wrapper"><input class="verify-code"  maxlength="6" type="tel" v-model="verifyCode" placeholder="请输入验证码"/>
          <!--<button v-show="noRecive" class="btn-txt">没有收到?</button>-->
        </div>
        <div class="save-wrapper"><button class="save-btn" @click="setPhone">保存</button></div>
      </div>
    </cube-popup>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {initOrder, loadOrder, creatOrder,getCanUseyhj,getVeryCode, userUpdateMobile} from '../../http/getDate'
  import {dateFmt} from '../../config/myUtils'
  import {peopleNum} from '../../config/datajs'
  import {localStore} from '../../config/myUtils'
  import SwitchOption from  '../../components/switchOption.vue'
  export default {
    data() {
      return {
        godate: '',
        playday: '', //出游天数
        endate: '', //结束日期
        accountId: this.$route.query.guideId,
        playId: this.$route.query.playId,
        tripsnum: '',
        packageid: '',//套餐id
        pricePackages: {}, //套餐对象
        guideInfos: {}, //导游对象
        plays: {}, //玩法对象
        orderDatas: {}, //基本订单对象
        mpPackList: '',
        mpPackage: {     //门票集合
          mpPackageId:'',
          mpPackagePrice: '',
          mpPackageNotice: '',
          mpPackageName: ''
        },
        tuanOrder: null, //团信息
        mpPackagecount: '',
        istuan: 0,
        source: 0,
        tipmount: 0, //小费
        linkman: '',
        linkPhone: '',
        requiretxt: '',
        yhjId: '',
        selectYHJObj:'', // 选中的优惠券对象
        yjhArr:[], // 可以使用的优惠券列表

        phone: '', //手机号码
        verifyCode: '',
        btnText: '获取验证码',
        isDisabled: false,
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

        this.playday = parseInt(this.playday)
        console.log('...门票套餐价...门票套餐价')
        let allPrice;
        // console.log(this.pricePackages.price, this.baseOrder.peopleNum.value, this.mpPackage.mpPackagePrice, this.mpPackagecount);
        /*1-人/天（一人一天价）;2-单/天（一团一天价）;3-人/次（一人游价）;4-单/次（总团价游）*/
        if(this.pricePackages.unit == 1) {
          console.log(`套餐价格${this.pricePackages.price},人数${this.tripsnum},游玩天 ${this.playday},门票价 ${this.mpPackage.mpPackagePrice},门票数 ${this.mpPackagecount} `);
          allPrice = parseInt(this.pricePackages.price )* parseInt(this.tripsnum)* parseInt(this.playday)  + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
          if(this.selectYHJObj != ''){
            return allPrice - parseInt(this.selectYHJObj.price)
          } else {
            return allPrice
          }
          // return parseInt(this.pricePackages.price )* parseInt(this.tripsnum)* parseInt(this.playday)  + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
        } else if(this.pricePackages.unit == 2) {
            allPrice = parseInt(this.pricePackages.price ) * parseInt(this.playday)  + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
            if(this.selectYHJObj != ''){
              return allPrice - parseInt(this.selectYHJObj.price)
            } else {
              return allPrice
            }

        } else if(this.pricePackages.unit == 3){
          allPrice = parseInt(this.pricePackages.price ) * parseInt(this.tripsnum) + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
          if(this.selectYHJObj != ''){
            return allPrice - parseInt(this.selectYHJObj.price)
          } else {
            return allPrice
          }


        } else if(this.pricePackages.unit == 4) {
          allPrice = parseInt(this.pricePackages.price )  + parseInt(this.mpPackage.mpPackagePrice) * parseInt(this.mpPackagecount)
          if(this.selectYHJObj != '') {
            return allPrice - parseInt(this.selectYHJObj.price)
          } else {
            return allPrice
          }

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
      // 显示优惠券
      showYHJ(){
        this.yhjPicker.show()
      },
      // 选中优惠券
      selectYHJHandle(v, i, t){
        this.selectYHJObj = this.yjhArr[i];
        this.yhjId = this.selectYHJObj.value;
      },
      selectCountHandle(v){
        this.mpPackagecount = v[0]
      },
      // 获取未使用的优惠券
      getCanUseYHJ (){
        getCanUseyhj().then(res=>{
          this.yjhArr=res.list

          let yhjData = [];
          if(res.list.length > 0) {
            for(let i=0; i<res.list.length; i++) {
              if(res.list[i].type == 4 || res.list[i].type == 5){
                  //  优惠券最低价与订单总价比对
                if(res.list[i].minprice<=this.total){
                  yhjData.push({value: res.list[i].id, text: res.list[i].name, price: res.list[i].toprice})
                }
              }

            }
            yhjData.push({value:'', text: '不使用优惠券', price: 0})
            console.log(yhjData);
          } else {
            yhjData = [{value:'', text: '暂无可用优惠券', price: 0}]
          }

          this.yjhArr = yhjData;
          this.yhjPicker = this.$createPicker({
            title: '可用优惠券',
            data: [this.yjhArr],
            onSelect: this.selectYHJHandle,
            onCancel: this.cancelHandle
          })

        })
      },
      initHeOrder() {
        loadOrder().then(res=> {
          console.log('---初始订单加载返回-----')
          console.log(JSON.stringify(res.orderData));
          this.guideInfos = res.guide; //导游
          this.plays = res.play; //玩法对象
          this.orderDatas = res.orderData

          this.godate = res.orderData.godate;
          this.playday = res.orderData.playday; //游玩天数

          console.log(this.godate)
          let goda = this.godate.replace(/-/g,"/")
          console.log(goda)
          let da = new Date(goda)

          da.setTime(da.getTime()+ (this.playday -1)*24*60*60*1000)
          console.log(da)
          this.endate = dateFmt(da, 'yyyy年M月d日'); //游玩结束日期


          this.tripsnum = res.orderData.tripsnum;
          this.packageid = res.orderData.packageid;

          this.pricePackages = res.pricePackage; //价格套餐详情

          this.mpPackList = res.mpPackelist;
          let mpdata = [];
          for(let i=0; i<res.mpPackelist.length; i++) {
            mpdata[i] = {value: res.mpPackelist[i].id, text: res.mpPackelist[i].name}
          }
          this.mpPackgePicker = this.$createPicker({
            title: '门票套餐',
            data: [mpdata],
            onSelect: this.selectmpHandle,
            onCancel: this.cancelHandle
          })

          this.linkman = res.visitor.userName;
          this.linkPhone = res.visitor.mobile;
          this.GET_USERINFO(res.visitor)

          this.tuanOrder = res.tuanOrder; //当天团游信息
          //获取订单详情后再获取优惠券进行比对
          this.getCanUseYHJ()
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

      },
      showSetPopup() {
        //显示重置密码
        const component = this.$refs.setPhonePopup
        component.show()
      },
      hideSetPopup() {
        const component = this.$refs.setPhonePopup;
        component.hide();
      },
      clearPhone() {
        this.phone = ''
      },
      sendCode() {
        //发送验证码60s倒计时
        let setf = this;
        this.noRecive = true;
        let countdown = 60;
        let reg = /^1[34578][0-9]{9}$/;
        if(this.phone == '') {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入手机号'
          }).show()
        } else if(!reg.test(this.phone)) {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入正确的手机号'
          }).show()
        } else {
          //获取验证码
          getVeryCode(this.phone).then(res => {
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: res.msg
              }).show()
            } else {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: res.data
              }).show()
            }
          })
          let  settime = () => {
            if (countdown === 0) {
              setf.isDisabled = false
              setf.btnText = "重新获取";
              countdown = 60;
              return false;
            } else {
              setf.isDisabled = true;
              setf.btnText = "(" + countdown + "s)重新获取";
              countdown--;
            }
            setTimeout(() => {
              settime();
            },1000);
          };
          settime()
        }

      },
      setPhone(){
        let reg = /^1[345789][0-9]{9}$/;
        if(this.phone == ''){
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入手机号'
          }).show()
        } else if(this.verifyCode == '') {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入验证码'
          }).show()
        } else if(!reg.test(this.phone)) {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入正确的手机号'
          }).show()
        }else if(reg.test(this.phone)){
          userUpdateMobile(this.phone, this.verifyCode).then(res => {
            console.log(res)
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '提示',
                content: res.msg
              }).show()
            } else {
              this.$createToast({
                txt: '手机号码设置成功',
                type: 'correct',
                mask: true,
                time: 2000
              }).show();
              setTimeout(()=> {
                //设置成功
                this.linkPhone = this.phone;
                this.hideSetPopup();
              }, 1000)

            }
          })
        }

      }
    }
  }
</script>

