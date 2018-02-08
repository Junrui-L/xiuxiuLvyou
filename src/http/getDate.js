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
  scenicspot: data.scenicspotId,
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

//订单
/**
 *
 * 初始化订单
 * */

export const initOrder = (godate, accountId, playId, tripsnum, packageid, source, tipamount) => $http.get('/siteH5/order.json?act=init', {
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

export const loadOrder = () => $http.get('/siteH5/order.json?act=loadOrder', {});


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
                           yhjId) => $http.get('/siteH5/order.json?act=create', {
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
export const payConfigWx = (singnurl) => $http.get('/wxwebsite/wxconfig.json?generalid=""', {
  url: singnurl
});


/**
 *
 *修改订单状态
 * */
export const updateOrder = (areasn) => $http.get('/siteH5/order.json?act=updateStatus', {
  areasn: areasn
});

/**
 *
 *取消订单
 * */
export const cancelOrder = (areasn) => $http.get('/siteH5/order.json?act=cancel', {
  areasn: areasn
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

export const userUpdateMobile = (dict, val) => $http.get('/siteH5/user.json?act=updatemobile', {
  dict: dict,
  val: val
});

/**
 * 用户推广二维码
 *
 * */

export const userQrcode = (dict, val) => $http.get('/siteH5/user.json?act=expandedCode', {
  dict: dict,
  val: val
});


//用户账户信息
/**
 * 用户账户信息
 *
 * */

export const userAccounts = () => $http.get('/siteH5/siteapp/capital.json?act=capital', {});


/**
 * 用户账单列表
 *
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

export const AddBank = (data) => $http.get('/siteapp/capital.json?act=addUserBank', {
  bankId: data.bankId,
  accountName: data.accountName,
  fundpassword: data.fundpassword,
  accountNo: data.accountNo
});

/**
 * 删除银行卡
 *
 * */

export const deletBank = (userBankId) => $http.get('/siteapp/capital.json?act=deleteUserBank', {
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
