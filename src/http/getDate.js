/**
 * Created by soft on 2018/1/8.
 * 异步获取数据，基于promise操作
 */
import $http from './index'
import {localStore} from  '../config/myUtils'

/**
 * 用户登录
 *http://www.youdingsoft.com/siteH5/user.json?act=passwordLogin
 * */

export const userLogin = (phone, password) => $http.post('/user.json?act=passwordLogin', {
    mobile: phone,
    loginPassword: password
});

/**
 *获取首页数据
 * ok
 * */

export const homeData = (areasn) => $http.get('/index.json?act=index', {
    areasn: areasn
});



/**
 * 获取地区信息
 *ok
 * */
export const cityArea = (areasn) => $http.get('/index.json?act=citys', {
      citysn: areasn
})
/**
* 获取区域景区
 * ok
* */
export const cityScenicspots = (areasn) => $http.get('/index.json?act=cityScenicspots', {
    citysn: areasn
});

/**
 * 搜索区域或景区信息
 * ok
 * */
export const searchScenicspots = (valword) => $http.post('/index.json?act=search', {
  val: valword
});

/**
 *景区列表信息
 *ok
 * */

export const spotsList = (areasn) => $http.get('/guide.json?act=list', {
    city: areasn
});

/**
 *景区向导列表
 *ok
 * */

export const guideList = (scenicspotId, sex, agetype, minprice, maxprice, todaytuan, isbuyticket, isshuttle) => $http.post('/guide.json?act=guideslist', {
  scenicspot: scenicspotId,
  sex: sex,
  agetype: agetype,
  minprice: minprice,
  maxprice: maxprice,
  todaytuan: todaytuan,
  isbuyticket: isbuyticket,
  isshuttle: isshuttle
});

/**
 *景区向导玩法详情
 *
 * */
export const guideDetails = (scenicspot, accountId) => $http.post('/guide.json?act=scenicspotGuideDails', {
  scenicspot: scenicspot,
  accountId: accountId
});

/**
 * 加载套餐集合/order.json?act=loadPackage
 * */
export const loadPackage = (godate, accountId, playId) => $http.post('/order.json?act=loadPackage', {
  godate: godate,
  accountId: accountId,
  playId: playId
});



/**
 *向导主页信息
 *
 * */

export const guideHome = (accountId) => $http.post('/guide.json?act=guide', {
  accountId: accountId
});

/**
 *
 * 向导导玩法详情
 * */

export const playlistDetail = (playId, accountId) => $http.get('/guide.json?act=playlistDails', {
  playId: playId,
  accountId: accountId
});


/**
 * 获取个人信息
 * */
export const userInfo = () => $http.get('/user.json?act=personal', {

})



/**
 *
 * 获取用户详细信息

 * */

export const getuserInfo = () => $http.get('/userInfo/getUserInfoDails', {

});

/**
 *
 * 初始化订单
 * */

export const initOrder = (godate, accountId, playId, tripsnum, packageid, source, tipamount) => $http.get('/order.json?act=init', {
  godate: godate,
  accountId: accountId,
  playId: playId,
  tripsnum: tripsnum,
  packageid: packageid,
  source: source,
  tipamount: tipamount

});


/**
 *
 * 加载订单信息（下单）
 * */

export const loadOrder = () => $http.get('/order.json?act=loadOrder', {

});

/**
 *
 * 未使用的优惠券
 * */

export const loadYhj = (make) => $http.get('/order.json?act=loadyhj', {
  tomake: make
});

/**
 *
 * 加载过期优惠券

 * */

export const loadOveryhj = (areasn) => $http.get('/order.json?act=loadOveryhj', {
    areasn: areasn
});

/**
 *
 * 加载已使用的优惠券

 * */

export const loadmakeyhj = (areasn) => $http.get('/order.json?act=loadmakeyhj', {
    areasn: areasn
});

/**
 *
 *新增订单(14参数)
 * */

export const creatOrder = (godate,
                           accountId,
                           playId,
                           tripsnum,
                           packageid,
                           mpPackageid,
                           mpPackagecount,
                           istuan,
                           source,
                           tipamount,
                           limkman,
                           linkPhone,
                           require,
                           yhjId
) => $http.get('/order.json?act=create', {
                godate: godate,
                accountId: accountId,
                playId: playId,
                tripsnum: tripsnum,
                packageid: packageid,
                mpPackageid: mpPackageid,
                mpPackagecount: mpPackagecount,
                istuan: istuan,
                source: source,
                tipamount: tipamount,
                limkman: limkman,
                linkPhone: linkPhone,
                require: require,
                yhjId: yhjId
});


/**
 *
 *订单加载信息
 * */
export const orderDetail = (num) => $http.post('/order.json?act=details', {
  ordernumber: num
});


/**
 *
 *付款加载信息
 * */
export const payOrder = (num) => $http.post('/order.json?act=play', {
    ordernumber: num
});

/**
 *
 *付款加载微信参数信息
 * */
export const payOrderWx = (num) => $http.post('/play.json?act=play', {
  orderNo: num
});


/**
 *
 *修改订单状态
 * */
export const updateOrder = (areasn) => $http.get('/order.json?act=updateStatus', {
    areasn: areasn
});

/**
 *
 *取消订单
 * */
export const cancelOrder = (areasn) => $http.get('/order.json?act=cancel', {
    areasn: areasn
});

