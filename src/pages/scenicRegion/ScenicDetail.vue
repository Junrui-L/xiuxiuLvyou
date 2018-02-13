/*Created by soft on 2018/1/9 */

<template>
    <div class="scenic_detail">
        <header ref="uiHeader">
            <HeadTop go-back='true' :headBg="headBg">
              <!--<div slot="select-title" class="select-title">-->
                <!--<span class="cityname ">北京北北</span>-->
              <!--</div>-->
            </HeadTop>
            <img  class="head-img" :src="getImgUrl(plays.wfImg)" alt="">
        </header>
        <div class="main-content">
            <div class="head-wrapper">
                <h3 class="region-name">{{plays.serviceCity}}-{{plays.scenicspot}} <span v-show="plays.sfzcty == 1">可团游</span></h3>
                <div class="region-adress">{{plays.serviceCity}}   <span>{{plays.wfname}}</span></div>
                <ul class="tips clearfix">
                    <li class="tip fl">景点带游</li>
                    <li class="tip fl">美景拍摄</li>
                    <li class="tip fl">历史古迹</li>
                </ul>
            </div>

            <div class="guide-wrapper clearfix">
                <div class="guide-img fl">
                    <img :src="guide.userImg" alt="">
                </div>
                <div class="guide-detail fl">
                    <h5 class="guide-name"><span>{{guide.userName}}</span></h5>
                    <div class="guide-level"><span>服务{{guide.fwcount}}人</span> | <span>{{guide.wfcount}}种玩法 </span></div>
                    <EvaluateStar :code="guide.level"></EvaluateStar>
                </div>
                <a class="guide-order fl" href="tel:22222"></a>
            </div>
        </div>
        <div class="region-detail-nav">
            <ul class="nav-title">
                <li class="nav-item active"><span>价格说明</span></li>
                <li class="nav-item">玩法概述</li>
                <li class="nav-item">预订须知</li>
                <li class="nav-item">游客评价</li>
            </ul>
        </div>
        <div class="detail-desc">
            <div class="price-package">
                <section><h3 class="tite">价格套餐</h3></section>

                <ul class="list-wrapper">

                   <li class="list-item" v-for="item in pricePackelist"><div class="item-tit">{{item.name}}<span class="fr">￥{{item.price}}
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
                       <div class="price-desc">
                           价格说明：{{item.explanation}}<br/>
                           油费服务里程数： {{item.sericelongkm}}Km<br/>
                           异地住宿费：{{item.ydzs_price}}/晚<br/>
                           服务超时费{{item.overtime_price}}元/小时，服务超里费{{item.overkm_price}}/公里
                       </div>
                   </li>
                </ul>
                <h4 class="tite sub-title">门票套餐</h4>
                <ul class="list-wrapper">
                    <li class="list-item" v-for="item in mpPackelist"><div class="item-tit">{{item.name}} <span class="fr">￥{{item.price}}
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
                        <div class="price-desc">
                            价格说明：{{item.remark}}<br/>
                            <!--油费服务里程数： 10Km<br/>-->
                            <!--异地住宿费：30/晚<br/>-->
                            <!--服务超时费10元/小时，服务超里费10/公里-->
                        </div>
                    </li>
                    <!--<li class="list-item" ><div class="item-tit">故宫学生票一张  <span class="fr">￥20</span></div></li>-->
                </ul>
            </div>
            <div class="play-methods">
                <section><h3 class="tite">玩法概述</h3></section>
                <div class="methods-desc">
                  {{plays.wfjs}}
                    <!--还可以通过HTML标签上的id或者class来生成扩展实例构造器，Vue.extend里的代码是一样的，只是在挂载的时候，-->
                    <!--还可以通过HTML标签上的id或者class来生成扩展实例构造器，Vue.extend里的代码是一样的，只是在挂载的时候，-->
                    <!--我们用类似jquery的选择器的方法，来进行挂载就可以了。-->
                    <!--我们用类似jquery的选择器的方法，来进行挂载就可以了。-->
                </div>
                <h4 class="tite sub-title">游玩图片</h4>
                <ul class="img-wrapper clearfix">
                    <li class="img-container"><img :src="getImgUrl(plays.ywImg)" alt=""></li>
                    <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
                    <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
                    <li class="img-container"><img src="../../assets/img/home_list-1.jpg" alt=""></li>
                </ul>
            </div>
            <div class="order-tips">
                <section><h3 class="tite">预订须知</h3></section>
                <ul class="list-wrapper">
                    <li class="list-item" >
                        <div class="item-tit">向导提醒预订须知 <span class="fr"></span></div>
                        <div class="price-desc">
                            {{plays.xdtx}}
                        </div>
                    </li>
                    <li class="list-item" >
                        <div class="item-tit">平台提醒预订须知 <span class="fr"></span></div>
                        <div class="price-desc">
                            价格说明：价格包含讲解费，车费<br/>
                            油费服务里程数： 10Km<br/>
                            异地住宿费：30/晚<br/>
                            服务超时费10元/小时，服务超里费10/公里
                        </div>
                    </li>
                    <li class="list-item" >
                        <div class="item-tit">退订政策 <span class="fr"></span></div>
                        <div class="price-desc hide">
                            价格说明：价格包含讲解费，车费<br/>
                            油费服务里程数： 10Km<br/>
                            异地住宿费：30/晚<br/>
                            服务超时费10元/小时，服务超里费10/公里
                        </div>
                    </li>
                </ul>
            </div>
            <div class="tourist-eval">
                <section><h3 class="tite">游客评价</h3></section>

                <div class="all-command">
                    <div class="command-tit  clearfix">

                            <p class="command-num">全部100条评论</p>
                            <EvaluateStar :code="3"></EvaluateStar> 5分


                        <span class="see-command">查看点评</span>
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
            <div class="other-playmethos">
                <section><h3 class="tite">向导其他玩法</h3></section>
                <ul class="methos-wrapper">
                    <li class="methods" v-for="item in playlist"  @click="$router.push({name: 'scenicDetail',  query: {playId: 5, accountId: 1}})">

                            <dl class="clearfix">
                                <dt class="method-img fl">
                                    <img :src="getImgUrl(item.wfimg)" alt="">
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
              <h3 class="region-name">北京故宫-颐和园 <span>可团游</span></h3>
              <div class="region-adress">北京   <span>景点详解</span></div>
              <ul class="tips clearfix">
                <li class="tip fl">景点带游</li>
                <li class="tip fl">美景拍摄</li>
                <li class="tip fl">历史古迹</li>
              </ul>
            </div>
            <ul class="choose-wrap">
              <li class="choose-item clearfix" @click="showDatePicker">选择出行日期 <span class="fr">{{travalDate.txt}}
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
    import {guideDetails, playlistDetail, loadPackage} from '../../http/getDate'
    import HeadTop from '../../components/HeadTop.vue'
    import EvaluateStar from '../../components/EvaluateStar.vue'
    import DatePicker from '../../components/date-picker'
    import {peopleNum} from '../../config/datajs'

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
                plays:'',
                mpPackelist: [],
                playlist: [],
                pricePackelist: [], //套餐
                priceRanges: [],
                mealdata: [],
                travalDate: '',
                mealType: '',
                peopleNum: '',
                newPricePackelist:[]
            }
        },
        components: {
            HeadTop,
            EvaluateStar
        },
        computed: {
          ...mapState([
            'basePath','location','userInfo', 'baseOrder','guideInfo','play'
          ]),
        },
        mounted() {
          if(this.$route.query.scenicspot) {
            console.log('从景区id来的')
            this.getData()
          } else if(this.$route.query.playId){
            console.log('从玩法id来的')
            this.playListDetail()

          }

          this.peoplePicker = this.$createPicker({
            title: '出行人数',
            data: [peoledata],
            alias: {
              value: 'num',
            },
            onSelect: this.selectpeopleHandle,
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
          ...mapMutations(['GET_USERINFO','RECORD_ADDRESS' ,'BASE_ORDER','SAVE_GUIDE','SAVE_PLAY','SAVE_PRICEPACKAGE']),
          getData() {
            guideDetails(this.scenicspot, this.accountId).then( res=> {
              console.log('----景区id查找向导玩法详情-------')
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

            })
          },
          playListDetail(){
            playlistDetail(this.playId, this.accountId).then(res => {
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
          selecTimetHandle(selectedVal, selectedIndex, selectedText) {
            this.travalDate = {value: selectedVal.join('-'), txt: selectedText.join('')}
            console.log(this.travalDate )

            this.priceList(this.travalDate.value, this.scenicspot, this.accountId )
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
            if(this.travalDate != '' && this.mealType!= '' && this.peopleNum != '') {
              this.BASE_ORDER({travalDate:this.travalDate, mealType: this.mealType, peopleNum: this.peopleNum})

              this.$router.push({name: 'orderDetail',query: {guideId: this.accountId, playId: this.playId}})
            } else if(this.travalDate == '' ){
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: '请先选择日期'
              }).show()
            }else if(this.mealType == '' ){
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
            }
            console.log('去下一步')
            // 更新初步订单到数据仓库

          },
          getImgUrl(url, mode) {
            let baseUrl = this.basePath;
            let dUrl = url.split('/')[1];
            switch (mode) {
              case 'small':
                return baseUrl + 'fileUploadsmall/' + dUrl;
              case 'middle':
                return baseUrl + 'fileUploadmedium/' + dUrl;
              case 'orgin':
                return baseUrl + 'fileUpload/' + dUrl;
              default:
                return baseUrl + 'fileUpload/' + dUrl
            }
          }
        }
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


