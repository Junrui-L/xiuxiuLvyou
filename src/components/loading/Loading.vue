<template>
    <div class="zns-loading" ref="loading">
    	<div class="zns-loading-innerr">
        <p class="text">
          <!--<img src="../../assets/img/loading.gif">-->
          <img src="../../assets/img/oval.svg"  alt="">
        </p>
	    </div>
      <div class="mask"></div>
    </div>
</template>
<style scoped lang="scss">
  @import "../../assets/scss/helpers/functions.scss";
  .mask {
    position: fixed;
    z-index: 19999;
    height: 100%;
    width:100%;
    top: 0;
    left: 0;
  }
	.zns-loading{
		position: fixed;
		z-index: 19999;
		width:100%;
		height:90px;
    top: 50%;
	}
	.zns-loading-innerr{
    /*display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;*/
    display:flex;

    /*-webkit-box-pack:center;
    -webkit-justify-content:center;
    -ms-flex-pack:center;*/
    justify-content:center;

    /*-webkit-box-align:center;
    -webkit-align-items:center;
    -ms-flex-align:center;*/
    align-items:center;

		  /*display:flex;*/
	    height: px2rem(50px);
	    /*align-items: center;*/
	    /*justify-content: center;*/
	}
  .zns-loading-innerr .text{
    width:px2rem(82px);
    overflow: hidden;
    padding:px2rem(16px);
    border-radius: px2rem(10px);
    background:rgba(50,50,50,0.5) ;
    color:#fff;
    font-size: 0;
    z-index: 20000;
  }
  img{
    width:px2rem(50px);
    height:px2rem(50px);
  }
</style>
