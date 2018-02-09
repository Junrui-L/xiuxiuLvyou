<template>
  <section class="area_right" ref="menuList">
    <ul class="area-menu">
      <li class="area-wrapper">
        <section class="single_commodity sub-cate">
          <h3 class="sub_title type_title">热门</h3>
          <ul class="spots clearfix">
            <li class="spots-item fl" v-for=" (n, index) in areaList " :key="index">
              <img :src="baseUrl + n.cityimg" alt="">
              <p>{{n.name}}</p>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import {cityArea, cityScenicspots} from '../../http/getDate'

  export default {
    name: 'SearchContentList',
    data () {
      return {
        baseUrl: 'http://www.youdingsoft.com',
        areaList: [],
        areasn: ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData(){
        cityArea(this.areasn).then(res => {
          this.areaList = JSON.parse(JSON.stringify(res))
          this.area = res[0]
        })
      }
    },
    watch: {
      '$route.params.id': function (val) {
        this.areasn = val
        this.getData()
      }
    }

  }
</script>
<style>

</style>
