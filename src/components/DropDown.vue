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
            <div :class="[prefixCls+'-list']" class="pro-list" ref="prodropDownWrapper" >
                <div class="check-wrapper">
                  <h5>性别</h5>
                  <check-box v-model="isMale" checkText="男" />
                  <check-box v-model="isFemale" checkText="女" />
                </div>
              <div class="check-wrapper" @click="showPicker">
                <h5>价格范围</h5>
                <div class="price-limit clearfix">请选择价格范围
                  <span   class="fr">{{priceRange}}
                    <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="check-wrapper">
                <h5>团游</h5>
                <check-box v-model="isGroup" checkText="已组团" />
                <check-box v-model="noGroup" checkText="未组团" />
                <check-box v-model="isbuyticket" checkText="代买车票" />
                <check-box v-model="isshuttle" checkText="包接送" />
                <!--<radio-box v-model="selecteGroup" :options="group" />-->
                <!--<radio-box v-model="selecteTicket" :options="buyticket" />-->
              </div>
              <div class="check-wrapper">
                <h5>预订时间</h5>
                <div class="price-limit clearfix" @click="showTimePicker">选择预订时间

                  <span  class="fr">{{orderTime}}
                    <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                  </span>
                </div>
              </div>

              <div class="btn-wrapper" v-show="proShow">

                 <button class="re fl" @click="resetCon">取消</button>
                 <button class="sure fr" @click="sureProSelect">确定</button>


              </div>

            </div>
            <div :class="prefixCls+'-cover'" @click="hideWrapper"></div>

        </div>

    </div>
</template>



<script type="text/ecmascript-6">
    import CheckBox from '../components/check-box.vue'
    import RadioBox from '../components/radio-box.vue'
    import DatePicker from '../components/date-picker'
    import Vue from 'vue'
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
                dropDownList: [
                ],

                selectSex: false,
                selectSex2: false,
                sex : [
                  {
                    label: '男',
                    value: '1'
                  },
                  {
                    label: '女',
                    value: '2'
                  }
                ],
                isMale: false,
                isFemale: false,

                priceRange: '价格范围',

                selecteGroup: '2',
                group: [
                  {
                    label: '已开团',
                    value: '1'
                  },
                  {
                    label: '未开团',
                    value: '2'
                  }
                ],
                isGroup: false,
                noGroup: false,
                buyticket: [
                  {
                    label: '代买车票',
                    value: '1'
                  },
                  {
                    label: '包接送',
                    value: '2'
                  }
                ],
                selecteTicket: '2',

                isbuyticket: false,
                isshuttle: false,
                orderTime: '预订时间'
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
                default() { }
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
            if (this.dropDownData.length>0) this.init();
        },
        mounted() {
            this.$options.titleList = this.$refs.titleList;
            this.$options.listEl = this.$refs.dropDownWrapper.querySelectorAll('.iv-dropDown-list'); //
            this.$options.listEl[0].classList.add('active');
            this.$options.proEl = this.$refs.proSel;
            this.mutiPicker = this.$createPicker({
              title: '价格范围',
              data: [[{ id: 1, range: '100-200' }, { id: 2, range: '200-300' }, { id: 3, range: '300-400' }, { id: 3, range: '400-500' }]],
              alias: {
                value: 'id',
                text: 'range'
              },
              onSelect: this.selectHandle,
              onCancel: this.cancelHandle
            })

              this.datePicker = this.$createDatePicker({
                min: [2018, 1, 1],
                max: [2020, 1, 1],
                onSelect: this.selecTimetHandle,
                onCancel: this.cancelHandle
              })
            },

        methods: {
            init(){
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
              this.$options.listEl[3].classList.add('active');
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
                var parent = e.target.parentNode.parentNode;
                var childs = parent.querySelectorAll('ul');
                var index = sequence === 'first' ? 1 : 2;
                if (childs[index]) {
                    var lis = childs[index].querySelectorAll('li');
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
            console.log(selectedText)

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
              let proCondition = {};
              //性别
              if(this.isMale && !this.isFemale) {
                proCondition.sex = 1
              } else if(!this.isMale && this.isFemale) {
                proCondition.sex = 2
              } else {
                proCondition.sex = ''
              }
              //是否可团
            if(this.isGroup && !this.noGroup) {
              proCondition.todaytuan = 1
            } else if(!this.isGroup && this.noGroup) {
              proCondition.todaytuan = 2
            } else {
              proCondition.todaytuan = ''
            }
            //是否代买车票
            this.isbuyticket ? proCondition.isbuyticket = 1 : proCondition.isbuyticket = 0
            //是否包接送
            this.isshuttle ? proCondition.isshuttle = 1 : proCondition.isshuttle = 0

              //最低最高价;
              proCondition.priceRange = this.priceRange;
              proCondition.orderTime = this.orderTime;
            this.hideWrapper();
            this.$emit('proCondion', proCondition);

              // this.hideWrapper();
              // this.$createDialog({
              // //   type: 'alert',
              // //   title: 'Alert',
              // //   content: JSON.stringify(proCondition)
              // // }).show()

          },
          resetCon() {
            this.isMale = false ;
            this.isFemale = false;
            this.isGroup = false;
            this.noGroup = false;
            this.isshuttle = false;
            this.isbuyticket = false;


          }
        }
    }
</script>
