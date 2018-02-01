/**
Created by soft on 2018/1/9
时间格式 2018-01-09 20:00:00
*/

<template>
    <div class="timer_count_down">
        <div class="titel">{{ countText }}</div>
        <div class="timer" >
            <!--<div class="box" v-if="theTime.days != 0">-->
                <!--<div class="spacer"></div>-->
                <!--<p class="value">{{ theTime.days }}</p>-->
                <!--<p class="label">days</p>-->
            <!--</div>-->
            <!--<div class="box">-->
                <!--<div class="spacer"></div>-->
                <!--<p class="value">{{ theTime.hours }}</p>-->
                <!--<p class="label">hours</p>-->
            <!--</div>-->
            <div class="box">
                <p class="value">{{ theTime.minutes }}</p>
            </div>
            <div class="tdot"></div>
            <div class="box">
                <p class="value">{{ theTime.seconds }}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

        data() {
            return {
                deadline: '2018/01/15 18:00:00',   //这里设置日期倒计时间
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
                expired: false
            };
        },
        props: {
            nowTime: {
                type: String
            },
            endTime: {
                type: String
            },
            countCallback: {
                type: Function,
                default() { }
            },
            countText: {
                type: String,
                default() {
                    return '支付剩余时间'
                }
            }
        },
        computed: {
            theTime(){
                let countDownDate = new Date(this.endTime).getTime();

            // Countdown loop
                let time = setInterval(() => {

            // Difference between the 2 dates
                        let now = new Date().getTime(),
                            diff = countDownDate - now,

            // Time conversion to days, hours, minutes and seconds
                            tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
                            thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                            tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                            tseconds = Math.floor((diff % (1000 * 60)) / 1000);
            // Keep 2 digits

            // Check for time expiration
                    if (diff < 0) {
                        clearInterval(time);
                        this.expired = true;
                        this.countCallback();
                        return
                    } else {
                        this.days = (tdays < 10) ? '0' + tdays : tdays;
                        this.hours = (thours < 10) ? '0' + thours : thours;
                        this.minutes = (tminutes < 10) ? '0' + tminutes : tminutes;
                        this.seconds = (tseconds < 10) ? '0' + tseconds : tseconds;
//                        countDownDate -= 1000;
                    }
                }, 1000);

            // Return data
                return {
                    days: this.days,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds
                };
            }
        }
    }

</script>

<style lang="scss">
    /*引入样式表*/
</style>


/**************************
COUNTDOWN COMPONENT
**************************/
Vue.component('countdown', {
template: `
<section class="countdown">


</section>
`,


/**************************
ROOT COMPONENT
**************************/
let app = new Vue({
el: '#app'
});
