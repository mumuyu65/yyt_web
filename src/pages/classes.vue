<template>
  <div class="main">
    <div class="zj-list">
      <div class="inner-container">
        <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">学习课件</span></h4>
        <ul class="list-inline news-type">
          <li v-for="item in mainTitle" @click="showContent(item)" v-bind:class="{'active':item.isActive}">
            {{ item.title}}
          </li>
        </ul>
        <!-- 展示 -->
        <ol class="list-unstyled" v-if="showTeacher">
          <li v-for="report in classes " class="report-item">
              <div class="media">
                  <a class="media-left">
                      <img v-bind:src="report.cover_url" style="height:100px; width:130px;"/>
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">
                        <a>{{report.title}}</a>
                    </h4>
                    <h5>更新日期:{{report.unix | dateStamp }}</h5>
                    <h6>{{report.owner}}</h6>
                    <a v-bind:href="report.annex_url" v-if="report.annex_url"><button class="btn btn-danger">下载附件</button></a>
                  </div>
                  <div v-html="report.intro" style="margin-top:20px;"></div>
              </div>
          </li>
        </ol>

        <ol class="list-unstyled" v-if="!showTeacher">
          <li v-for="report in all_teachers " class="report-item">
              <div class="media">
                  <a class="media-left">
                      <img v-bind:src="report.headurl" style="height:100px; width:130px;"/>
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">
                        昵称:{{report.nick}}
                    </h4>
                  </div>
                  <div v-html="report.intro" style="margin-top:20px;"></div>
              </div>
          </li>
        </ol>
      </div>
    </div>
    <div class="zhibo">
        <zhibo></zhibo>
        <activity></activity>
    </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import Zhibo from '@/components/Zhibo'

import Activity from '@/components/Activity'

export default {
  name: 'HandleSuggestion',
  data () {
    return {
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
  filters: {
      dateStamp (value){
        //获取一个事件戳
         let time = new Date(parseInt(value)*1000);
         //获取年份信息
         let y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         let m =(time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1);
         let d = time.getDate();
            d=d<10?'0'+d:d;

         let H=time.getHours();
            H=H<10?'0'+H:H

         let M=time.getMinutes();
            M=M<10?'0'+M:M
            value=y+'-'+m + '-' + d+'  '+H+":"+M;
         //返回拼接信息
         return value;
      }
  },
  mounted(){
    this.showContent(this.mainTitle[0]);
  },
  components:{ Zhibo,Activity},
  methods:{
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
  },
}
</script>

<style scoped>
    .inner-container{
        background-color:#4B4B4B;
        padding-right:20px;
    }

    .news-type{
      margin-bottom:10px;
    }

    .news-type>li{
      cursor:pointer;
      padding:5px 10px;
    }

    .news-type>li.active{
      background-color: #d1201d;
      border-radius: 5px;
    }

    .inner-container .report-item{
        background-color:#000;
        margin-bottom:10px;
        cursor:pointer;
        padding:20px 10px;
    }
</style>
