<template>
  <div style="position:relative;">
    <div id="player">

    </div>
    <!-- 倒计时 -->
    <div style="position:absolute; top:0; right:20px; ">
      <h4>您的剩余观看时间: <span id="count_down"></span></h4>
    </div>
    <div style="position:fixed; top:2px; left:140px;">
      <div class="dropdown">
        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown"
          style="background-color:#fff; border-radius:20px;">
            <span class="zhiboRoom" style="font-size:16px;">{{selected.title}}
            <span class="caret"></span></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" style="z-index:1010;">
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
                      <td>{{teacherView.category}}</td>
                      <td>{{teacherView.wheat_type}}</td>
                      <td>{{teacherView.uid}}</td>
                      <td>{{teacherView.open_price}}</td>
                      <td>{{teacherView.win_price}}</td>
                      <td>{{teacherView.loss_price}}</td>
                      <td>{{teacherView.result}}</td>
                      <td>
                          {{teacherView.owner}}
                      </td>
                      <td>
                        <button class="btn download_file">{{teacherView.order_type}}</button>
                      </td>
                  </tr>
                  <tr>
                    <td colspan="6" class="text-left">
                        注：投资有风险，交易需谨慎，严格控制仓位，操作建议仅供参考
                    </td>
                    <td colspan="3" class="text-right">
                      {{countDown}}秒 <a href="javascript:void(0)" style="color:#fff;" @click="closeSuggestion()">关闭</a>
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
      teacherView:'',
      zhiboView:'', //分直播间查询讲师观点
      countDown:10,
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

    this.queryViewsInTime();  //定时查询讲师观点
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

            for(let i =0 ;i<templateLive.length;i++){
              let item =' <embed quality="high" style="display:none;" width="100%" height="100%" src="'+templateLive[i].liveurl+'" align="left" allowScriptAccess="never" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
              $("#player").append(item);
            }

            $("#player embed").eq(0).css("display",'block');

            if(templateLive){
              let url; //直播地址
               that.optionsLive = templateLive;
               if(window.localStorage.getItem("zhiboName")){
                  that.selected = JSON.parse(window.localStorage.getItem("zhiboName"));
               }else{
                  that.selected = that.optionsLive[0];
                  window.localStorage.setItem('zhiboName',JSON.stringify(that.selected));

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
      console.log(this.selected.liveurl);


      //$("#player").attr('src',this.selected.liveurl);

      //this.ObjectPlayer = objectPlayer;
    },

    //更换直播地址
    changeLiveResouce(item){
      this.selected = item;
      window.localStorage.setItem("zhiboName",JSON.stringify(item));
      if(item.liveurl.trim()){
        for(let i=0; i<this.zhiboLives.length;i++){
          $("#player embed").eq(i).css("display","none");
        }
        $("#player embed").eq(parseInt(item.id)-1).css("display","block");

        this.$store.dispatch('changeRoom',item.roomno);

        window.localStorage.setItem("roomNo",item.roomno);
      }else{
        alert("直播地址不存在！");
      }
    },

    closeSuggestion(){
        $("#handleSuggestionTable").addClass("active");
    },

    //定时查询讲师观点
    teacherViewQuery(){
      let params={
        category:'',
        place:this.selected.title,
        begidx:0,
        counts:1,
      };

      let that = this;

      api.handleSuggestion(params).then(function(res){
        if(res.data.Code ==3){
          if(res.data.Data.Totals>0){
              that.teacherView = res.data.Data.Detail[0];
              if(window.localStorage.getItem('zhiboView')){
                  if(JSON.parse(window.localStorage.getItem('zhiboView')).id == that.teacherView.id){
                    $("#handleSuggestionTable").addClass("active");
                  }else{
                    $("#handleSuggestionTable").removeClass("active");

                    that.countDown = 10;

                    let Timer = setInterval(function(){
                        that.countDown --;

                        if(that.countDown<0){
                          clearInterval(Timer);
                        }

                    },1000);
                  }
              }
              window.localStorage.setItem('zhiboView',JSON.stringify(that.teacherView));
          }else{
             $("#handleSuggestionTable").addClass("active");
          }
        }
      }).catch(function(err){
        console.log(err);
      });
    },

    queryViewsInTime(){
      let that = this;

      let Timer = window.setInterval(function(){
          that.teacherViewQuery();
      },10000);
    },
  }
}
</script>

<style scoped>
  #handleSuggestionTable{
     background: rgba(255, 255, 255, 0.0980392);
     position:fixed;
     top:60px;
     left:70px;
     z-index:1000;
     padding:20px;
     transition:top 2.0s;
     -moz-transition:top 2.0s;
     -webkit-transition:top 2.0s;
     -o-transition:top 2.0s;
  }

  #handleSuggestionTable.active{
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
