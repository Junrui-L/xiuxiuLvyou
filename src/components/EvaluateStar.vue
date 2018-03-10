<template>
  <!-- 评价星星 两排星星 设置第二排星星的宽度来达到半颗星星的效果-->
  <div class="yellow_star v-md">
    <div class="back v-md">
      <svg v-for="n in 5" :key="n" >
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
      </svg>
    </div>
    <div class="front v-md" :style="'width:'+code*100/5+'%;'">
      <svg v-for="n in 5" :key="n">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
      </svg>
    </div>
  </div>

</template>

<script>
export default {
  name: 'yellow_star',
  props: ['code'],
  data () {
    return {

    };
  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }

};
</script>

<style lang="scss" >

</style>
