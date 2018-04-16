/*Created by soft on 2018/1/8 */
<template>
  <div :class="prefixCls">
    <div class="select-wrapper clearfix">
      <ul :class="prefixCls+'-nav'" ref="titleList">
        <li v-for="(title , index) in titleText" @click="changeTab(index , $event)">{{title}}</li>

      </ul>
      <div class="pro-select" @click="proSelect($event)" ref="proSel">高级筛选</div>
    </div>

    <div :class="[{show:show}, prefixCls+'-wrapper']" ref="dropDownWrapper">
      <div :class="[prefixCls+'-list']" v-for="(list , index) in dropDownList" ref="fis">
        <ul>
          <li v-for="(item , index) in list[0]" @click="selectFirstItem(index , $event)">{{item}}</li>
        </ul>

        <template v-if="list[1].length>0 && isInit[index]">
          <ul>
            <li v-for="(item , index) in list[1]" @click="selectSecondItem(index , $event)">{{item}}</li>
          </ul>
        </template>
        <template v-if="list[2].length>0">
          <ul>
            <li v-for="(item , index) in list[2]" @click="thirdSecondItem(index , $event)">{{item}}</li>
          </ul>
        </template>
      </div>

      <div :class="[prefixCls+'-list']" v-show="proShow" class="pro-list" ref="prodropDownWrapper">
        <div class="check-contain">
          <div class="check-wrapper">
            <radio-box title="性别" :options="sexArr" v-model="sex"/>
          </div>
          <div class="check-wrapper">
            <radio-box title="年龄" :options="ageArr" v-model="age"/>
          </div>
          <div class="check-wrapper">
            <div class="clearfix"><span class="tits fl">价格范围</span>

              <div class="fl price-wrap"><input class="price-txt" v-model="minprice" type="text"> 元<span> - </span> <input class="price-txt" v-model="maxprice" type="text"> 元</div>
              <div class="price-limit fr"  @click="showPicker"><span>快捷</span>范围
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </div>
            </div>


          </div>
          <div class="check-wrapper">

            <radio-box title="是否团游" :options="isGroupArr" v-model="isGroup"/>

          </div>
          <div class="check-wrapper">
            <radio-box title="向导能力" :options="serverTypeArr" v-model="serverType"/>
          </div>
          <div class="check-wrapper">
            <!--<h5>预订时间</h5>-->
            <div class=" clearfix" @click="showTimePicker"><span class="tits fl">选择预订时间</span>
              <div class="price-limit fr">{{orderTime}}
              <svg>
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </div>
            </div>
          </div>
        </div>

        <div class="btn-wrapper clearfix" v-show="proShow">
          <button class="re fl" @click="resetCon">重置</button>
          <button class="sure fr" @click="sureProSelect">确定</button>
        </div>
      </div>
      <div :class="prefixCls+'-cover'" @click="hideWrapper"></div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import Vue from 'vue'
  import CheckBox from '../components/check-box.vue'
  import RadioBox from '../components/radio-box.vue'
  import DatePicker from '../components/date-picker'

  import {dateFmt} from '../config/myUtils'
  createAPI(Vue, DatePicker, ['select', 'cancel'], false)
  Array.prototype.arrClear = function () {
    this.splice(0, this.length);
  };
  var firstIndex = [],
    secondIndex = 0,
    thirdIndex = 0;
  var selectedData = [];
  export default {
    name: 'dropDown',
    data() {
      return {
        prefixCls: 'iv-dropDown',
        show: false,
        proShow: false,
        titleText: [],
        isInit: [],
        dropDownList: [],
        selectSex: false,
        selectSex2: false,
        sexArr: [
          // TODO:这里的全部value为空就有问题了,如果全选就传空值给后台
          {label: '全部', value: ''},
          {label: '男', value: '1'},
          {label: '女', value: '2'}
        ],
        ageArr: [
          {label: '全部', value: ''},
          {label: '70后', value: '70后'},
          {label: '80后', value: '80后'},
          {label: '90后', value: '90后'},
          {label: '00后', value: '00后'},

        ],
        sex: '',     //性别
        age: '',     //年龄
        priceRange: '价格范围',
        minprice: '',
        maxprice: '',
        selecteGroup: '2',
        isGroup: '', //是否开团
        reserveTime: '',// 预约时间
        isGroupArr: [
          {label: '已开团', value: '1'},
          {label: '未开团', value: '2'}
        ],
        serverType: '',
        serverTypeArr: [
          {label: '代买车票', value: '1'},
          {label: '有车', value: '2'},
          {label: '包接送', value: '3'}
        ],
        selecteTicket: '2',
        isbuyticket: false,
        isshuttle: false,
        orderTime: '预订时间',
        priceRang: [{id: 1, range: '100-200', min: 100, max: 200},
          {id: 2, range: '200-300', min: 200, max: 300},
          {id: 3, range: '300-400', min: 300, max: 400},
          {id: 3, range: '400-500', min: 400, max: 500}]
      };
    },
    listEl: null,
    tabIndex: 0,
    props: {
      dropDownData: {
        type: Array,
        default() {
          return [];
        }
      },
      selectCallback: {
        type: Function,
        default() {
        }
      }
    },
    watch: {
      dropDownData() {
        this.init();
      }
    },
    components: {
      CheckBox,
      RadioBox
    },
    created() {
      if (this.dropDownData.length > 0) this.init();
    },
    mounted() {
      this.$options.titleList = this.$refs.titleList;
      this.$options.listEl = this.$refs.dropDownWrapper.querySelectorAll('.iv-dropDown-list'); //
      this.$options.listEl[0].classList.add('active');
      this.$options.proEl = this.$refs.proSel;
      this.mutiPicker = this.$createPicker({
        title: '价格范围',
        data: [this.priceRang],
        value: '200-300',
        alias: {
          value: 'id',
          text: 'range'
        },
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })

      //获取当前日期,s设置日期初始时间点
      let nowTime = new Date(), startTime = [];
      let nowday = dateFmt(nowTime, 'yyyy-M-dd-hh');
      console.log(`现在的日期是${nowday}`)
      let minDay  = nowday.split('-');
      let mindate = [];
      minDay.forEach((v,i)=>{
        mindate[i] = parseInt(v)
      });
      console.log(mindate)
      if(nowTime.getHours() >= 18) {
        //超过18点默认订明天
        nowTime.setTime(nowTime.getTime()+24*60*60*1000);
        let startDay = dateFmt(nowTime, 'yyyy-M-dd');
        let startDate  = startDay.split('-');
        startDate.forEach((v,i)=>{
          startTime[i] = parseInt(v)
        });
      } else {
        startTime = mindate
      }
      this.datePicker = this.$createDatePicker({
        title: '出行日期',
        min: mindate,
        max: [2020, 12, 31],
        value: startTime,
        columnCount: 3,
        onSelect: this.selecTimetHandle,
        onCancel: this.cancelHandle
      })
    },

    methods: {
      init() {
        this.dropDownData.forEach((item, i) => {
          var arr = [[], [], []];
          this.isInit.push(false);
          this.dropDownList.push(arr);
          firstIndex.push(0);
          this.titleText.push(item.name);
          item.children.forEach((firstItem, j) => {
            this.dropDownList[i][0].push(firstItem.name);
            if (firstItem.children && j === 0) {
              firstItem.children.forEach((secondItem, k) => {
                this.dropDownList[i][1].push(secondItem.name);
                if (secondItem.children && k === 0) {
                  secondItem.children.forEach(thirdItem => {
                    this.dropDownList[i][2].push(thirdItem.name);
                  });
                }
              });
            }
          });
        });
      },
      changeTab(index, e) {

        document.body.style.overflow = 'hidden';
        this.$options.proEl.classList.remove('cur')
        this.$options.listEl.forEach(item => {
          item.classList.remove('active');
        });
        this.$options.listEl[index].classList.add('active');
        this.$options.tabIndex = index;
        if (e.target.classList.contains('cur')) {
          this.hideWrapper();
          e.target.classList.remove('cur');
        } else {
          this.classHandler(e);
          this.show = true;
        }
      },
      selectFirstItem(index, e) {
        let i = this.$options.tabIndex; //第几个tab
        firstIndex[i] = index;
        let child = this.dropDownData[i].children[firstIndex[i]];
        this.isInit[i] = true;
        this.classHandler(e);
        selectedData.splice(1, selectedData.length);
        selectedData[0] = child;
        selectedData[0].type = this.dropDownData[i].value
        //change secondArr
        if (!child.children) {
          this.dropDownList[i][1].arrClear();
          this.dropDownList[i][2].arrClear();
          this.hideWrapper();
        } else {
          // set init state
          this.classInit(e, 'first');
          this.dropDownList[i][1].arrClear();
          child.children.forEach(item => {
            this.dropDownList[i][1].push(item.name);
          });
          this.dropDownList[i][2].arrClear();
        }
        this.titleText[i] = selectedData[0].name;
        this.selectCallback(selectedData);
      },
      selectSecondItem(index, e) {
        let i = this.$options.tabIndex;
        this.classHandler(e); //第几个tab
        secondIndex = index;
        let child = this.dropDownData[i].children[firstIndex[i]];
        selectedData.splice(2, selectedData.length);
        selectedData[0] = selectedData[0] ? selectedData[0] : child;
        selectedData[1] = child.children[secondIndex];
        if (!child.children[secondIndex].children) {
          this.dropDownList[i][2].arrClear();
          this.hideWrapper();
        } else {
          // set init state
          this.classInit(e, 'second');
          this.dropDownList[i][2].arrClear();
          child.children[secondIndex].children.forEach(item => {
            this.dropDownList[i][2].push(item.name);
          });
        }
        this.titleText[i] = selectedData[1].name;
        this.selectCallback(selectedData);
      },
      thirdSecondItem(index, e) {
        let i = this.$options.tabIndex; //第几个tab
        thirdIndex = index;
        let child = this.dropDownData[i].children[firstIndex[i]];
        this.classHandler(e);
        selectedData[0] = selectedData[0] ? selectedData[0] : child;
        selectedData[1] = selectedData[1] ? selectedData[1] : child.children[0];
        selectedData[2] = child.children[secondIndex].children[thirdIndex];
        this.titleText.splice(i, 1, selectedData[2].name);
        this.selectCallback(selectedData);
        this.hideWrapper();
      },
      proSelect(e) {
        document.body.style.overflow = 'hidden';
        this.show = true;
        this.proShow = true;
        console.log('高级筛选')
        this.$options.listEl.forEach(item => {
          item.classList.remove('active');
        });
        this.$options.listEl[2].classList.add('active');
        this.$options.titleList.querySelectorAll('li').forEach(item => {
          item.classList.remove('cur');
        });
        if (e.target.classList.contains('cur')) {
          this.hideWrapper();
          e.target.classList.remove('cur');
        } else {
          e.target.classList.add('cur');
          this.show = true;
        }
      },
      hideWrapper() {
        document.body.style.overflow = 'auto';
        this.show = false;
        this.proShow = false;
        this.$options.titleList.querySelectorAll('li').forEach(item => {
          item.classList.remove('cur');
        });

        this.$options.proEl.classList.remove('cur')
      },
      classHandler(e) {
        e.target.parentNode.childNodes.forEach(item => {
          item.classList.remove('cur');
        });
        e.target.classList.add('cur');
      },
      // init other ul's class when user click
      classInit(e, sequence) {
        let parent = e.target.parentNode.parentNode;
        let childs = parent.querySelectorAll('ul');
        let index = sequence === 'first' ? 1 : 2;
        if (childs[index]) {
          let lis = childs[index].querySelectorAll('li');
          lis.forEach(item => {
            item.classList.remove('cur');
          });
        }
      },
      showPicker() {
        this.mutiPicker.show()
      },
      showTimePicker() {
        this.datePicker.show();
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.priceRange = selectedText[0] + '元';
        this.minprice = this.priceRang[selectedIndex[0]].min
        this.maxprice = this.priceRang[selectedIndex[0]].max
      },
      selecTimetHandle(selectedVal, selectedIndex, selectedText) {
        console.log(selectedVal, selectedIndex, selectedText)
        this.orderTime = selectedText.join('')
      },
      cancelHandle() {
        // this.$createToast({
        //   type: 'correct',
        //   txt: 'Picker canceled',
        //   time: 1000
        // }).show()
      },
      sureProSelect() {
        // TODO: 这里组装要传给后台的值
        let proCondition = [];
        proCondition.push({type: 'sex', value : this.sex})
        proCondition.push({type: 'agetype', value : this.age})
        proCondition.push({type: 'isGroup', value : this.isGroup})
        proCondition.push({type: 'serverType', value : this.serverType})
        proCondition.push({type: 'minprice', value : this.minprice})
        proCondition.push({type: 'maxprice', value : this.maxprice})
        proCondition.push({type: 'reserveTime', value : this.reserveTime})
        proCondition.push({type: 'orderTime', value : this.orderTime})
        console.error(JSON.stringify(proCondition))
        this.hideWrapper();
        this.proShow = false;
        this.$emit('selectCallback', proCondition);
      },
      resetCon() {
        this.sex = '';
        this.age = '';
        this.isGroup = '';
        this.serverType = '';
        this.reserveTime = '';
        this.orderTime = '';
        this.priceRange=''
        this.minprice=''
        this.maxprice=''
      }
    }
  }
</script>
