/**
 * Created by soft on 2018/1/8.
 * 异步获取数据，基于promise操作
 */
import $http from './index'
import {localStore} from '../config/myUtils'

/**
 * 用户登录
 *http://www.youdingsoft.com/siteH5/user.json?act=passwordLogin
 * */

export const userLogin = (phone, password) => $http.post('/siteH5/user.json?act=passwordLogin', {
  mobile: phone,
  loginPassword: password
});

//景区信息
/**
 *获取首页数据
 * ok
 * */

export const homeData = (areasn) => $http.get('/siteH5/index.json?act=index', {
  areasn: areasn
});

/**
 * 获取当前位置
 *
 * */
export const getUserArea = (latitude, longitude) => $http.get('/siteH5/index.json?act=loadcity', {
  latitude: latitude,
  longitude: longitude
});


/**
 * 获取地区信息
 *ok
 * */
export const cityArea = (areasn) => $http.get('/siteH5/index.json?act=citys', {
  citysn: areasn
})
/**
 * 获取区域景区
 * ok
 * */
export const cityScenicspots = (areasn) => $http.get('/siteH5/index.json?act=cityScenicspots', {
  citysn: areasn
});

/**
 * 搜索区域或景区信息
 * ok
 * */
export const searchScenicspots = (valword) => $http.post('/siteH5/index.json?act=search', {
  val: valword
});

/**
 *景区列表信息
 *ok
 * */

export const spotsList = (areasn) => $http.get('/siteH5/guide.json?act=list', {
  city: areasn
});

/**
 *景区向导列表
 *ok
 * */

export const guideList = (data) => $http.post('/siteH5/guide.json?act=guideslist', {
  scenicspot: data.scenicspotId,
  servicetype: data.servicetype, //服务类型
  sex: data.sex,
  agetype: data.agetype,
  minprice: data.minprice,
  maxprice: data.maxprice,
  todaytuan: data.todaytuan,
  isbuyticket: data.isbuyticket,
  isshuttle: data.isshuttle
});

/**
 *区域向导列表
 *ok
 * */
export const cityGuideList = (data) => $http.post('/siteH5/guide.json?act=cityguideslist', {
  city: data.citySn,
  servicetype: data.servicetype, //服务类型
  sex: data.sex,
  agetype: data.agetype,
  minprice: data.minprice,
  maxprice: data.maxprice,
  todaytuan: data.todaytuan,
  isbuyticket: data.isbuyticket,
  isshuttle: data.isshuttle
});

/**
 *景区向导玩法详情
 *
 * */
export const guideDetails = (scenicspot, accountId) => $http.post('/siteH5/guide.json?act=scenicspotGuideDails', {
  scenicspot: scenicspot,
  accountId: accountId
});

/**
 * 加载套餐集合/order.json?act=loadPackage
 * */
export const loadPackage = (godate, accountId, playId) => $http.post('/siteH5/order.json?act=loadPackage', {
  godate: godate,
  accountId: accountId,
  playId: playId
});


/**
 *向导主页信息
 *
 * */

export const guideHome = (accountId) => $http.post('/siteH5/guide.json?act=guide', {
  accountId: accountId
});

/**
 *
 * 向导导玩法详情
 * */

export const playlistDetail = (playId, accountId) => $http.get('/siteH5/guide.json?act=playlistDails', {
  playId: playId,
  accountId: accountId
});


/**
 * 附近向导
 *
 * */
export const getNearGuide = (latitude, longitude) => $http.get('/siteH5/guide.json?act=fjGuideslist', {
  latitude: latitude,
  longitude: longitude
})

//订单
/**
 *
 * 初始化订单
 * */

