<template>
  <div class="Search">
    <div class="header">
      <section class="head_goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
        </svg>
      </section>
      <svg class="search-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
      </svg>
      <div class="search-input" @click="toSearch">请尝试北京</div>
    </div>
    <!-- 切换按钮 -->
    <section class="change_show_type" ref="chooseType">
      <div>
        <span :class='{activity_show: changeShowType =="area"}' @click="changeType('area')">区域</span>
      </div>
      <div>
        <span :class='{activity_show: changeShowType =="spots"}' @click="changeType('spots')">景点</span>
      </div>
    </section>

    <div class="area_content">
      <div class="menu_container">
        <section class="area_left wrapper_menu" id="wrapper_menu" ref="wrapperMenu">
          <ul class="menu-wrap">
            <li v-for="(item, index) in showList" :key="index" :class="{active_ia: index == menuIndex}"
                @click="chooseMenu(index)">
              {{ item.name }}
            </li>
          </ul>
        </section>
        <router-view></router-view>
      </div>
    </div>

    <!-- 评价 -->
    <section class="business_rating" v-show="changeShowType == 'rating'">
      <div class="total_evaluate clear">
        <div class="total_code">
          <h3> business_info.shop_rating }}</h3>
          <p class="p1">综合评价</p>
          <p class="p2"><span>高</span><span>低</span>于周边商家 business_info.h_l_percent }}%</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {cityArea, cityScenicspots} from '../../http/getDate'
  import HeadTop from '../../components/HeadTop.vue'
  import BScroll from 'better-scroll'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        baseUrl: 'http://www.youdingsoft.com',
        showMe: false,
        citySn: '100000',
        // 计算menu区域高度
        showLoading: true, //显示加载动画
        // 控制显示区域还是显示景点
        changeShowType: 'area',
        menuIndex: 0, //已选菜单索引值，默认为0
        menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
        shopListTop: [], //省列表的高度集合
        areaList: [], //区域列表
        spotsList: [], //景点列表
        windowHeight: '',
        commodity: [ // 商品
          {
            'description': '大家喜欢吃，才叫真好吃。', // 大分类的小tips
            'is_selected': true,
            'name': '热门', // 大分类名字
            'type_accumulation': 'c1', // 类型累加
            'foods': [ // 大分类下单项列表
              {
                'name': '吮指原味鸡', // 商品名
                'rating': 4.67, // 评分
                'unit_price': 11, // 单价
                'restaurant_id': 's10001', // 商店id
                'description': '', // 介绍
                'month_sales': 590, // 月销量
                'rating_count': 91, // 评价数
                'tips': '具有神秘配方浓郁的香料所散发的绝佳风味，鲜嫩多汁。',
                'satisfy_count': 8, // 好评数？？
                'satisfy_rate': 95, // 好评率
                'one_food_id': 100001, // id
                'image_path': '8b160883bdbeb19636f0099951b554c4jpeg'
              },
              {
                'name': '香辣鸡腿堡',
                'rating': 5,
                'unit_price': 17, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100002,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '蟹黄堡',
                'rating': 5,
                'unit_price': 17, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100003,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '北京',
            'type_accumulation': 'c2',
            'foods': [
              {
                'name': '麦香鸡腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100004,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100005,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '山东',
            'type_accumulation': 'c3',
            'foods': [
              {
                'name': '红豆派',
                'rating': 5,
                'unit_price': 11, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100006,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '香芋派',
                'rating': 5,
                'unit_price': 11, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100007,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '湖北',
            'type_accumulation': 'c2',
            'foods': [
              {
                'name': '麦香鸡腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100004,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100005,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '江苏',
            'type_accumulation': 'c2',
            'foods': [
              {
                'name': '麦香鸡腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100004,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100005,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '湖南',
            'type_accumulation': 'c4',
            'foods': [
              {
                'name': '可乐',
                'rating': 5,
                'unit_price': 8, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '小杯可乐',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100008,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '河南',
            'type_accumulation': 'c5',
            'foods': [
              {
                'name': '类1-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类1—1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100009,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '广东',
            'type_accumulation': 'c2',
            'foods': [
              {
                'name': '麦香鸡腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100004,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              },
              {
                'name': '腿堡',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '整块无骨鸡腿肉, 浓郁汉堡酱，香脆鲜辣多汁。',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100005,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '广西',
            'type_accumulation': 'c6',
            'foods': [
              {
                'name': '类2-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类2-1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100010,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '江西',
            'type_accumulation': 'c7',
            'foods': [
              {
                'name': '类3-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类3-1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100011,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '福建',
            'type_accumulation': 'c8',
            'foods': [
              {
                'name': '类4-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类4-1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100012,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '上海',
            'type_accumulation': 'c9',
            'foods': [
              {
                'name': '类5-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类5-1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100013,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          },
          {
            'description': '',
            'is_selected': false,
            'name': '云南',
            'type_accumulation': 'c10',
            'foods': [
              {
                'name': '类6-1',
                'rating': 5,
                'unit_price': 18, // 单价
                'restaurant_id': 's10001',
                'description': '',
                'month_sales': 723,
                'rating_count': 65,
                'tips': '类6-1',
                'satisfy_count': 6,
                'satisfy_rate': 100,
                'one_food_id': 100014,
                'image_path': '58844415a3cd43e9f0738d51ac915c8fjpeg'
              }
            ]
          }
        ],
      }
    },
    components: {
      HeadTop
    },
    mounted () {
      this.initData();
      this.windowHeight = window.innerHeight;
      // 窗口大小改变，改变商品列高度
//            window.addEventListener('resize', this.watchHei, false);
    },
    beforeDestroy () {
//            window.removeEventListener('resize', this.watchHei, false);
    },
    computed: {
      //右侧应该显示的列表
      'showList': function () {
        if (this.changeShowType === 'area') {
          return this.areaList
        } else if (this.changeShowType === 'spots') {
          // todo 需要修改
          return this.areaList
        }
      }
    },
    watch: { // 注意！！！！   watch对于对象来说deep=true也只能监控对象原有属性，新增加的无效！！！！
      // 监听showMe变化，在DOM更新后执行nextTick
      showMe: function (value) { // value就是showMe
        if (value) {
          this.$nextTick(() => {
            this.init();
          });
        }
      },
      //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
      showLoading: function (value) {
        if (!value) {
          this.$nextTick(() => {
            this.getListHeight();
          })
        }
      },
    },
    methods: {
      initData () {
        this.getmenuList(this.citySn);
        this.getCitySpots('110100');
        this.showLoading = false
      },
      changeType(str){
        this.changeShowType = str
        this.menuIndex = 0
      },
      getmenuList(val) {
        cityArea(val).then(res => {
          console.log(res);
          this.areaList = JSON.parse(JSON.stringify(res));
//          this.area = res[0]
          //获取全国景区列表
          // this.citySenic = res.cityMap;
          // this.senicList = res.scenicspotList;
        })
      },
      getCitySpots (sn) {
        cityScenicspots(sn).then(res => {
          console.log(res)
        })
      },
      toSearch() {
        this.$router.push({path: '/searchList'});
      },
      //获取列表的高度，存入shopListTop
      getListHeight(){
//        const listContainer = this.$refs.menuList;
//        const listArr = Array.from(listContainer.children[0].children);
//        listArr.forEach((item, index) => {
//          this.shopListTop[index] = item.offsetTop;
//        });
//        console.log(this.shopListTop);
//        this.listenScroll(listContainer)
      },
      //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
      listenScroll(element){
        this.foodScroll = new BScroll(element, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 2000,
          click: true,
        });

        const wrapperMenu = new BScroll('#wrapper_menu', {
          click: true,
        });

        const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
        this.foodScroll.on('scroll', (pos) => {
          if (!this.$refs.wrapperMenu) {
            return
          }
          this.shopListTop.forEach((item, index) => {

            if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              this.menuIndex = index;
              const menuList = this.$refs.wrapperMenu.querySelectorAll('.active_ia');
              // const el = menuList[0];
              // wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
            }
          })
        })
      },
      // todo 需要根据changeShowType 分别判断进入区域和景点 点击左侧食品列表标题，相应列表移动到最顶层
      chooseMenu(index){
        this.$router.replace({path: `/search/${this.areaList[index].areasn}`})
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
//        this.menuIndexChange = false;
//        this.area = this.areaList[index];
        // console.log(area)
        // this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
        // this.foodScroll.on('scrollEnd', () => {
        //     this.menuIndexChange = true;
        // })
      }
      // 监控网页的resize来改变商品列表的高度
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
