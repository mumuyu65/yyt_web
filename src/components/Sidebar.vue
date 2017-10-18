<template>
<div>
   <div class="sidebar">
        <ul class="list-unstyled">
            <div class="divider"></div>
            <li class="text-center">
              <a href="javascript:void(0)" id="socket_suggestion" @click="socketSuggestion()">
                <img src="../../static/images/news-icon.png" alt="">
                <h6>核心内参</h6>
                </a>
            </li>
            <div class="divider"></div>

            <li class="text-center">
                <a href="javascript:void(0)" @click="handlesuggestion()" v-if="!isLogin" id="handle_suggestion">
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
                <a href="javascript:void(0)" id="classes_suggestion" @click="classesSuggestion()">
                    <img src="../../static/images/zhuanjia-icon.png" alt="">
                    <h6>学习课件</h6>
                </a>
            </li>
            <div class="divider"></div>
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
            <li class="text-center">
                <a href="javascript:void(0)" @click="socket_end()">
                    <img src="../../static/images/classes.png"  alt="">
                    <h6>股市收评</h6>
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
                        <span class="login-title">课程表安排</span>
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
                         <h4 class="border-title"><span style="margin-left:10px;" class="login-title">财经日历</span></h4>
                    </h4>
                </div>
                <div class="modal-body">
                    <iframe src="http://www.caijingriliba.com/" frameborder="0" scrolling="yes" class="calendar-date" style="width:100%;height:800px;"></iframe>
                </div>
            </div>
        </div>
   </div>

   <!-- 股市早报 -->
   <div class="modal fade" id="socketModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="padding:30px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                         <h4 class="border-title"><span style="margin-left:10px;" class="login-title">股市早报</span></h4>
                    </h4>
                </div>
                <div class="modal-body">
                  <ol class="list-unstyled">
                    <li v-for="report in economicNews " class="report-item">
                        <div class="media">
                            <div class="media-body">
                              <ul class="list-inline">
                                  <li style="vertical-align:middle;">
                                    <h4 class="media-heading" style="margin:10px 0; color:#333;">
                                    标题：{{report.title}}
                                    </h4>
                                    <h5 class="text-center" style="color:#333;">时间:{{report.unix | dateStamp }}</h5>
                                  </li>
                                  <li>
                                     <a v-bind:href="report.imgurl" target="_self" class="btn download_file" style="color:#fff;">下载附件</a>
                                  </li>
                              </ul>
                            </div>
                        </div>
                        <hr />
                    </li>
                </ol>
                </div>
            </div>
        </div>
   </div>

   <!-- 股市收评 -->
   <div class="modal fade" id="socketEndModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="padding:30px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                         <h4 class="border-title"><span style="margin-left:10px;" class="login-title">股市收评</span></h4>
                    </h4>
                </div>
                <div class="modal-body">
                  <ol class="list-unstyled">
                    <li v-for="report in economicEndNews " class="report-item">
                        <div class="media">
                            <div class="media-body">
                              <ul class="list-inline">
                                  <li style="vertical-align:middle;">
                                    <h4 style="color:#333;">
                                    标题：{{report.title}}
                                    </h4>
                                    <h4 style="color:#333;">时间：{{report.unix | dateStamp }}</h4>
                                  </li>
                                  <li>
                                     <a v-bind:href="report.imgurl" target="_self" class="btn download_file"
                                     style="color:#fff; margin-left:100px;">下载附件</a>
                                  </li>
                              </ul>
                            </div>
                            <hr />
                        </div>
                    </li>
                </ol>
                </div>
            </div>
        </div>
   </div>

   <!-- 学习课件 -->
   <div class="modal fade" id="classesLearnModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="padding:30px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                         <h4 class="border-title"><span style="margin-left:10px;" class="login-title">学习课件</span></h4>
                    </h4>
                </div>
                <div class="modal-body">
                    <ul class="list-inline news-type">
                      <li v-for="item in mainTitle" @click="showContent(item)" v-bind:class="{'active':item.isActive}">
                        {{ item.title}}
                      </li>
                    </ul>
                    <!-- 展示 -->
                    <ol class="list-unstyled" v-if="showTeacher"style="min-height:300px;">
                      <li v-for="report in classes " class="report-item">
                          <div class="media">
                              <a class="media-left">
                                  <div style="width:108px;height:108px;">
                                      <img v-bind:src="report.cover_url" class="img-responsive"/>
                                  </div>
                              </a>
                              <div class="media-body">
                                <h4 class="media-heading">
                                    <a>{{report.title}}</a>
                                </h4>
                                <h5 style="color:#333;">更新日期:{{report.unix | dateStamp }}</h5>
                                <h6 style="color:#333;">老师:  {{report.owner}}</h6>
                                <a v-bind:href="report.annex_url" v-if="report.annex_url">
                                <button class="btn btn-danger" style="background-color:#eaa832; border:transparent;">下载附件</button></a>
                              </div>
                          </div>
                      </li>
                    </ol>

                    <ol class="list-unstyled" v-if="!showTeacher">
                      <li v-for="report in all_teachers " class="report-item">
                          <div class="media">
                              <a class="media-left">
                                  <div style="width:108px;height:108px;">
                                      <img v-bind:src="report.headurl" class="img-responsive"/>
                                  </div>
                              </a>
                              <div class="media-body">
                                <h4 class="media-heading" style="color:#333; margin-top:30px;">
                                    昵称:{{report.nick}}
                                </h4>
                              </div>
                          </div>
                      </li>
                    </ol>
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
      economicNews:[],
      Begidx:0,
      socketReportType:0,
      prev:false,
      next:false,

      economicEndNews:[],
      endBegidx:0,
      socketReportEndType:0,

      mainTitle:[
          { id:1,title:'基础课件',isActive:false},
          { id:2,title:'高级课件',isActive:false},
          { id:3,title:'讲师风采',isActive:false}
        ],
      classes:[],
      showTeacher:true,
      all_teachers:[],
    }
  },
  mounted (){
    this.init();

    this.queryPeriod();  //查询时间段

    this.showContent(this.mainTitle[0]);
  },
  computed: mapGetters({
      user: 'getUser',
  }),
  filters:{
    dateStamp:function(value){
        //获取一个事件戳
         var time = new Date(value*1000);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
         //获取天数信息
         //获取天数信息
         var d = (time.getDate())<10?('0'+time.getDate()):time.getDate();

         var H=(time.getHours())<10?('0'+time.getHours()):time.getHours();

         var M=(time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
         //返回拼接信息
         return y+'-'+m + '-' + d+'    '+H+":"+M;
    },
  },
  methods:{
    //初始化
    init (){
      if(window.localStorage.getItem("clf-user")){
        }

        let that = this;

        api.getNewsType().then(function(res){
            if(res.data.Code ==3){
                let templateObj = res.data.Data.Detail;

                for(let i=0; i<templateObj.length;i++){
                  if(templateObj[i].text == '股市早报'){
                    that.socketReportType = templateObj[i].type;

                  }

                  if(templateObj[i].text =='股市收评'){
                    that.socketReportEndType = templateObj[i].type;
                  }
                }

                that.socketReport();

                that.socketEndReport();
            }
        }).catch(function(err){
          console.log(err);
        });
    },

    //股市早报初始数据
    socketReport(){
      let params={
        begidx:this.Begidx,
        counts:10,
        type:this.socketReportType
      };

      let that = this;

      console.log("股市早报");

      api.getNews(params).then(function(res){
          if(res.data.Code ==3){
            that.economicNews = res.data.Data.Detail;
            //console.log(res.data.Data);
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
        });
    },

    //下一条
    nextNews(){
      this.Begidx += 1;

      this.News();
    },

    //上一条
    prevNews(){
      this.Begidx -= 1;

      this.News();
    },

    //股市早报
    News(){
      let params={
        begidx:this.Begidx,
        counts:1,
        type:this.socketReportType
      };

      let that = this;

      api.getNews(params).then(function(res){
          if(res.data.Code ==3){
              if(parseInt(res.data.Data.Total)-that.Begidx == 1){
                that.next = false;
                that.prev = true;
              }else if(that.Begidx == 0){
                that.next = true;
                that.prev = false;
              }else{
                that.next = true;
                that.prev = true;
              }
              that.economicNews = res.data.Data.Detail;
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
        });
    },
    //查询时间段
    queryPeriod(){
        let that = this;
        api.periodQuery().then(function(res){
            if(res.data.Code ==3){
              if(res.data.Data){
                let templatObj= res.data.Data;
                let tempPeriod=[];
                for(let i =0 ; i<templatObj.length;i++){
                    tempPeriod.push(templatObj[i].period);
                }
                that.tempPeriod=that.sortPeriod(tempPeriod);
              }

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

    //课程表安排
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

            if(items){
               let len = items.length;
              for(let i =0; i<len;i++){
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
            }
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    //操作建议
    handlesuggestion(){
      if(window.localStorage.getItem("clf-user")){
        let Flag =JSON.parse(window.localStorage.getItem("clf-user")).Flag;
        if(Flag == -1){
          this.isLogin=false ;
          alert("亲爱的用户，登录后才可查看此部分内容！");
        }else{
          this.isLogin=true ;
        }
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
          $('#calenderModal .modal-content').width(1000);
          $('iframe').width(1000);
        }
        if(total_width < 1300){
          $('#calenderModal .modal-content').width(800);
          $('iframe').width(800);
        }
        if(total_height < 1000){
          $('#calenderModal .modal-content').height(800);
          $('iframe').height(700);
        }
        if(total_height < 800){
          $('#calenderModal .modal-content').height(600);
          $('iframe').height(500);
        }
       $("#calenderModal").modal('show');
       this.calenderShow = 'router-link-active';
    },

    closeCalendar(){
      $("#calenderModal").modal('hide');
      this.calenderShow='';
    },

    //股市早评
    socketSuggestion(){
      $("#socketModal").modal('show');
    },

    //股市收评
    socket_end(){
      $("#socketEndModal").modal('show');
    },

    socketEndReport(){
      let params={
        begidx:this.endBegidx,
        counts:10,
        type:this.socketReportEndType
      };

      let that = this;

      console.log('股市收评',params);

      api.getNews(params).then(function(res){
          if(res.data.Code ==3){
              console.log(res.data);
              that.economicEndNews = res.data.Data.Detail;
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
        });
    },

    //学习课件
    classesSuggestion(){
      $("#classesLearnModal").modal('show');
    },

    showContent(item){
        for(let i=0; i<3; i++){
          this.mainTitle[i].isActive = false;
        }

        item.isActive = true;

        if(item.id == 3){
            this.showTeachers();
            this.showTeacher = false;
        }else{
           let that= this;
           this.showTeacher= true;
           let params={
            flag:item.id,
            begidx:0,
            counts:100,
          };
          api.classes(params).then(function(res){
              if(res.data.Code ==3){
                //console.log(res.data.Data);
                that.classes = res.data.Data;
              }
              else{
                alert(res.data.Msg);
              }
          }).catch(function(err){
              console.log(err);
          });
        }
    },

    showTeachers(){
        let params={
          flag:1,
          counts:100
        };

        let that = this;

        api.teachers(params).then(function(res){
            if(res.data.Code ==3){
                that.all_teachers = res.data.Data.Detail;
            }else{
              alert(res.data.Data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },
  }
}
</script>

<style scoped>
  .router-link-active{
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

  .news-type{
      margin-bottom:10px;
  }

</style>
