import Vue from 'vue'
import config from '../http/api'

//处理图片地址
Vue.filter('imgUrl', (url, mode) => {
  let baseUrl = 'www.youdingsoft.com/';
  let dUrl = url.split('/')[1];
  switch (mode) {
    case 'small':
      return config.imgUrl + 'fileUploadsmall/' + dUrl;
    case 'middle':
      return config.imgUrl + 'fileUploadmedium/' + dUrl;
    case 'orgin':
      return config.imgUrl + 'fileUpload/' + dUrl;
    default:
      return config.imgUrl + 'fileUploadsmall/' + dUrl
  }
})
//时间过滤， fmtDate('yyyy,MM,dd')
Vue.filter('fmtDate', (data, fmt) => {
    var date = new Date(data);
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
  }
);
