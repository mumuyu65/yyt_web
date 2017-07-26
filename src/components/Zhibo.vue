<template>
  <div id="player" class="player">

  </div>
</template>

<script>
import * as Player from '@/js/aodianyun.js'

import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'Zhibo',
  data (){
    return {

    }
  },
  mounted (){
    this.initData();
  },
  methods:{
    //直播
    initData (){
      let that = this;
      api.getZhibo().then(function(res){
        if(res.data.Code ==3){
          let url = res.data.Data[0].url;
          let objectPlayer = new Player.aodianPlayer({
              container: 'player', //播放器容器ID，必要参数
              rtmpUrl: url, //控制台开通的APP rtmp地址，必要参数
              width: '858', //播放器宽度，可用数字、百分比等
              height: '454', //播放器高度，可用数字、百分比等
              autostart: true, //是否自动播放，默认为false
              bufferlength: '3', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
              maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
              stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
              controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
              isfullscreen: true, //是否双击全屏，默认为true
          });

        }else {
              alert("无法请求到直播地址......");
          }
      }).catch(function(err){
        console.log(err);
      });
    }
  }

}
</script>
