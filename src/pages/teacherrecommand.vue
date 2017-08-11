<template>
 <div class="inner-container">
  <!--
  <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">老师观点</span></h4>
  -->
  <div class="zj-list-header">
      <ul class="list-inline">
          <li v-for="item in mainTitle" class="active" @click="changePreview(item)">
            {{item.title}}
          </li>
      </ul>
  </div>
  <div class="divider"></div>
  <div class="sub-menu">
      <ul class="list-inline sub-menu-inner">
         <li v-bind:class="{active:item.isActive}" v-for="item in subMenu.children" v-if="subMenu.isFocus" @click="dayComment(item)">
              <h5>{{item.name}}</h5>
          </li>
          <li v-bind:class="{active:item.isActive}" v-for="item in subMenu.children" v-if="!subMenu.isFocus" @click="showPreview(item)">
              <h5>{{item.name}}</h5>
          </li>
      </ul>
  </div>
  <!--  内容  -->
  <ol class="list-unstyled">
    <li v-for="report in newsPreview " class="report-item">
        <div class="media">
            <a class="media-left">
                <img v-bind:src="report.cover_img" style="height:100px;"/>
            </a>
            <div class="media-body">
              <h4 class="media-heading">
                  标题:{{report.title}}
              </h4>
              <h5>更新时间:{{ report.unix | dateStamp }}</h5>
            </div>
            <div v-html="report.intro" style="margin-top:20px;"></div>
        </div>
    </li>
  </ol>
</div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'HandleSuggestion',
  data () {
    return {
      mainTitle:[
        { main_id:1,
          title:'早晚评',
          subTitle:{
            children:[{id:1,name:'早评',isActive:false},{id:2,name:'晚评',isActive:false}],
            isFocus:false
          }
        }
      ],
      subMenu:{
        children:[],
        isFocus:true,
      },
      newsPreview:[],  //具体的展示内容
    }
  },
  filters:{
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
    this.changePreview(this.mainTitle[0]);
    let total_height = parseInt(window.innerHeight);

    $("#zj_list").height(total_height);

    $("#zj_list .inner-container").height(total_height+1);
  },
  methods:{
    changePreview(item){
      item.subTitle.isFocus = true;

      if(item.main_id == 1){
        this.subMenu.children= this.mainTitle[0].subTitle.children;
        this.dayComment(this.subMenu.children[0]);
      }
    },

    //品类预测
    productsPreview(){
      let that = this;
      api.productManage().then(function(res){
        if(res.data.Code ==3){
            let templateObj = res.data.Data;
            for(let i =0; i<templateObj.length;i++){
                templateObj[i].isActive = false;
            }
            that.subMenu.children = templateObj;
            console.log(that.subMenu);

            that.showPreview(that.subMenu.children[0]);
        }
      }).catch(function(err){
        console.log(err);
      });
    },

    showPreview(item){
      for(let i=0; i<this.subMenu.children.length; i++){
         this.subMenu.children[i].isActive = false;
      }
      item.isActive = true;

      let params={
        cgid:item.id,
        begidx:0,
        counts:100,
      };

      let that = this;

      api.productPrecast(params).then(function(res){
          if(res.data.Code ==3){
            that.newsPreview = res.data.Data;
         }else{
            alert(res.data.Msg);
         }
      }).catch(function(err){
          console.log(err);
      });

    },

    //早晚评
    dayComment(item){
      for(let i=0; i<this.subMenu.children.length; i++){
         this.subMenu.children[i].isActive = false;
      }
      item.isActive = true;
      let params={
        flag:item.id,
        begidx:0,
        counts:100
      };

      let that = this;

      api.dayComment(params).then(function(res){
         //console.log(res.data);
         if(res.data.Code ==3){
            that.newsPreview = res.data.Data.Detail;
         }else{
            alert(res.data.Msg);
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

    .zj-list-header>ul li{
        padding:3px 20px;
        margin:10px;
        font-size:16px;
    }

    .zj-list-header>ul li.active{
        background-color:#d1201d;
        border-radius:5px;
    }

    .hq-item{
        cursor:pointer;
        padding:0 5px;
    }
    .hq-item.active{
        background-color:#4b4b4b;
    }

    .report-divider{
        width:100%;
        height:2px;
        background-color:#4B4B4B;
        margin-top:40px;
    }

    .hq-select-time>li{
        margin-right:12px;
    }

    .inner-container .report-item{
        background-color:#000;
        margin-bottom:10px;
        cursor:pointer;
        padding:20px 10px;
    }
</style>

