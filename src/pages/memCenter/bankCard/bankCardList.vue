<template>
    <div class="bankCard">
      <ul class="bank-list">
        <router-link tag="li" :to="{path: '/withdrawDeposit'}" class="card-item clearfix">
          <div class="card-wrapper clearfix">
            <div class="img-wrap fl">
              <img src="http://wx.qlogo.cn/mmopen/ViaU7AyviafoibrhnNOpcjn6UyvElL9vlNiaOMZwpSTh4XOk3dWQ6GPiafZAZC0SECOoRAhCU1906rHVBkfdcW94gichiaCwX8WNd4F/132" alt="">
            </div>
            <div class="txt-wrap fl">
              <div class="bankname">中国银行</div>
              <div class="bankcate">储蓄卡</div>
              <div class="banknum">*** *** *** 333</div>
            </div>
          </div>
        </router-link>
        <router-link tag="li" :to="{path: '/withdrawDeposit'}" class="card-item clearfix">
          <div class="card-wrapper clearfix">
            <div class="img-wrap fl">
              <img src="http://wx.qlogo.cn/mmopen/ViaU7AyviafoibrhnNOpcjn6UyvElL9vlNiaOMZwpSTh4XOk3dWQ6GPiafZAZC0SECOoRAhCU1906rHVBkfdcW94gichiaCwX8WNd4F/132" alt="">
            </div>
            <div class="txt-wrap fl">
              <div class="bankname">中国银行</div>
              <div class="bankcate">储蓄卡</div>
              <div class="banknum">*** *** *** 333</div>
            </div>
          </div>
        </router-link>
      </ul>
      <div class="add-card list-item">
        <router-link to="/addBankCard" class="item-wrapper clearfix">
        <span class="title">增加银行卡</span>
        <span class="txt fr">

            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span>
        </router-link>
      </div>

    </div>
</template>

<script>
    export default {
        name: "bankCard",
      data(){
        return {

        }
      },
      mounted(){

      },
      methods: {

      }
    }
</script>

