<template>
  <div class="main">
     <div class="zj-list">
        <div class="inner-container">
          <ul class="list-inline">
            <li><h4>疯狂猜涨跌</h4></li>
          </ul>
          <iframe src="http://www.chuanglifenglive.com/smgame" width="760px" frameborder="0" height="1300px" scrolling="yes" id="small_game" ></iframe>
        </div>
    </div>
    <div class="zhibo">
        <zhibo></zhibo>
        <activity></activity>
    </div>
  </div>
</template>

<script>
import Zhibo from '@/components/Zhibo'
import Activity from '@/components/Activity'
import API from '@/api/API'
//实例化api
const api = new API();
export default {
  name: 'SmallGame',
  mounted (){
    this.zoomEle(document.getElementById("small_game"),0.47,0.47);
  },
  components:{ Activity,Zhibo },
  methods: {
    getBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera){return "Opera"}; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1){return "FF";} //判断是否Firefox浏览器
        if (userAgent.indexOf("Safari") > -1){return "Safari";} //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera){return "IE";} ;
        //判断是否IE浏览器
    },
    zoomEle(el, xScale, yScale) {
        var name = this.getBrowser();
        var style = el.getAttribute('style') || "";
        if(name=="IE") {
            if(document.compatMode == "CSS1Compat"){//模式匹配 解决ie8下兼容模式
                el.style.width = el.clientWidth * 2.0;
                el.style.height = el.clientHeight * 2.0;
            }
            el.style.zoom = xScale;
        }else if(name=="FF"){
            el.style.transform = 'scale(' + xScale + ', ' + yScale + ')';
            el.style.transformOrigin = '0px 0px';
        }else {
            el.setAttribute('style', style + '-webkit-transform: scale(' + xScale + ', ' +  yScale + '); -webkit-transform-origin: 0px 0px;');
        }
    },
  },
}
</script>

<style scoped>
.small-game #myTab{
  background-color:#000;
}
.small-game #myTab>li>a{
  color:#fff;
  text-decoration:none;
}
.zhibo-carousel .carousel-inner .item>img{
  height:450px;
}
</style>