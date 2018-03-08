/**
    Created by soft on 2018/1/9
    时间格式   2018-01-09 20:00:00
*/

<template>
    <div class="timer_count">
        <div class="titel">{{ countText }}</div>
        <div class="timer" >
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
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            };
        },
        props: {
          endTime: '',
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


                        let now = new Date().getTime(),
                            diff = parseInt(countDownDate) - parseInt(now),

            // Time conversion to days, hours, minutes and seconds
                            tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
                            thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                            tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                            tseconds = Math.floor((diff % (1000 * 60)) / 1000);
            // Keep 2 digits

            // Check for time expiration
                    if (diff < 0) {
                        clearInterval(time);
                        this.countCallback();
                        return
                    } else {
                        this.days = (tdays < 10) ? '0' + tdays : tdays;
                        this.hours = (thours < 10) ? '0' + thours : thours;
                        this.minutes = (tminutes < 10) ? '0' + tminutes : tminutes;
                        this.seconds = (tseconds < 10) ? '0' + tseconds : tseconds;
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
        },
        methods:{

        },
    }

</script>

