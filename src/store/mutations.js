/**
 * Created by soft on 2018/1/3.
 */
import  {
  GET_USERINFO,
  RECORD_ADDRESS,
  BASE_ORDER,
  SAVE_GUIDE,
  SAVE_PLAY,
  SAVE_PRICEPACKAGE,
  ORDER_DETAIL
} from './mutation-types.js'

import {localStore} from '../config/myUtils'

let local =  localStore('store', 'localStorage')
export default {
  [GET_USERINFO](state, info) {
    state.userInfo = info;
    local.set('userInfo', info)
    local.set('userInfo', info)
  },

    // 记录当前经度纬度
  [RECORD_ADDRESS](state, {
      latitude,
      longitude
      }) {
      state.location = {latitude, longitude}
      local.set('location',{latitude, longitude})
  },
  //选了日期玩法人数的订单
  [BASE_ORDER](state, baseOrder
    ) {
    state.baseOrder = baseOrder
    local.set('baseOrder', baseOrder)
  },
  //记录导游信息
  [SAVE_GUIDE](state, guid) {
    state.guideInfo = guid;
    local.set('guide', guid)
  },
  //记录玩法
  [SAVE_PLAY](state, play) {
    state.play = play;
    local.set('play', play)
  },
  //记录选择玩法套餐
  [SAVE_PRICEPACKAGE](state, pricePackage){
    state.pricePackage = pricePackage;
    local.set('pricePackage', pricePackage)
  },
  //记录下单详情
  [ORDER_DETAIL](state, orderDetail) {
    state.orderDetail = orderDetail;
    local.set('orderDetail', orderDetail)
  }


}