export const initOrder = (godate, playday,accountId, playId, tripsnum, packageid, source, tipamount) => $http.post('/siteH5/order.json?act=init', {
  godate: godate,
  playday: playday,
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

export const loadOrder = () => $http.get('/siteH5/order.json?act=loadOrder', {});


/**
 *
 *新增订单(14参数)
 * */

export const creatOrder = (godate,
                           playDay,
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
                           yhjId) => $http.post('/siteH5/order.json?act=create', {
  godate: godate,
  playDay: playDay,
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
 *订单详细信息
 * */
export const orderDetail = (num) => $http.post('/siteH5/order.json?act=details', {
  ordernumber: num
});


/**
 *
 *付款加载信息
 * */
export const payOrder = (num) => $http.post('/siteH5/order.json?act=play', {
  ordernumber: num
});

/**
 *
 *账号余额付款
 * */
export const payOrderAccount = (orn, pwd) => $http.post('/siteH5/play.json?act=capitalPlay', {
  ordernumber: orn,
  fundpassword: pwd
});


/**
 *
 *微信付款加载微信参数
 * */
export const payOrderWx = (num, payUrl) => $http.post('/siteH5/play.json?act=play', {
  ordernumber: num,
  url: payUrl
});

/**
 *
 *微信js-sdk加载参数信息
 * 微信初始化用
 * */
export const ConfigWx = (singnurl) => $http.get('/wxwebsite/wxconfig.json?generalid=""', {
  url: singnurl
});


/**
 *
 *修改订单状态
 * */
export const updateOrder = (orderNo, status) => $http.get('/siteH5/order.json?act=updateStatus', {
  ordernumber: orderNo,
  status: status
});

/**
 *
 *取消订单
 * */
export const cancelOrder = (orderNo, canceltitle) => $http.post('/siteH5/order.json?act=cancel', {
  ordernumber: orderNo,
  canceltitle: canceltitle
});


//个人中心

/**
 * 用户个人信息
 *
 * */
export const userPersonal = () => $http.get('/siteH5/user.json?act=personal', {});


/**
 * 修改用户个人信息
 *
 * */
export const changePersonal = (dict, val) => $http.get('/siteH5/user.json?act=update', {
  dict: dict,
  val: val
});

/**
 * 用户个人详细信息
 *
 * */

export const userPerDetail = (dict, val) => $http.get('/siteH5/user.json?act=dails', {
  dict: dict,
  val: val
});

/**
 *
 *优惠劵列表

 * */
export const getCouponsList = (tomake) => $http.get('/siteH5/user.json?act=loadyhj', {
  tomake
});


/**
 * 用户修改手机号码
 *
 * */

export const userUpdateMobile = (mobile, veCode) => $http.post('/siteH5/user.json?act=updatemobile', {
  veCode: veCode,
  mobile: mobile
});

/**
 * 发送验证码
 * */
export const getVeryCode = (mobile) => $http.post('/siteH5/user.json?act=sendCode',{
  mobile: mobile
})


/**
 * 修改蜜码
 * */
export const updatePassword = (veCode, password, type) => $http.post('/siteH5/user.json?act=updatePassword',{
  veCode: veCode,
  password: password,
  type: type
})
/**
 * 用户推广二维码
 *
 * */

export const userQrcode = () => $http.get('/siteH5/user.json?act=expandedCode', {
});

/**
 * 获取推广列表
 * */
export const userExpande = (page) => $http.post('/siteH5/user.json?act=expandedList',{
  page: page
})

//用户账户信息
/**
 * 用户账户余额信息
 *
 * */

export const userAccounts = () => $http.get('/siteapp/capital.json?act=capital', {});

/**
 * 用户账户积分信息
 *
 * */

export const userScores = (page) => $http.get('/siteH5/user.json?act=pointList', {
  page: page
});

/**
 * 用户账单列表
 *
 "ordernumber":"20180110100001076230583",//账变编号
 "lastBlance":100.00,//账变后余额
 "currentBlance":300.00,//当前余额
 "profitLossMoney":200,//账变金额
 "type":1,//账变类别
 "accountId":1001,//向导id
 "created_at":账变时间,//账变编号
 "title":"余额支付向导（李三）",//账变内容说明
 "typeicon":"/url/sdf/sdf.jpg"//账变图标地址

 * */

export const userBill = (page, type) => $http.get('/siteapp/capital.json?act=seachProfitloss', {
  page: page,
  type: type
});

/**
 * 用户银行卡列表
 *
 * */

export const userBanks = () => $http.get('/siteapp/capital.json?act=loadUserBank', {});

/**
 * 初始添加银行卡
 *
 * */

export const initAddBank = () => $http.get('/siteapp/capital.json?act=initAddBank', {});

/**
 *新增银行卡
 *
 * */

export const AddBank = (data) => $http.post('/siteapp/capital.json?act=addUserBank', {
  bankId: data.bankId,
  accountName: data.accountName,
  fundpassword: data.fundpassword,
  accountNo: data.accountNo
});

/**
 * 删除银行卡
 *
 * */

export const deletBank = (userBankId) => $http.post('/siteapp/capital.json?act=deleteUserBank', {
  userBankId: userBankId
});

/**
 * 用户提现
 *
 * */

export const withdraw = (userBankId, money, fundpassword) => $http.get('/siteapp/capital.json?act=withdrawals', {
  userBankId: userBankId,
  money: money,
  fundpassword: fundpassword
});


/**
 * 订单列表
 * status 订单状态(不可为空，1.待付款，2出行中，3.待评价，4。取消/已完成)
 * page 第几页(不可为空,每页只查出25条))
 *
 * */
export const getMyOrderList = (data) => $http.get('/siteH5/order.json?act=list', data);

/**
 * 玩法下的用户评论
 * */

export const getAssessPlayList = (data) => $http.post('/siteH5/assess.json?act=assesslistByPlay', {
  guideId: data.guideId,
  playId: data.playId,
  page: data.page
})
/**
 * 用户个人评论列表
 * */

export const getAssessUserList = (page) => $http.post('/siteH5/assess.json?act=assesslist', {
 page: page
})

/**
 * 添加用户评论
 * */

export const addCommnet = (data) => $http.post('/siteH5/assess.json?act=assessOrder', {
  ordernumber: data.ordernumber,
  content: data.content,
  pjImgs: data.pjImgs,
  types: data.types,
  score: data.score
})

/**
 * 获取微信上传图片地址
 * type: head头像类型,credentials证件类型,image其他图片类型
 * */

export const getImgPath = (data) => $http.post('/siteH5/user.json?act=loadImgPath', {
  type: data.type,
  media_ids: data.media_ids
})

/**
 * 收藏记录 page type 类型(必填)1收藏向导，2收藏玩法，3收藏景区
 * type: head头像类型,credentials证件类型,image其他图片类型
 * */

export const getCollectionList = (data) => $http.post('/siteH5/collection.json?act=search', {
  page: data.page,
  type: data.type
})

/**
 * 未使用的优惠
 * */
export const getCanUseyhj = (data) => $http.post('/siteH5/order.json?act=loadyhj', {})


/**
 * 加载过期优惠券
 * */
export const getOutDateyhj = (data) => $http.post('/siteH5/order.json?act=loadOveryhj', {})


/**
 * 加载已使用的优惠券
 * */
export const getHaveUseyhj = (data) => $http.post('/siteH5/order.json?act=loadmakeyhjj', {})
