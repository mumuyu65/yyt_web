<template>
  <div style="position:relative;">
    <div id="player" class="player"></div>
        <!-- 倒计时 -->
    <div style="position:absolute; top:0; right:20px; ">
      <h4>您的剩余观看时间: <span id="count_down"></span></h4>
    </div>
    <div style="position:fixed; top:2px; left:110px;">
      <div class="dropdown">
        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown"
          style="background-color:#fff; border-radius:20px;">
            <span class="zhiboRoom" style="font-size:16px;">{{selected.title}}
            <span class="caret"></span></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation" v-for="live in optionsLive">
                <a role="menuitem" class="zhiboRoom" tabindex="-1" href="javascript:void(0)" @click="changeLiveResouce(live)" style="font-size:16px;">{{live.title}}</a>
            </li>
        </ul>
    </div>
    </div>

    <div id="handleSuggestionTable" class="active">
        <table width="100%" border="0" >
              <thead>
                  <th class="text-center zhiboRoom">商品</th>
                  <th class="text-center zhiboRoom">麦上/麦下</th>
                  <th class="text-center zhiboRoom">仓位</th>
                  <th class="text-center zhiboRoom">开仓价</th>
                  <th class="text-center zhiboRoom">止盈价</th>
                  <th class="text-center zhiboRoom">止损价</th>
                  <th class="text-center zhiboRoom">结果</th>
                  <th class="text-center zhiboRoom">老师</th>
                  <th class="text-center zhiboRoom">方向</th>
              </thead>
              <tbody>
                  <tr>
                      <td>原油</td>
                      <td>麦上</td>
                      <td>222</td>
                      <td>110</td>
                      <td>115</td>
                      <td>100</td>
                      <td>建仓单</td>
                      <td>
                          小羽老师
                      </td>
                      <td>
                        <button class="btn download_file">买入</button>
                      </td>
                  </tr>
                  <tr>
                    <td colspan="6" class="text-left">
                        注：投资有风险，交易需谨慎，严格控制仓位，操作建议仅供参考
                    </td>
                    <td colspan="3" class="text-right">
                      10秒 <a href="javascript:void(0)" style="color:#fff;" @click="closeSuggestion()">关闭</a>
                    </td>
                  </tr>
              </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import * as Player from '@/js/aodianyun.js'

import API from '@/api/API'
//实例化api
const api = new API();

import { mapGetters } from 'vuex'

export default {
  name: 'Zhibo',
  data(){
    return{
      zhiboLives:[],
      clanPlayer:false,
      optionsLive:[],
      selected:'',
      ObjectPlayer:'',
    }
  },
  computed: mapGetters({
      liveUrl:'getLive',
  }),
  watch:{
    liveUrl:'changeLive'
  },
  mounted (){
    this.initData();
  },
  methods:{
    //直播
    initData (){
      let that = this;
      let params={
        begidx:0,
        counts:10
      };
      api.getZhibo(params).then(function(res){
        if(res.data.Code ==3){
          if(res.data.Data){
            let templateLive = res.data.Data;

            that.zhiboLives =  templateLive;

            if(templateLive){
              let url; //直播地址
               that.optionsLive = templateLive;
               if(window.localStorage.getItem("zhiboName")){
                  that.selected = JSON.parse(window.localStorage.getItem("zhiboName"));
               }else{
                  that.selected = that.optionsLive[0];
               }
               that.player();
          }else{
            alert('直播地址不存在！');
          }
          }
        }else {
              alert("无法请求到直播地址......");
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    player(){
      let objectPlayer = new Player.aodianPlayer({
        container: 'player', //播放器容器ID，必要参数
        rtmpUrl:this.selected.liveurl, //控制台开通的APP rtmp地址，必要参数
        width: '100%', //播放器宽度，可用数字、百分比等
        height: '100%', //播放器高度，可用数字、百分比等
        autostart: true, //是否自动播放，默认为false
        bufferlength: '3', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
        maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
        stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
        controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
        isfullscreen: true, //是否双击全屏，默认为true
      });

      this.ObjectPlayer = objectPlayer;
    },

    //更换直播地址
    changeLiveResouce(item){
      this.selected = item;
      window.localStorage.setItem("zhiboName",JSON.stringify(item));
      if(item.liveurl.trim()){
        this.ObjectPlayer.changePlayer(item.liveurl);

        this.$store.dispatch('changeRoom',item.roomno);

        window.localStorage.setItem("roomNo",item.roomno);

      }else{
        alert("直播地址不存在！");
      }
    },

    closeSuggestion(){
        $("#handleSuggestionTable").removeClass("active");
    }
  }
}
</script>

<style scoped>
  #handleSuggestionTable.active{
     background: rgba(255, 255, 255, 0.0980392);
     position:fixed;
     top:60px;
     left:70px;
     z-index:8000;
     padding:20px;
     transition:top 2.0s;
     -moz-transition:top 2.0s;
      -webkit-transition:top 2.0s;
      -o-transition:top 2.0s;
  }

  #handleSuggestionTable{
    transition:top 2.0s;
    -moz-transition:top 2.0s;
    -webkit-transition:top 2.0s;
    -o-transition:top 2.0s;
    top:-200px;
  }


  #handleSuggestionTable th,#handleSuggestionTable td{
      padding:1rem 1.5rem;
   }
</style>
