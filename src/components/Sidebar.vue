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

            <!--

            <li class="text-center">
                <router-link to="/hangqing" exact>
                    <img src="../../static/images/hangqing.png" alt="">
                    <h6>行情</h6></router-link>
            </li>
            <div class="divider"></div>
            -->

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
                <router-link to="/teacherrecommand" exact>
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

            <!--

            <li class="text-center">
              <router-link to="/smallgame" exact>
                  <img src="../../static/images/youxi-icon.png" alt="">
                  <h6>小游戏</h6>
              </router-link>
            </li>
            <div class="divider"></div>

            -->
            <li class="text-center">
                <a href="javascript:void(0)" @click="calendarDate()" v-bind:class="calenderShow">
                <img src="../../static/images/calendar-icon.png" alt="">
                <h6>财经日历</h6></a>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <a href="javascript:void(0)" @click="ClassesArrage()" v-bind:class="classArrange">
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
                    <button type="button" class="close" @click="closeArrange()" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        <span style="color:#f00;">课程表安排</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="schedule" style="margin:50px; height:99%;">
                      <ul>
                          <li>时间</li>
                          <li>星期一</li>
                          <li>星期二</li>
                          <li>星期三</li>
                          <li>星期四</li>
                          <li>星期五</li>
                          <li>星期六</li>
                          <li class="border-r">星期日</li>
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
                          <li class="border-l"></li>
                      </ul>
                      <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
        </div>
   </div>

   <!-- 财经日历 -->
   <div class="modal fade" id="calenderModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width:1200px">
                <div class="modal-header">
                    <button type="button" class="close" @click="closeCalendar()" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                         <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px; color:#000">财经日历</span></h4>
                    </h4>
                </div>
                <div class="modal-body">
                    <iframe src="http://www.caijingriliba.com/" frameborder="0" scrolling="yes" class="calendar-date" style="width:100%;height:800px;"></iframe>
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
      classArrange:'',
      calenderShow:'',
      tempPeriod:[],
    }
  },
  mounted (){
    this.init();
    if(window.localStorage.getItem('skin')){
        this.sidebarColor = JSON.parse(window.localStorage.getItem('skin'));
    }

    this.queryPeriod();  //查询时间段
  },
  computed: mapGetters({
      user: 'getUser',
      sidebarColor:'getSkin',
  }),
  methods:{
    init (){
      if(window.localStorage.getItem("clf-user")){
        }
    },

    //查询时间段
    queryPeriod(){
        let that = this;
        api.periodQuery().then(function(res){
            if(res.data.Code ==3){
                let templatObj= res.data.Data;
                let tempPeriod=[];
                for(let i =0 ; i<templatObj.length;i++){
                    tempPeriod.push(templatObj[i].period);
                }
                that.tempPeriod=that.sortPeriod(tempPeriod);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    sortPeriod(tempPeriod){
        //时间点排序
        tempPeriod.sort(function (a, b) {
            var a1 = parseInt(a.split(":")[0]);
            var a2 = parseInt(a.split(":")[1]);
            var b1 = parseInt(b.split(":")[0]);
            var b2 = parseInt(b.split(":")[1]);
            if (a1 < b1 || (a1 == b1 && a2 < b2)) {
                return -1;
            } else {
                return 1;
            }
        });
        tempPeriod=tempPeriod.join().split(",");//排序后赋值
        return tempPeriod;
    },

    ClassesArrage(){
      $("#classesModal").modal('show');
      this.classArrange = 'router-link-active';
      let that = this;
      api.schedule().then(function(res){
          if(res.data.Code ==3){
              let DataSource = [
                  {weekday:1,course:[]},
                  {weekday:2,course:[]},
                  {weekday:3,course:[]},
                  {weekday:4,course:[]},
                  {weekday:5,course:[]},
                  {weekday:6,course:[]},
                  {weekday:7,course:[]},
              ];

            let items= res.data.Data;

            for(let i =0; i<items.length;i++){
                switch(items[i].dayofweek){
                    case '周一':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[0].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周二':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[1].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周三':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[2].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周四':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[3].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                        case '周五':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[4].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                        case '周六':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[5].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                        case '周日':
                        var pointName;
                        if(items[i].period == that.tempPeriod[0]){
                             pointName = 1;
                        }
                        else if(items[i].period ==that.tempPeriod[1]){
                             pointName = 2;
                        }
                        else if(items[i].period ==that.tempPeriod[2]){
                             pointName = 3;
                        }
                        else if(items[i].period ==that.tempPeriod[3]){
                             pointName = 4;
                        }
                        else if(items[i].period ==that.tempPeriod[4]){
                             pointName = 5;
                        }
                        else if(items[i].period ==that.tempPeriod[5]){
                             pointName = 6;
                        }
                        else if(items[i].period ==that.tempPeriod[6]){
                             pointName = 7;
                        }
                        else if(items[i].period ==that.tempPeriod[7]){
                             pointName = 8;
                        }
                        else if(items[i].period ==that.tempPeriod[8]){
                             pointName = 9;
                        }
                        else {
                             pointName = 10;
                        }
                        DataSource[6].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                }

            }
            $.each(DataSource,function(i,n){//遍历数据源 填充课程表信息
                    $.each(n.course,function(j,k){
                        $(".schedule ul[name='point"+k.pointName+"'] li").eq(0).html("<span>"+k.pointTime+"</span>");
                        $(".schedule ul[name='point"+k.pointName+"'] li").eq(n.weekday).html("<input type='text' style='display:none; width:80px; vertical-align:top;'/><span class='text' style='cursor:pointer;'>"+k.teacherName+"</span>");
                    });
            });
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    handlesuggestion(){
      if(window.localStorage.getItem("clf-user")){
        this.isLogin=true ;
      }else{
        alert("亲爱的用户，登录后才可查看此部分内容！");
      }
    },

    closeArrange(){
      $("#classesModal").modal('hide');
      this.classArrange = '';
    },

    //财经日历
    calendarDate(){
        let total_width = parseInt(window.innerWidth);
        let total_height = parseInt(window.innerHeight);
        if(total_width < 1600){
          $('.modal-content').width(1000);
          $('iframe').width(1000);
        }
        if(total_width < 1300){
          $('.modal-content').width(800);
          $('iframe').width(800);
        }
        if(total_height < 1000){
          $('.modal-content').height(800);
          $('iframe').height(700);
        }
        if(total_height < 800){
          $('.modal-content').height(600);
          $('iframe').height(500);
        }
       $("#calenderModal").modal('show');
       this.calenderShow = 'router-link-active';
    },

    closeCalendar(){
      $("#calenderModal").modal('hide');
      this.calenderShow='';
    },
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
      width: 12%;
      height:50px;
      padding-top:10px;
      color:#000;
      line-height:30px;
      text-align:center;
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
