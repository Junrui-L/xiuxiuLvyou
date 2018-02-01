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
            <span :class='{activity_show: changeType == "private"}' @click="changeType = 'private'">私导</span>
          </div>
          <div>
            <span :class='{activity_show: changeType =="professional"}' @click="changeType ='professional'">专导</span>
          </div>
        </section>
        <div class="change_content private_content" v-if="changeType == 'private' ">
          <ul class="condition">
            <li class="cont-item address">定位当前的地址</li>
            <li class="cont-item">
              <span class="trip-time fl" @click="showDatePicker">{{ goTime }}</span>
              <span class="trip-mount fl" @click="showPicker">{{ goNum }}</span>
            </li>
            <!--<li class="cont-item">-->
              <!--<span class="trip-require fl">出行要求</span>-->
              <!--<span class="thank-fee fl">感谢费</span>-->
            <!--</li>-->
          </ul>

        </div>
        <div class="change_content professional_content" v-if="changeType == 'professional' ">
          <ul class="condition">
            <li class="cont-item address">定位当前的地址</li>
            <li class="cont-item">
              <span class="trip-time fl" @click="showDatePicker">{{ goTime }}</span>
              <span class="trip-mount fl" @click="showPicker">{{ goNum }}</span>
            </li>
            <li class="cont-item">
              <span class="trip-require fl">出行要求</span>
              <span class="thank-fee fl">感谢费</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="connect-phone">
        联系电话
        <span class="phone fr">1521785111
            <svg>
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
      </div>
      <div class="foot-content">
        <ul class="group-buy clearfix" >
          <li class="buy-price fl" :class="{'group-active': group == 'group'}" @click = "group = 'group'">
            <div class="txt">团购</div>
            <p class="price">
              <span>99</span>元/人
            </p>
          </li>
          <li class="buy-price fr" :class="{'group-active': group == 'ungroup'}" @click = "group = 'ungroup'">
            <div class="txt">不团购</div>
            <p class="price">
              <span>199</span>元/人
            </p>
          </li>
        </ul>

        <div class="btn-content">
          <button class="call-guide" @click = "$router.push('/waitResponse')">
            呼叫导游
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import HeadTop from '../../components/HeadTop.vue'
  import DatePicker from '../../components/date-picker.vue'
  import { provinceList, cityList, areaList } from '../../config/datajs'
  const cityData = provinceList
  cityData.forEach(province => {
    province.children = cityList[province.value]
    // province.children.forEach(city => {
    //   city.children = areaList[city.value]
    // })
  })
  createAPI(Vue, DatePicker, ['select', 'cancel'], false)

  const data1 = [
    {
      text: '1人',
      value: '1'
    }, {
      text: '2人',
      value: '2'
    },
    {
      text: '3人',
      value: '3'
    },
    {
      text: '4人',
      value: '4'
    },
    {
      text: '5人',
      value: '5'
    },
    {
      text: '6人',
      value: '6'
    },
    {
      text: '7人',
      value: '7'
    }, {
      text: '8人',
      value: '8'
    },
    {
      text: '9人',
      value: '9'
    },
    {
      text: '10人',
      value: '10'
    },
    {
      text: '11人',
      value: '11'
    },
    {
      text: '12人',
      value: '12'
    },
    {
      text: '13人',
      value: '13'
    },
    {
      text: '14人',
      value: '14'
    },
    {
      text: '15人',
      value: '15'
    }
  ]
  export default {
    data() {
      return {
        headBg: true,
        city: '北京',
        changeType: 'private',
        group: 'group',
        goTime: '出发时间',
        goNum: '出行人数'
      }
    },
    components: {
      HeadTop,
      DatePicker
    },
    mounted() {
      this.cityPicker = this.$createCascadePicker({
        title: 'City Picker',
        data: cityData,
        onSelect: this.selectAreaHandle,
        onCancel: this.cancelHandle
      })

      this.datePicker = this.$createDatePicker({
        min: [2018, 1, 1],
        max: [2020, 12, 31],
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })

      this.picker = this.$createPicker({
        title: '',
        data: [data1],
        onSelect: this.selectNumHandle,
        onCancel: this.cancelNumHandle
      })

    },
    methods: {
      showCityPicker() {
        this.cityPicker.show()
      },
      showPicker() {
        this.picker.show()
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
      selectNumHandle(selectedVal, selectedIndex, selectedText) {
        this.goNum = selectedText.join('');
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
      }
    }
  }

</script>



