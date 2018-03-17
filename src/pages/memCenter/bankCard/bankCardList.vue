<template>
    <div class="bankCard">
      <ul class="bank-list">
        <li v-for="(item, index ) in banksList"  class="card-item clearfix" :key="index">
          <div class="card-wrapper clearfix">
            <i class="close" @click="deletBanks(item.id)"></i>
            <div class="img-wrap fl">
              <img :src="basePath + item.icon" alt="">
            </div>
            <div class="txt-wrap fl" @click="$router.push({path: '/withdrawDeposit', query: {id: item.id}})">
              <div class="bankname">{{item.bankname}}</div>
              <div class="bankcate"></div>
              <div class="banknum">{{item.accountno}}</div>
            </div>
          </div>
        </li>
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
    import {mapState, mapMutations} from 'vuex'
    import {userBanks, deletBank} from '../../../http/getDate'
    export default {
        name: "bankCard",
      data(){
        return {
          banksList: []
        }
      },
      computed:{
        ...mapState([
          'basePath'
        ])
      },
      mounted(){
        this.getBankList();
      },
      methods: {
        getBankList(){
          userBanks().then(res => {
            console.log(res);
            this.banksList = res.list
          })
        },
        deletBanks(id){
          deletBank(id).then(res => {
            if(res.msg) {
              this.$createDialog({
                type: 'alert',
                title: '温馨提示',
                content: res.msg
              }).show()
            }else {
              this.$createToast({
                txt: '删除银行卡成功',
                type: 'correct',
                mask: true,
                time: 1000
              }).show();
              this.getBankList();
            }
          })
        }
      }
    }
</script>

