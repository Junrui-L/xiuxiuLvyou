<template>
  <div class="favorites">
    <ul class="tab-wrap">
      <li class="tab-item" :class="currentTab=='guide' && 'active' " @click="clickTabItem('guide')"><span>向导</span></li>
      <li class="tab-item" :class="currentTab=='playway'&& 'active'" @click="clickTabItem('playway')"><span>玩法</span>
      </li>
      <li class="tab-item" :class="currentTab=='scenic'&& 'active'" @click="clickTabItem('scenic')"><span>景点</span></li>
    </ul>

    <!--我的收藏-->
  </div>
</template>

<script>
  export default {
    name: "my-favorites",
    data() {
      return {
        currentTab: 'playway',// 当前选择的Tab,
        guideList: [],// 向导列表
        playwayList: [],//玩法列表
        scenicList: [],//景点列表
      }
    },
    methods: {
      // 获取向导列表
      getGuideList() {

      },
      // 获取玩法列表
      getPlaywayList() {

      },
      // 获取景点列表
      getScenicList() {

      },
      // 点击tabitem
      clickTabItem(tabName) {
        this.currentTab = tabName
      }
    }
  }
</script>

<style>

</style>
