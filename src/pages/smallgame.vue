<template>
  <div class="main">
     <div class="zj-list">
        <div class="inner-container">
          <iframe src="http://www.chuanglifenglive.com/smgame" width="760px" frameborder="0" height="1300px" scrolling="yes" id="small_game" ></iframe>
           <div class="small-game">
                            <ul id="myTab" class="list-inline" style="background-color:#000;">
                                <li class="active">
                                    <a href="#gameRank" data-toggle="tab" style="color:#fff;">
                                        游戏排名
                                    </a>
                                </li>
                                <li><a href="#joinRecord" data-toggle="tab" style="color:#fff;">参与记录</a></li>
                            </ul>
                            <div id="myTabContent" class="tab-content">
                                <div class="tab-pane fade in active" id="gameRank">
                                    <ul class="list-inline">
                                        <li>
                                            <img src="images/game_1.png" alt="" />
                                        </li>
                                        <li>苗苗</li>
                                        <li class="pull-right">
                                            1014000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>
                                            <img src="images/game_2.png" alt="" />
                                        </li>
                                        <li>洋洋</li>
                                        <li class="pull-right">
                                            1010000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>
                                            <img src="images/game_3.png" alt="" />
                                        </li>
                                        <li>小曲</li>
                                        <li class="pull-right">
                                            910000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li style="position: relative;">
                                            <img src="images/game.png" alt="" />
                                            <span style="position: absolute; left:17px;top:12px;">4</span>
                                        </li>
                                        <li>传栋</li>
                                        <li class="pull-right">
                                            860000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li style="position: relative;">
                                            <img src="images/game.png" alt="" />
                                            <span style="position: absolute; left:17px;top:12px;">5</span>
                                        </li>
                                        <li>红超</li>
                                        <li class="pull-right">
                                            810000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li style="position: relative;">
                                            <img src="images/game.png" alt="" />
                                            <span style="position: absolute; left:17px;top:12px;">6</span>
                                        </li>
                                        <li>楠楠</li>
                                        <li class="pull-right">
                                            780000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li style="position: relative;">
                                            <img src="images/game.png" alt="" />
                                            <span style="position: absolute; left:17px;top:12px;">7</span>
                                        </li>
                                        <li>小章</li>
                                        <li class="pull-right">
                                            720000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade" id="joinRecord">
                                    <ul class="list-inline">
                                        <li>苗苗</li>
                                        <li class="pull-right">
                                            1014000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>洋洋</li>
                                        <li class="pull-right">
                                            1010000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>小曲</li>
                                        <li class="pull-right">
                                            910000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>传栋</li>
                                        <li class="pull-right">
                                            860000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>红超</li>
                                        <li class="pull-right">
                                            810000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>楠楠</li>
                                        <li class="pull-right">
                                            780000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="list-inline">
                                        <li>小章</li>
                                        <li class="pull-right">
                                            720000
                                            <img src="images/gold.png" alt="">
                                        </li>
                                    </ul>
                                </div>
                            </div>
           </div>
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