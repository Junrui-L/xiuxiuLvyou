<template>
  <div class="memberInfo">
      <div class="header">
        <div class="service-area clearfix">
          <span class="title fl">个人头像</span>
          <div class="img-wrapper fr">
            <img :src="userInfo.headimgurl" alt="">
            <!--<svg>-->
              <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
            <!--</svg>-->
          </div>

        </div>
        <div class="head-item ">
          <div class="item-wrapper clearfix">
            <span class="title">自我介绍</span>
            <span class="txt fr">
              {{userInfo.nickname}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </div>
        <div class="head-item ">
          <div class="item-wrapper clearfix">
            <span class="title">个人生活照</span>
            <span class="txt fr">
            已上传
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </div>
      </div>
      <ul class="main">
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix">
            <span class="title">真实姓名</span>
            <span class="txt fr">
            {{ userInfo.userName || '--'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix">
            <span class="title">个人性别</span>
            <span class="txt fr">
            <template v-if="userInfo.sex == 1">男</template>
            <template v-if="userInfo.sex == 2">女</template>
            <template v-if="userInfo.sex == 0">未知</template>
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix">
            <span class="title">出生日期</span>
            <span class="txt fr">
            {{userInfo.birthDate || '未设置'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <div class="item-wrapper clearfix">
            <span class="title">身份认证</span>
            <span class="txt fr">
              <template v-if="userInfo.status == 0">未验证</template>
              <template v-if="userInfo.status == 1">审核中</template>
              <template v-if="userInfo.status == 2">已认证</template>

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </div>
        </li>
        <li class="head-item clearfix">
          <router-link to="/setContact" class="item-wrapper clearfix">
            <span class="title">手机号码</span>
            <span class="txt fr">
            {{userInfo.mobile || '未设置'}}
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </router-link>
        </li>
        <li class="head-item clearfix">
          <router-link to="/myQrcode" class="item-wrapper clearfix">
            <span class="title">推广二维码</span>
            <span class="txt fr">

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
          </router-link>
        </li>
      </ul>

  </div>
</template>

<script>
    import {userPerDetail, userLogin} from '../../http/getDate'
    export default {
        name: 'member-info',
        data() {
          return {
            userInfo: {}
          }
        },
        mounted() {
          userPerDetail().then(res => {
            console.log(res)
            this.userInfo = res.visitor;
          })
        },
        methods: {

        }
    }
</script>
