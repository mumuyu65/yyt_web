<template>
  <div style="position:relative;">
    <div id="player" class="player" v-if="!clanPlayer"></div>
    <div id="clanPlayer" class="player" v-if="clanPlayer"></div>
        <!-- 倒计时 -->
    <div style="position:absolute; top:0; right:20px; ">
      <h4>您的剩余观看时间: <span id="count_down"></span></h4>
    </div>
    <div style="position:fixed; top:2px; left:110px;">
      <div class="dropdown">
        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown"
          style="background-color:#fff; border-radius:20px;">
            <span style="color:#eaa832; font-size:16px;">{{selected.title}}
            <span class="caret"></span></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation" v-for="live in optionsLive">
                <a role="menuitem" tabindex="-1" href="javascript:void(0)" style="color:#eaa832; font-size:16px;">{{live.title}}</a>
            </li>
        </ul>
    </div>
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
        console.log(res.data);
        if(res.data.Code ==3){
          let templateLive = res.data.Data;

          that.zhiboLives =  templateLive;

          if(templateLive){
            that.optionsLive = templateLive;
            let url; //直播地址
            for(let i=0; i<templateLive.length;i++){
               url =templateLive[0].liveurl.trim();

               that.selected = templateLive[0];
            }
             that.player(url,'player');
          }else{
            alert('直播地址不存在！');
          }
        }else {
              alert("无法请求到直播地址......");
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    //直播地址不存在！
    changeLive(){
      let url;
      for(let i=0; i<this.zhiboLives.length;i++){
        if(this.zhiboLives[i].type == 1){
             url=this.zhiboLives[i].liveurl.trim();
             this.player(url,'clanPlayer');
             this.clanPlayer = !this.clanPlayer;
        }else{
          alert('战队直播视频地址不存在！');
        }
      }
    },

    player(url,playerId){
      let objectPlayer = new Player.aodianPlayer({
        container: playerId, //播放器容器ID，必要参数
        rtmpUrl:url, //控制台开通的APP rtmp地址，必要参数
        width: '100%', //播放器宽度，可用数字、百分比等
        height: '100%', //播放器高度，可用数字、百分比等
        autostart: true, //是否自动播放，默认为false
        bufferlength: '3', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
        maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
        stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
        controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
        isfullscreen: true, //是否双击全屏，默认为true
      });
    },
  }
}
</script>
