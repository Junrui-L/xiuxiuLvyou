/*Created by soft on 2018/1/8 */
<template>
    <div class="alet_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <!--<span></span>-->
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确 认</div>
        </section>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                positionY: 0,
                timer: null
            }
        },
        mounted(){

        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss">


</style>



