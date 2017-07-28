<template>
<div>
   <div class="sidebar">
        <ul class="list-unstyled">
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/" exact>
                <img src="../../static/images/news-icon.png" alt="">
                <h6>新闻资讯</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/hangqing" exact>
                    <img src="../../static/images/hangqing.png" alt="">
                    <h6>行情</h6></router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <a href="javascript:void(0)" @click="handlesuggestion()" v-if="!isLogin">
                    <img src="../../static/images/handle-icon.png" alt="">
                    <h6>操作建议</h6>
                </a>
                <router-link to="/handlesuggestion" v-if="isLogin" exact>
                    <img src="../../static/images/handle-icon.png" alt="">
                    <h6>操作建议</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/hqpreview" exact>
                    <img src="../../static/images/zhuanjia-icon.png" alt="">
                    <h6>老师观点</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/classes" exact>
                    <img src="../../static/images/classes.png"  alt="">
                    <h6>学习课件</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/smallgame" exact>
                  <img src="../../static/images/youxi-icon.png" alt="">
                  <h6>小游戏</h6>
              </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/economicDate" exact>
                <img src="../../static/images/calendar-icon.png" alt="">
                <h6>财经日历</h6></router-link></li>
            <div class="divider"></div>
            <li class="text-center">
                <a href="javascript:void(0)" @click="ClassesArrage()">
                    <img src="../../static/images/kechengzhongxin-icon.png"  alt="">
                    <h6>课程安排</h6>
                </a>
            </li>
            <div class="divider"></div>
            <li class="text-center qrcode">
                <a href="javascript:void(0)">
                    <img src="../../static/images/wechat.png"  alt="">
                    <h6>微信二维码</h6>
                </a>
                <div class="qrcode-item">
                    <span></span>
                    <img src="../../static/images/qrcode.jpg"  alt="" />
                </div>
            </li>
        </ul>
   </div>

   <!-- 课程安排 -->
   <div class="modal fade" id="classesModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        <span style="color:#f00;">课程表安排</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="schedule" style="margin:50px; height:99%;" v-show="!addSchedules">
                      <ul>
                          <li>时间</li>
                          <li>星期一</li>
                          <li>星期二</li>
                          <li>星期三</li>
                          <li>星期四</li>
                          <li>星期五</li>
                          <li>星期六</li>
                          <li>星期日</li>
                          <li class="border-r">操作</li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point1">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                       <div style="clear:both; float:none;"></div>
                      <ul name="point2">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point3">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point4">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point5">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                       <div style="clear:both; float:none;"></div>
                      <ul name="point6">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                       <div style="clear:both; float:none;"></div>
                      <ul name="point7">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                       <div style="clear:both; float:none;"></div>
                      <ul name="point8">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point9">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li class="border-r"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                      <ul name="point10">
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-b"></li>
                          <li class="border-l"></li>
                      </ul>
                      <div style="clear:both; float:none;"></div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'sidebar',
  data(){
    return{
      isLogin:false,
    }
  },
  mounted (){
    this.init();
  },
  computed: mapGetters({
      user: 'getUser',
  }),
  methods:{
    init (){
      if(window.localStorage.getItem("user")){
        if (this.user.Beans.length > 7) {
            this.user.Beans = parseInt(this.user.Beans) % 10000 + '万';
        }
        this.$store.dispatch('changeUser',JSON.parse(window.localStorage.getItem("user")));
     }
    },

    ClassesArrage(){
      $("#classesModal").modal('show');
      api.schedule().then(function(res){
          console.log(res.data);
          if(res.data.Code ==3){

          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    handlesuggestion(){
      if(window.localStorage.getItem("user")){
        this.isLogin=true ;
      }else{
        alert("亲爱的用户，登录后才可查看此部分内容！");
      }
    }
  }
}
</script>

<style scoped>
.router-link-active{
   background-color:#d1201d;
   text-decoration:none;
}

.schedule ul{
      margin: 0px;
      padding: 0px;
      width: 100%;
      height:100%;
      display: block;
      clear: both;
      text-align: center;
      min-width:800px;
  }

.schedule ul li{
        float: left;
        list-style-type: none;
        border-top: #ececec solid 1px;
        border-left: #ececec solid 1px;
        width: 10%;
        vertical-align:middle;
        height:35px;
        padding-top:10px;
    }

.schedule .border-r{
    border-right: #ececec solid 1px;
  }

.schedule  .border-b{
    border-bottom: #ececec solid 1px;
}

.schedule .border-l{
    border-right: #ececec solid 1px;
    border-bottom: #ececec solid 1px;
}

.qrcode{
  position:relative;

}

.qrcode .qrcode-item{
    position:absolute;
    left:104%;
    top:-50%;
    z-index:100;
    display:none;
    width:170px;
}

.qrcode .qrcode-item span{
    display:inline-block;
    width:0;
    height:0;
    border-top: 10px solid transparent;
    border-right: 20px solid #fff;
    border-bottom: 10px solid transparent;
    vertical-align:middle;
    margin:0;
}

.qrcode .qrcode-item img{
    width:150px;
    margin-left:-5px;
}

.qrcode:hover .qrcode-item{
    position:absolute;
    left:104%;
    top:-50%;
    z-index:100;
    display:block;
    width:170px;
}
</style>
