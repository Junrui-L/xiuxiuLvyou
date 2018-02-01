/*Created by soft on 2018/1/9 */

<template>
    <div class="count_down">
        <h5 class="title">支付剩余时间</h5>
        <div class="time"><span></span>:<span></span></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters} from '../store'
    export default {

        data(){
            return {
                temp:false
            }
        },
        computed:mapGetters([
            'count'
        ]),
        mounted(){

        },
        methods:mapActions([
            'start'
        ])
    }
</script>

<style lang="scss">
    /*引入样式表*/
</style>


