/**
 * Created by soft on 2018/1/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  location: {
    latitude: '',  // 当前位置纬度
    longitude: '', // 当前位置经度
  },
  userInfo: null, //用户信息
  basePath: 'http://www.youdingsoft.com/', //头像地址
  baseOrder: null,
  guideInfo: null,//选择的导游信息
  play: null,   //选择的玩法信息
  pricePackage: null, //选择的玩法套餐
  orderDetail: null  //下单信息
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
