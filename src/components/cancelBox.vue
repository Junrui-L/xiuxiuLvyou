/*Created by soft on 2018/1/8 */
<template>
  <div class="cancel_box" v-show="showCancelBox">
    <div class="mask"></div>
    <div class="cancel-wraper">
      <section class="cancel_container">
        <h3 class="title">
          {{confirmText}}
        </h3>
        <div class="cancel_input">
          <input class="cancel_txt" maxlength="30" type="text" v-model="cancelReason" />
        </div>
        <div class="confrim clearfix" >
          <button class="back confirm_btn fl" @click="closeBox">返回</button>
          <button class="confirm confirm_btn fl" @click="confirmCancel">确认</button>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        cancelReason: '',
        show: true,
      }
    },
    mounted(){
      this.show = this.showCancelBox;
    },
    props: ['confirmText', 'showCancelBox'],
    methods: {
      closeBox(){
        this.$emit('closeTip', false)
      },
      confirmCancel(){
        if(this.cancelReason == '') {
          this.$createDialog({
                  type: 'alert',
                  title: '提示',
                  content: '请输入内容'
                }).show()
        } else {
          this.$emit('confirmCancel',this.cancelReason);
        }
      }
    }
  }
</script>

<style lang="scss">


</style>




