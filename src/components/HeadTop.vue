/*Created by soft on 2018/1/7 */

<template>
    <div class='head_top' :class="{'headbg': headBg}">
        <slot name='logo'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
            </svg>
        </section>
        <slot name='search'></slot>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="select-title"></slot>
        <slot name="message"></slot>
        <slot name="selectoption"></slot>
    </div>
</template>
<script>
    export default {
        data(){
            return {


            }
        },
        mounted(){
            //获取用户信息
//            this.getUserInfo();
        },
        props: ['signinUp', 'headTitle', 'goBack', 'headBg'],
        computed: {},
        methods: {}
    }

</script>

<style lang="scss" >

</style>


