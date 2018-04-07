import Vue from 'vue'
import config from '../http/api'

//时间过滤， fmtDate('yyyy,MM,dd')
Vue.filter('fmtDate', (data, fmt) => {
  let dates;
  if(data && data !== undefined) {
     dates = data.replace(/-/g,'/')
  }else {
    dates = new Date();
  }
  let date = new Date(dates);
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
})

//订单状态
Vue.filter('orderStateText', state => {
  const orderStateMap = {
    0: '已下单',
    1: '已接单',
    2: '已付款',
    3: '汇合中',
    4: '已接待',
    5: '出行中',
    6: '行程结束',
    7: '已评价',
    8: '已完成',
    9: '已取消',
    10: '退款处理中',
    11: '已退款',
    12: '已拒绝'
  }
  return orderStateMap[state]
})
/**
 * 向导类别
 * */

Vue.filter('guideTypeText', state => {
  const servicetypeMap = {
    1: '景区讲解',
    2: '当地带玩',
    3: '专线旅游'
  }
  return servicetypeMap[state]
})

/**
  玩法服务类型 类型状态
 * 服务类别
 * */
Vue.filter('servicetypeText', state => {
  const servicetypeMap = {
    1: '景点讲解',
    2: '景区带导',
    3: '当地游玩',
    4: '一日专线',
    5: '区内专线',
    6: '省内专线',
    7: '多省专线',
    8: '跨国专线',
  }
  return servicetypeMap[state]
})

//团游模式
Vue.filter('tymodeText', state => {
  const tymodeMap = {
    0: '平分模式',
    1: '固定折扣模式',
    2: '剃分模式'
  }
  return tymodeMap[state]
})

/*套餐计价*/
Vue.filter('unitText', state => {
  const unitMap = {
    1: '人/天',
    2: '团/天',
    3: '人/次',
    4: '单/次'
  }
  return unitMap[state]
})



//距离显示
Vue.filter('showDistance', val => {
  if(!val) {
    return ''
  } else if(val < 1000) {
    return val + 'm'
  } else if(val >= 1000){
    return val/1000 + 'km'
  }
})
//取消方
Vue.filter('cancleTxt', val => {
  const cancelMap = {
    1: '游客',
    2: '向导',
    3: '系统'
  }
  return cancelMap[val]
})

//账单加减
Vue.filter('adderSubtractor', (val, mode) => {
  const typeMap = {
    1: '下单扣款',
    2: '订单入款',
    3: '订单返款',
    4: '订单团返',
    5: '订单退款',
    6: '提现扣款',
    7: '优惠现金',
    8: '充值入款',
    9: '推广返利'
  }
  if(mode == 'txt') {
    return typeMap[val]
  } else if(mode == 'symbol'){
    if(val  == 1 || val ==6 ) {
      return '-'
    } else if(val  == 2 || val ==3 || val  == 4 || val ==5 || val ==7 || val ==8 || val == 9) {
      return "+"
    } else {
      return ''
    }
  }

})

//名字，身份证，银行卡，隐藏部分数字变‘*’号 plusXing(前面保留位数，后面保留位数）
Vue.filter('plusXing', (str, frontLen, endLen) => {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
});
