/**
 * Created by soft on 2018/1/3.
 * 作者：Lvjr
 * 项目请求统一处理
 * 请求方式支持 get , post
 *
 */

//HttpUtil.js
import Vue from 'vue'
import router from '../router'
import axios from 'axios'

import config from './api'
var qs = require('qs')

//页面刷新时，重新赋值token
if(window.localStorage.getItem('token')) {
    store.commit(types.LOGIN,window.localStorage.getItem('token'));
}

//request拦截
//axios.interceptors.request.use(config => {  //配置发送请求的信息
//    store.commit(types.SHOW_LOADING)
//    if(store.state.token) {
//        config.headers.Authorization = `${store.state.token}`
//    }
//    return config;
//}, error => {
//    console.log(error);
//    return Promise.reject(error);
//});
//
////response拦截
//axios.interceptors.response.use(response => { //配置请求回来的信息
//    store.commit(types.HIDE_LOADING)
//    return response;
//}, error => {
//    if(error.response) {
//        switch (error.response.status) {
//            case 403:
//                //403清除token信息并跳转到登录页面
//                store.commit(types.LOGOUT);
//                router.replace({
//                    path: '/start',
//                    query: { redirect: router.currentRoute.fullPath}
//                })
//        }
//    }
//    return Promise.reject(error.response.data);
//});

//axios默认配置请求的api基础地址
axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl : config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;    //超时设置30s
export default ((url = '', data = {}) => {
    return {
        get (url, data) {
            return new Promise((resolve, reject) => {
                console.log(url);
                console.table(data);
                axios.get(url, {
                        params: data,
                        withCredentials: true
                    })
                    .then(function (response) {
                      // console.log(response.data)
                        if (response.data.code == 1101) {
                            console.log('登录超时')
                            router.push({ path: '/login' })
                        } else if (response.data.code == 200) {
                          console.log('接口200正常返回')
                            resolve(response.data.data)
                        } else {
                            resolve(response.data)
                            console.log('接口返回状态码：' + response.data.code );
                        }
                    })
                    .catch(function (error) {
                        console.log('进入错误处理')
                        reject(error);
                        console.log(error)
                    })
            })
        },
        post (url, data, upload = false) {
            return new Promise((resolve, reject) => {
                axios.post(url, upload ? data : qs.stringify(data), {
                        withCredentials: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    })
                    .then(function (response) {
                      // console.log(response.data)
                        if (response.data.code == 1101) {
                            console.log('登录超时')
                            router.push({path:'/login'})
                          // location.href= response.data.redirect;
                        } else if (response.data.code == 200) {
                            console.log('接口200正常返回')
                            resolve(response.data.data)

                        } else {
                          // console.log(response.data)
                            resolve(response.data)
                            console.log('接口返回状态码：' + response.data.code)
                        }
                    })
                    .catch(function (error) {
                        reject()
                        console.log(error)
                    })
            })
        }
    }
})()
