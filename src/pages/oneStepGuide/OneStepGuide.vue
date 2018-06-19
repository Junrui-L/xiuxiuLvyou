/*Created by soft on 2018/1/11 */

<template>
  <div class="one_step_guide">

    <HeadTop go-back='true' :headBg="headBg">
      <div slot="select-title" class="select-title">

        <span class="cityname " @click="showCityPicker">{{city}}</span>

      </div>
      <div slot="message" class="message"></div>
    </HeadTop>
    <div class="container">
      <div class="guide-type">
        <!-- 切换按钮 -->
        <section class="change_show_type" ref="chooseType">
          <div>
            <span :class='{activity_show: changeType == "1"}' @click="changeGuideType(1)">私导</span>
          </div>
          <div>
            <span :class='{activity_show: changeType =="2"}' @click="changeGuideType(2)">专导</span>
          </div>
        </section>
        <div class="change_content private_content" v-if="changeType == '1' ">
          <ul class="condition">
            <li class="cont-item address">定位当前的地址</li>
            <li class="cont-item">
              <span class="trip-time fl" @click="showDatePicker">{{ travalDate.txt }}</span>
              <span class="trip-time fl" @click="showDayPikcer">{{ playday || '出行天数'}}天</span>
            </li>
            <li class="cont-item">
              <span class="trip-mount fl" @click="showPicker">{{ goNum || '出行人数'}}人</span>
            </li>

          </ul>

        </div>
        <div class="change_content professional_content" v-if="changeType == '2' ">
          <ul class="condition">
            <li class="cont-item address">定位当前的地址</li>
            <li class="cont-item">
              <span class="trip-time fl" @click="showDatePicker">{{ travalDate.txt }}</span>
              <span class="trip-time fl" @click="showDayPikcer">{{ playday || '出行天数'}}天</span>
            </li>
            <li class="cont-item">
              <span class="trip-mount fl" @click="showPicker">{{ goNum || '出行人数' }}人</span>
              <span class="thank-fee fl" @click="showTipPopup">{{tipfee || '感谢费===' | fmtMoney}}</span>
            </li>
            <li class="cont-item">
              <span class="trip-require fl" @click="showCancel = true">{{requires}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="connect-phone">
        联系人
        <span class="contact-txt fr">
          <input class="contact-input" type="text" maxlength="8" v-model="linkman" placeholder="请输入姓名"/>
        </span>
      </div>
      <div class="connect-phone" @click="showSetPopup">
        联系电话
        <span class="phone fr">{{linkphone || '设置电话'}}
            <svg>
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
      </div>
      <div class="foot-content">
        <ul class="group-buy clearfix">
          <li class="buy-price fl" :class="{'group-active': group == '1'}" @click="group = '1'">
            <div class="txt">团购</div>
            <p class="price">
              <span>99</span>元/人
            </p>
          </li>
          <li class="buy-price fr" :class="{'group-active': group == '0'}" @click="group = '0'">
            <div class="txt">不团购</div>
            <p class="price">
              <span>199</span>元/人
            </p>
          </li>
        </ul>

        <div class="btn-content">
          <button class="call-guide" @click="getGuide">
            呼叫导游
          </button>
        </div>
      </div>

    </div>
    <!--设置手机号码-->
    <cube-popup type="choose-popup" :center="true" ref="setPhonePopup">
      <div class="set_contact">
        <i class="close" @click="hideSetPopup"></i>
        <h1 class="title">设置联系手机</h1>
        <div class="input-wrapper"><input class="phone" type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号">
          <i v-if="phone != ''" class="delete" @click="clearPhone"></i>
          <button class="btn-txt" @click="sendCode" :disabled="isDisabled">{{ btnText }}</button>
        </div>
        <div class="input-wrapper"><input class="verify-code" maxlength="6" type="tel" v-model="verifyCode"
                                          placeholder="请输入验证码"/>
          <!--<button v-show="noRecive" class="btn-txt">没有收到?</button>-->
        </div>
        <div class="save-wrapper">
          <button class="save-btn" @click="setPhone">保存</button>
        </div>
      </div>
    </cube-popup>
    <!--设置小费-->
    <cube-popup type="tip-popup" :center="false" ref="tipAmountPopup">
      <div class="cube-picker-choose border-bottom-1px"><span data-action="cancel" @click="hideTipPopup">取消</span><span
        data-action="confirm" @click="thanksFee">确定</span>
        <h1>感谢费</h1></div>
      <div class="tip_contact">
        <div class="tip-wrapper">
          <radio-box title="小费" :options="tipAmount" v-model="tipfee"/>
          <div class="other-amount">
            <div class="tit fl">自定</div>
            <div class="input-wrap fl">
              <input class="inputs" type="number" v-model="tipfee" maxlength="3"/>元
            </div>
          </div>
        </div>
      </div>
    </cube-popup>
    <CancelBox v-if="showCancel" confirmText="请输入出行要求" :showCancelBox="showCancel" @closeTip=' shows '
               @confirmCancel="orderRequire"></CancelBox>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import HeadTop from '../../components/HeadTop.vue'
  import CancelBox from '../../components/cancelBox.vue'
  import DatePicker from '../../components/date-picker.vue'
  import RadioBox from '../../components/radio-box.vue'
  import CheckBox from '../../components/check-box.vue'
  import CheckGroup from '../../components/groupCheckBox'
  import {dateFmt, localStore} from '../../config/myUtils'
  import {onkeyPrice, onkeyCallGuide, getVeryCode, userUpdateMobile} from '../../http/getDate'
  import {provinceList, cityList, peopleNum, peoleData} from '../../config/datajs'

  const cityData = provinceList
  cityData.forEach(province => {
    province.children = cityList[province.value]
  })
  createAPI(Vue, DatePicker, ['select', 'cancel'], false)

  export default {
    data() {
      return {
        headBg: true,
        city: '北京',
        citySn: this.$route.query.citySn,
        scenicspotId: '', //景点id
        changeType: '1',
        group: '1',
        travalDate: {
          value: '',
          txt: '出发时间'
        },
        goNum: '',
        timehour: '', //出发点
        playday: '', //游玩天数
        tipamount: '',
        linkphone: '',
        linkman: '',
        playPrice: '',
        phone: '', //手机号码
        verifyCode: '',
        btnText: '获取验证码',
        isDisabled: false,
        showCancel: false, //出行要求
        requires: '出行要求', //出行要求
        checkList: [],
        tipTxt: [
          '愿等30分钟', '有车接送', '当地通', '男', '女', '聊天幽默', '代买门票'
        ],
        tipfee: '',
        tipAmount: [
          {label: '5元', value: '5'},
          {label: '10元', value: '10'},
          {label: '15元', value: '15'},
          {label: '20元', value: '20'},
          {label: '30元', value: '30'},
        ]
      }
    },
    components: {
      HeadTop,
      DatePicker,
      CheckBox,
      CheckGroup,
      RadioBox,
      CancelBox
    },
    mounted() {
      //初始化联系人
      this.getUsr();
      this.cityPicker = this.$createCascadePicker({
        title: '选择城市',
        data: cityData,
        onSelect: this.selectAreaHandle,
        onCancel: this.cancelHandle
      })
      //获取当前日期,s设置日期初始时间点
      let nowTime = new Date(), startTime = [];
      let nowday = dateFmt(nowTime, 'yyyy-M-dd-hh');
      console.log(`现在的日期是${nowday}`)
      let minDay = nowday.split('-');
      let mindate = [];
      minDay.forEach((v, i) => {
        mindate[i] = parseInt(v)
      });
      console.log(mindate)
      if (nowTime.getHours() >= 18) {
        //超过18点默认订明天
        nowTime.setTime(nowTime.getTime() + 24 * 60 * 60 * 1000);
        let startDay = dateFmt(nowTime, 'yyyy-M-dd');
        let startDate = startDay.split('-');
        startDate.push(8)
        startDate.forEach((v, i) => {
          startTime[i] = parseInt(v)
        });
      } else {
        startTime = mindate
      }
      this.datePicker = this.$createDatePicker({
        title: '出行日期',
        min: mindate,
        max: [2020, 12, 31, 8],
        value: startTime,
        columnCount: 4,
        onSelect: this.selecTimetHandle,
        onCancel: this.cancelHandle
      })

      this.picker = this.$createPicker({
        title: '出行人数',
        data: [peopleNum],
        alias: {
          value: 'num',
        },
        onSelect: this.selectNumHandle,
        onCancel: this.cancelNumHandle
      })

      this.dayPicker = this.$createPicker({
        title: '出行天数',
        data: [peoleData],
        alias: {
          value: 'num',
        },
        onSelect: this.selectDayHandle,
        onCancel: this.cancelHandle
      })
      console.log('获取价格开始..')
      this.getPlayPrice(1)
    },
    methods: {
      changeGuideType(t) {
        //切换tab,显示价格
        this.changeType = t;
        this.getPlayPrice(t);
      },
      getPlayPrice(type) {
        onkeyPrice({
          sourceType: type,
          // citySn: '433101',
          citySn: this.citySn,
          scenicspotId: ''
        }).then(res => {
          console.log(res)
          if (res.msg) {
            console.log(res.msg)
            this.$createDialog({
              type: 'alert',
              title: '温馨提示',
              content: res.msg
            }).show()
          } else {
            this.playPrice = res
          }

        })
      },
      getUsr() {
        let UserInfo = localStore('userInfo', 'localStorage');
        let usrs = UserInfo.get('userInfo');
        if (usrs) {
          this.linkphone = usrs.mobile;
          this.linkman = usrs.userName;
        }
      },
      getGuide() {
        if (this.changeType == 1) {
          //呼叫区导
          if(this.travalDate.value ==  '') {
            this.$createToast({
              txt: '请选择出发日期',
              type: 'error',
              mask: false,
              time: 2000
            }).show();

            return
          } else if(this.playday ==  ''){
            this.$createToast({
              txt: '请选择出行天数',
              type: 'error',
              mask: false,
              time: 2000
            }).show();

            return
          }else if(this.goNum ==  ''){
            this.$createToast({
              txt: '请选择出行人数',
              type: 'error',
              mask: false,
              time: 2000
            }).show();
            return
          } else {
            this.toNext();
          }


        } else if (this.changeType == 2) {
          //呼叫专导
          if(this.travalDate.value ==  '') {
            this.$createToast({
              txt: '请选择出发日期',
              type: 'error',
              mask: false,
              time: 2000
            }).show();

            return
          } else if(this.playday ==  ''){
            this.$createToast({
              txt: '请选择出行天数',
              type: 'error',
              mask: false,
              time: 2000
            }).show();

            return
          }else if(this.goNum ==  ''){
            this.$createToast({
              txt: '请选择出行人数',
              type: 'error',
              mask: false,
              time: 2000
            }).show();
            return
          } else if(this.tipfee == '') {
            this.$createToast({
              txt: '请选择感谢费',
              type: 'error',
              mask: false,
              time: 2000
            }).show();
            return
          }else {
            this.toNext();
          }

        }

      },
      showCityPicker() {
        this.cityPicker.show()
      },
      showPicker() {
        this.picker.show()
      },
      showDayPikcer(){
        this.dayPicker.show()
      },
      showDatePicker() {
        this.datePicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.goTime = selectedText.join('');
      },
      cancelHandle() {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      },
      selecTimetHandle(selectedVal, selectedIndex, selectedText) {
        console.log('时间选。 ')
        this.timehour = selectedVal.getHours();
        console.log('小时' + this.timehour)
        this.travalDate = {value: dateFmt(selectedVal, 'yyyy-M-d'), txt: selectedText.join('')}
        console.log(this.travalDate)
      },
      selectDayHandle(selectedVal, selectedIndex, selectedText){
        //游玩天数
        this.playday = selectedVal[0]
      },
      selectNumHandle(selectedVal, selectedIndex, selectedText) {
        console.log(selectedVal[0])
        this.goNum = selectedVal[0];
      },
      cancelNumHandle() {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      },
      selectAreaHandle(selectedVal, selectedIndex, selectedText) {
        this.city = selectedText[1]
      },
      showTipPopup() {
        this.$refs.tipAmountPopup.show();
      },
      hideTipPopup() {
        this.$refs.tipAmountPopup.hide();
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
        if (this.phone == '') {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入手机号'
          }).show()
        } else if (!reg.test(this.phone)) {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入正确的手机号'
          }).show()
        } else {
          //获取验证码
          getVeryCode(this.phone).then(res => {
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
                content: res.data
              }).show()
            }
          })
          let settime = () => {
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
            }, 1000);
          };
          settime()
        }

      },
      setPhone() {
        let reg = /^1[345789][0-9]{9}$/;
        if (this.phone == '') {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入手机号'
          }).show()
        } else if (this.verifyCode == '') {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入验证码'
          }).show()
        } else if (!reg.test(this.phone)) {
          this.$createDialog({
            type: 'alert',
            title: '提示',
            content: '请输入正确的手机号'
          }).show()
        } else if (reg.test(this.phone)) {
          userUpdateMobile(this.phone, this.verifyCode).then(res => {
            console.log(res)
            if (res.msg) {
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
              setTimeout(() => {
                //设置成功
                this.linkPhone = this.phone;
                this.hideSetPopup();
              }, 1000)

            }
          })
        }

      },
      shows() {
        this.showCancel = false
      },
      orderRequire(res) {
        console.log('确认要求');
        this.requires = res;
        this.showCancel = false;
      },

      thanksFee() {

        this.hideTipPopup()
        console.log(this.tipfee)

      },
      resetFee() {

      },
      toNext() {
        let callData = {
          sourceType: this.changeType,
          citySn: this.citySn,
          scenicspotId: this.scenicspotId,
          istuan: this.group,
          godate: this.travalDate.value,
          timehour: this.timehour,
          tripsnum: this.goNum,
          playday: this.playday,
          tipamount: this.tipfee,
          limkman: this.limkman,
          linkPhone: this.linkPhone
        }

//呼叫导游
        onkeyCallGuide(callData).then( res => {

          console.log('请求结束')
          console.log(res);
          if(res.msg){
            this.$createDialog({
              type: 'alert',
              title: '温馨提示',
              content: res.msg,
              showClose: true
            }).show()
          }else  {
            console.log(res.data)
          }
        })
        // var send = JSON.stringify(callData)
        // this.$router.push({path: '/waitResponse', query: {callData: JSON.stringify(callData)}})
      }
    }
  }

</script>



