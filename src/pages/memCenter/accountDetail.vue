<template>
  <div class="accountBill">
    <transition name="slide-in">
      <div class="account-detail">
        <div class='head_bak'>
          <section class="head_goback" @click="goBack">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
              <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:2"/>-->
            </svg>
          </section>
          <section class="title_head ellipsis">
            <span class="title_text">账单详情</span>
          </section>
        </div>
        <AccountDetail :billDetail="billChoose"></AccountDetail>
      </div>
    </transition>
  </div>
</template>

<script>
  import {userBill, userLogin} from '../../http/getDate'
  import AccountDetail from '../../components/accountDetail.vue'
  export default {
    name: "account-bill",
    data() {
      return {
        pageNo: 1,
        billList: [],
        billChoose: {}
      }
    },
    components: {
      AccountDetail
    },
    mounted(){
      // TODO 使用订单id获取账单想详情
      let orderNo=this.$router.currentRoute.query.ordernumber
      console.log(orderNo)
      console.log('---登录----')
      this.getUserBill();
    },
    methods: {
      getUserBill() {
        userBill(this.pageNo, 1).then(res => {
          console.log(res)
          this.billList = res.list;
        })
      },
      showDet(index) {
        this.billChoose = this.billList[index];
        this.showDetail = true;

      },
      goBack(){
          this.$router.go(-1)
      }
    }

  }

</script>

<style>

</style>
