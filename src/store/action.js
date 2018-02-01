/**
 * Created by soft on 2018/1/3.
 * actions: 处理异步的store改变
 */

import * as types from './mutation-types.js'
// import {
//   getUser,
//   getAddressList
// } from '../service/getData'
export default {
    getLocation({commit}) {
      let location = {let: 2222, long: 3333}
      commit(types.RECORD_ADDRESS, location)
    },
    getPhone ({commit}){
      let phone = '111'
      commit(types.GET_USERINFO, phone)
    },
    saveBaseInfo({
        commit
        }) {
      let baseOrder = {naem:11, age: 12}
        commit(types.RECORD_ADDRESS, baseOrder);
    },
}
