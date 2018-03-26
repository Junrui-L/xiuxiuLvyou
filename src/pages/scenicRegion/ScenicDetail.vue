/*Created by soft on 2018/1/9 */

<template>
    <div class="scenic_detail">
        <header ref="uiHeader">
            <HeadTop go-back='true' :headBg="headBg">
              <!--<div slot="select-title" class="select-title">-->
                <!--<span class="cityname ">北京北北</span>-->
              <!--</div>-->
            </HeadTop>
            <img  class="head-img" :src="basePath + plays.wfImg" alt="">
        </header>
        <div class="main-content">
            <div class="head-wrapper">
                <h3 class="region-name">{{plays.serviceCity}}-{{plays.scenicspot}} <span v-show="plays.sfzcty == 1">可团游</span></h3>
                <div class="region-adress">{{plays.serviceCity}}   <span>{{plays.wfname}}</span></div>
                <ul class="tips clearfix">
                    <li class="tip fl" v-for="word in getStr(plays.wfbq)">{{word}}</li>

                </ul>
            </div>

            <div class="guide-wrapper clearfix">
                <div class="guide-content" @click="$router.push({path: '/guideDetail',  query: {id: guide.visitorId}})">
                  <div class="guide-img fl">
                    <img :src="guide.userImg" alt="">
                  </div>
                  <div class="guide-detail fl">
                    <h5 class="guide-name"><span>{{guide.userName}}</span></h5>
                    <div class="guide-level"><span>{{guide.wfcount}}种玩法 </span> | <span>服务{{guide.fwcount}}人</span></div>
                    <EvaluateStar :code="guide.level"></EvaluateStar>
                  </div>
                </div>

                <!--<a class="guide-order fl" href="tel:22222"></a>-->
            </div>
        </div>
        <div class="region-detail-nav">
            <ul class="nav-title">
                <li class="nav-item" :class="{'active': navItem == 'price'}" @click="changeNav('price', '.price-package')">价格说明</li>
                <li class="nav-item" :class="{'active': navItem == 'play'}" @click="changeNav('play', '.play-methods')">玩法概述</li>
                <li class="nav-item" :class="{'active': navItem == 'order'}" @click="changeNav('order', '.order-tips')">预订须知</li>
                <li class="nav-item" :class="{'active': navItem == 'evaluation'}" @click="changeNav('evaluation', '.tourist-eval')">游客评价</li>
            </ul>
        </div>
        <div class="detail-desc">
            <div class="price-package">
                <section><h3 class="tite">价格说明</h3></section>

                <ul class="list-wrapper">

                   <li class="list-item" v-for="item in pricePackelist" @click="showPanPrice = !showPanPrice"><div class="item-tit">{{item.name}}<span class="fr" :class="{'up': showPanPrice}">￥{{item.price}}
                     <template v-if="item.unit == 1">
                        元/天
                      </template>
                    <template v-else-if="item.unit == 2">
                        单/天
                      </template>
                     <template v-else-if="item.unit == 3">
                        人/次
                      </template>
                     <template v-else-if="item.unit == 4">
                        单/次
                      </template>
                   </span>
                   </div>
                     <trans-pan>
                       <div class="price-desc" v-show="showPanPrice">
                         价格说明：{{item.explanation}}<br/>
                         油费服务里程数： {{item.sericelongkm}}Km<br/>
                         异地住宿费：{{item.ydzs_price}}/晚<br/>
                         服务超时费{{item.overtime_price}}元/小时，服务超里费{{item.overkm_price}}/公里
                       </div>
                     </trans-pan>

                   </li>
                </ul>
                <h4 class="tite sub-title">门票套餐</h4>
                <ul class="list-wrapper">
                    <li class="list-item" v-for="item in mpPackelist" @click="showPanTicket = !showPanTicket"><div class="item-tit">{{item.name}} <span class="fr" :class="{'up': showPanTicket}">￥{{item.price}}
                      <template v-if="item.unit == 1">
                        元/天
                      </template>
                      <template v-else-if="item.unit == 2">
                        单/天
                      </template>
                      <template v-else-if="item.unit == 3">
                        人/次
                      </template>
                      <template v-else-if="item.unit == 4">
                        单/次
                      </template>
                    </span></div>
                      <trans-pan>
                        <div class="price-desc" v-show="showPanTicket">
                          价格说明：{{item.remark}}<br/>
                          <!--油费服务里程数： 10Km<br/>-->
                          <!--异地住宿费：30/晚<br/>-->
                          <!--服务超时费10元/小时，服务超里费10/公里-->
                        </div>
                      </trans-pan>

                    </li>
                    <!--<li class="list-item" ><div class="item-tit">故宫学生票一张  <span class="fr">￥20</span></div></li>-->
                </ul>
            </div>
            <div class="play-methods">
                <section><h3 class="tite">玩法概述</h3></section>
                <div class="methods-desc">
                  {{plays.wfjs}}

                </div>
                <h4 class="tite sub-title">游玩图片</h4>
                <template v-for="(img, index) in playImgs">
                  <h5 class="img-doc"> {{img.imgdoc}} </h5>
                  <ul class="img-wrapper clearfix">
                    <li class="img-container" v-for="i in getStr(img.imgs)">
                      <img :src="basePath + i" alt="">
                    </li>
                  </ul>
               </template>

            </div>
            <div class="order-tips">
                <section><h3 class="tite">预订须知</h3></section>
                <ul class="list-wrapper">
                    <li class="list-item" >
                        <div class="item-tit"  @click="showPanGuide = !showPanGuide"   >向导提醒预订须知 <span class="fr" :class="{'up': showPanGuide}"></span></div>
                        <trans-pan>
                          <div class="price-desc" v-show="showPanGuide">
                            {{plays.xdtx}}
                          </div>
                        </trans-pan>

                    </li>
                    <li class="list-item" >
                        <div class="item-tit" @click="showPanPlant = !showPanPlant">平台提醒预订须知 <span class="fr" :class="{'up': showPanPlant}"></span></div>
                      <trans-pan>
                        <div class="price-desc" v-show="showPanPlant">
                          咻咻向导平台为游客和向导提供正规交易保障，请一切涉及到旅游出行的预订，务必通过平台交易。一切未经平台发生的交易行为，均将不受平台保护。
                        </div>
                      </trans-pan>

                    </li>
                  <li class="list-item" >
                    <div class="item-tit" @click="showPanPoilcy = !showPanPoilcy" >退订政策 <span class="fr" :class="{'up': showPanPoilcy}"></span></div>
                    <trans-pan>
                      <div class="price-desc"  v-show="showPanPoilcy">
                        （1）预订当天出行：付款后15分钟内全额退款，付款30分钟内收取15%服务费，付款60分钟内收取50%服务费，超过60分钟将扣取订单金额100%;<br/>
                        （2）预定第二天出行：付款后1小时内全额退款，付款3小时内收取15%服务费，付款5小时内收取50%服务费，超过5小时将扣取订单金额100%<br/>
                        （3）预定离出行5天内：出发24小时内扣除金额100%,1-2天内取消预定扣除订单金额50%；2-3天扣除20%，3天以上全额退款。<br/>
                        （4）预定离出行10天内：出发2天内扣除金额100%,2-4天内取消预定扣除订单金额50%；4-8天扣除20%，8天以上全额退款。<br/>
                        （5）预定离出行大于10天：出发4天内扣除金额100%,4-8天内取消预定扣除订单金额50%；8-10天扣除20%，10天以上全额退款。<br/>
                        （6） 代订类服务退订说明<br/>
                          a.如代订类服务产生退订，则按照第三方退订政策执行，达人需提供代订证明。若未实际支付，则代订费用全部退还；<br/>
                          b.由于不可抗力因素产生退订，请联系客服，协商处理。
                      </div>
                    </trans-pan>

                  </li>
                </ul>
            </div>
            <div class="tourist-eval">
                <section><h3 class="tite">游客评价</h3></section>

                <div class="all-command">
                    <div class="command-tit  clearfix">

                            <p class="command-num">全部{{plays.assessnum}}条评论</p>
                            <EvaluateStar :code="plays.score/2"></EvaluateStar> {{plays.score}}分


                        <span class="see-command" @click="$router.push({path: '/assessList',  query: {playId: plays.id, guideId: guide.visitorId}})">查看点评</span>
                    </div>
                    <ul class="command-tip clearfix">
                        <li class="tip fl">细心周到（1）</li>
                        <li class="tip fl">热情好客（2）</li>
                        <li class="tip fl">当地通（1）</li>
                        <li class="tip fl">细心周到（1）</li>
                        <li class="tip fl">细心周到（1）</li>
                        <li class="tip fl">幽默开朗（55）</li>
                    </ul>
                </div>
            </div>
            <div class="other-playmethos" v-if="otherPlays.length > 0">
                <section><h3 class="tite">向导其他玩法</h3></section>
                <ul class="methos-wrapper">
                    <li class="methods" v-for="item in otherPlays "  @click="playListDetail(item.id, item.accountid)">

                            <dl class="clearfix">
                                <dt class="method-img fl">
                                    <img :src="basePath + plays.wfImg" alt="">
                                </dt>
                                <dd class="method-detail fl">
                                    <div class="method-desc">{{item.wfjs}}</div>
                                    <div class="method-price">￥{{item.minprice}}起/人</div>
                                </dd>
                            </dl>
                            <div class="method-txt">
                                <p>
                                    {{item.wfjs}}
                                </p>
                            </div>

                    </li>

                </ul>
            </div>
        </div>
        <div class="secnic-footer ">
            <div class="clearfix">
                <div class="fucc fl">
                    <span class="favarate">收藏</span>
                    <span class="chat">咨询</span>
                </div>
                <button class="order-btn fr" @click="showChoosPopup">找我预约</button>
            </div>
        </div>

        <cube-popup type="choose-popup"  :center="false" ref="choosePopup">
          <div class="bootom-cotent">
            <i class="close" @click="hideChoosePopup"></i>

            <div class="head-wrapper">
              <h3 class="region-name">{{plays.serviceCity}}-{{plays.scenicspot}} <span v-show="plays.sfzcty == 1">可团游</span></h3>
              <div class="region-adress">{{plays.serviceCity}}   <span>{{plays.wfname}}</span></div>
              <ul class="tips clearfix">
                <li class="tip fl" v-for="word in getStr(plays.wfbq)">{{word}}</li>

              </ul>
            </div>
            <ul class="choose-wrap">
              <li class="choose-item clearfix" @click="showDatePicker">选择出行日期 <span class="fr">{{travalDate.txt}}
                <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
              </li>
              <li class="choose-item clearfix" @click="showDayPicker">游玩天数 <span class="fr">{{travalDay.txt }}
                <svg>
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
              </li>
              <li class="choose-item clearfix" @click="showMealPicker">可选套餐
                <span class="fr"> {{mealType.type}}
                   <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
                </span>
              </li>
              <li class="choose-item clearfix" @click="showPeoplePicker">出行人数
                <span class="fr">{{peopleNum.txt}}
                   <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
                </span>
              </li>
            </ul>

            <div class="secnic-footer ">
              <div class="clearfix">
                <div class="fucc fl">
                  <span class="favarate">收藏</span>
                  <span class="chat">咨询</span>
                </div>
                <button class="order-btn fr" @click="nextStep">下一步</button>
              </div>
            </div>
          </div>
        </cube-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import {mapState, mapMutations} from 'vuex'
    import {guideDetails, playlistDetail, loadPackage, initOrder} from '../../http/getDate'
    import HeadTop from '../../components/HeadTop.vue'
    import EvaluateStar from '../../components/EvaluateStar.vue'
    import DatePicker from '../../components/date-picker'
    import {peopleNum, peoleData} from '../../config/datajs'
    import {dateFmt} from '../../config/myUtils'
    import TransPan from  '../../components/transitionPanel'
    createAPI(Vue, DatePicker, ['select', 'cancel'], false)
    let  peoledata = peopleNum
    export default {
        data() {
            return {
                headBg: false,
                scenicspot: this.$route.query.scenicspot, // 景点
                accountId: this.$route.query.accountId,  //向导
                playId: this.$route.query.playId,        //玩法id
                guide: '',
                plays:'',  //当前玩法详情
                playImgs: [], //游玩的图片
                mpPackelist: [],
                playlist: [],
                pricePackelist: [], //套餐
                priceRanges: [],
                mealdata: [],
                travalDate: '',
                travalDay: '',
                mealType: '',
                peopleNum: '',
                newPricePackelist:[],
                navItem: 'price',
                showPanPrice: false,  //各说明的详情下拉展示隐藏
                showPanTicket: false,
                showPanGuide: false,
                showPanPlant: false,
                showPanPoilcy: false,
            }
        },
        components: {
            HeadTop,
            EvaluateStar,
            TransPan
        },
        computed: {
          ...mapState([
            'basePath','location','userInfo', 'baseOrder','guideInfo','play'
          ]),
          otherPlays: function () {
            //过滤当前显示的玩法
            let others = this.playlist;
            return others.filter(item => {
              return item.id != this.plays.id
            })
          }
        },
        mounted() {
          console.log(this.play);

          if(this.$route.query.scenicspot) {
            console.log('从景区id来的')
            this.getData()
          } else if(this.$route.query.playId){
            console.log('从玩法id来的')
            this.playListDetail(this.playId, this.accountId)

          }

          this.dayPicker = this.$createPicker({
            title: '出行天数',
            data: [peoleData],
            alias: {
              value: 'num',
            },
            onSelect: this.selectDayHandle,
            onCancel: this.cancelHandle
          })

          this.peoplePicker = this.$createPicker({
            title: '出行人数',
            data: [peoledata],
            alias: {
              value: 'num',
            },
            onSelect: this.selectpeopleHandle,
            onCancel: this.cancelHandle
          })
          //获取当前日期
          let nowTime = new Date();
          if(nowTime.getHours() >= 18) {
            //超高跟18点默认订明天
            nowTime.setTime(nowTime.getTime()+24*60*60*1000)
          }
          let nowday = dateFmt(nowTime, 'yyyy-M-dd');
          let minDay = nowday = nowday.split('-');
          this.datePicker = this.$createDatePicker({
            min: minDay,
            max: [2020, 12, 31],
            onSelect: this.selecTimetHandle,
            onCancel: this.cancelHandle
          })


      },
        methods: {
          ...mapMutations(['GET_USERINFO','RECORD_ADDRESS' ,'BASE_ORDER','SAVE_GUIDE','SAVE_PLAY','SAVE_PRICEPACKAGE']),
          getData() {
            guideDetails(this.scenicspot, this.accountId).then( res=> {
              console.log('----景区id查找向导玩法详情-------')
              console.log(res);
              if(res.msg){
                console.log(res.msg)
                //景区向导不存在
                this.$router.replace({path: '/guideDetail',  query: {id: this.accountId}})
              }else {
                this.plays = res.play;
                this.playImgs = res.ywImgs;
                this.guide = res.guide;
                this.mpPackelist= res.mpPackelist
                this.playlist=res.playlist
                this.pricePackelist=res.pricePackelist//套餐
                this.priceRanges=res.priceRanges
                this.playId = res.play.id; //向导Id
                this.SAVE_GUIDE(res.guide);
                this.SAVE_PLAY(res.play)
              }

            })
          },
          playListDetail(pid, aid){
            playlistDetail(pid, aid).then(res => {
              console.log('--------向导玩法id查找玩法详情------------')
              console.log(res);
              this.plays = res.play;
              this.guide = res.guide;
              this.mpPackelist= res.mpPackelist
              this.playlist=res.playlist
              this.pricePackelist=res.pricePackelist//套餐
              this.priceRanges=res.priceRanges
              console.log(this.pricePackelist);
              this.playId = res.play.id; //向导Id
              console.log(res.guide)
              this.SAVE_GUIDE(res.guide);
              this.SAVE_PLAY(res.play)
              // console.log(this.otherPlays)
            })
          },
          priceList(godate, accountId, playId) {
            loadPackage(godate, accountId, playId).then(res => {
              this.newPricePackelist = res.pricepackageList;   //根据日期的套餐集合
              for(let i=0; i< this.newPricePackelist.length; i++) {
                this.mealdata[i] = {value:this.newPricePackelist[i].id, text: this.newPricePackelist[i].name}
              }
              let tcData = JSON.parse(JSON.stringify(this.mealdata));
              this.mealPicker = this.$createPicker({
                title: '套餐选择',
                data: [tcData],
                onSelect: this.selectMealHandle,
                onCancel: this.cancelHandle
              })

              console.log('.....套餐选择初始化......')
            })
          },
          showDatePicker() {
            this.datePicker.show();
          },
          showMealPicker(){
            if(this.mealPicker) {
              this.mealPicker.show();
            } else {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择日期'
              }).show()
            }

          },
          showPeoplePicker() {
            this.peoplePicker.show();
          },
          showDayPicker(){
            this.dayPicker.show();
          },
          selecTimetHandle(selectedVal, selectedIndex, selectedText) {
            //加0
            let sv = selectedVal.map((i)=>{
               return  i < 10 ? '0' + i : i
            })
            this.travalDate = {value: sv.join('-'), txt: selectedText.join('')}
            this.priceList(this.travalDate.value, this.scenicspot, this.plays.id )
          },
          selectDayHandle(selectedVal, selectedIndex, selectedText){
            // this.dayPicker.show();
            this.travalDay = {value:selectedVal[0], txt: selectedText[0] }
          },
          selectMealHandle(selectedVal, selectedIndex, selectedText) {
            this.mealType = {type:selectedText[0],id: selectedVal[0]};
            this.SAVE_PRICEPACKAGE(this.newPricePackelist[selectedIndex[0]])
          },
          selectpeopleHandle(selectedVal, selectedIndex, selectedText) {
            // this.peopleNum = selectedVal[0] + '人'
            this.peopleNum = {value:selectedVal[0], txt: selectedText[0] }
          },
          showChoosPopup() {
            const component = this.$refs.choosePopup
            component.show()
          },
          hideChoosePopup() {
            const component = this.$refs.choosePopup;
            component.hide();
          },
          nextStep(){
            if(this.travalDate == '' ){
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择日期'
              }).show()
            } else if(this.travalDay == '' ) {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择出行天数'
              }).show()
            }else if(this.travalDay.value < this.plays.playDay ) {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '出行天数须大于玩法天数'
              }).show()
            } else if(this.mealType == '' ){
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择套餐'
              }).show()
            } else  if(this.peopleNum == '') {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择人数'
              }).show()
            } else if(this.travalDate != '' && this.mealType!= '' && this.peopleNum != '' && this.travalDay.value >= this.plays.playDay) {

             //初始化订单 更新初步订单到数据仓库
              console.log('去下一步')
              initOrder(this.travalDate.value,this.travalDay.value, this.accountId, this.playId, this.peopleNum.value, this.mealType.id, 0, 0).then(res => {
                console.log(res);
                if(res.msg){
                  this.$createDialog({
                    type: 'alert',
                    title: '温馨提示',
                    content: res.msg,
                    showClose: true
                  }).show()
                }else  {
                  this.BASE_ORDER({travalDate:this.travalDate,travalDay: this.travalDay, mealType: this.mealType, peopleNum: this.peopleNum})
                  this.$router.push({name: 'orderDetail',query: {guideId: this.accountId, playId: this.playId}})
                }
              })

              // this.BASE_ORDER({travalDate:this.travalDate,travalDay: this.travalDay, mealType: this.mealType, peopleNum: this.peopleNum})
              // this.$router.push({name: 'orderDetail',query: {guideId: this.accountId, playId: this.playId}})

            }

          },
          changeNav(item, itemDetail){
            this.navItem = item;
            let  scrollItem = document.querySelector(itemDetail);
            let  total = scrollItem.offsetTop;
            console.log('距离顶部高度' + total);
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total
          },
          getStr(str) {
            if( str && str != ''){
              let strList = str.split(';');
              return strList;
              } else {
              return [];
            }

          }
        }
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


