<template>
  <div class="news">
    <div class="inner-container">
        <ul class="list-inline news-type">
          <li v-for="type in newsType" @click="changeType(type)" v-bind:class="{'active':type.isActive}">
            {{ type.text}}
          </li>
        </ul>
        <ol class="list-unstyled">
          <li v-for="report in economicNews " class="report-item">
              <div class="media text-center">
                  <img v-bind:src="report.imgurl" style="height:100px;" v-if="report.imgurl"/>
                  <div class="media-body">
                    <h4 class="media-heading" style="margin:10px 0;">
                        {{report.title}}
                    </h4>
                  </div>
                  <div v-html="report.content"></div>
              </div>
          </li>
        </ol>
    </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'News',
  data () {
    return {
        economicNews:[],
        selectedNews:{},
        newsType:[]
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
  mounted (){
    this.initData();
  },
  methods:{
    initData (){
        let that = this;

        api.getNewsType().then(function(res){
            if(res.data.Code ==3){
                let templateObj = res.data.Data.Detail;

                for(let i =0; i<templateObj.length;i++){
                  templateObj[i].isActive = false;
                }

                that.newsType = templateObj;

                that.changeType(that.newsType[0]);
            }
        }).catch(function(err){
          console.log(err);
        });

        let total_height = parseInt(window.innerHeight);

        $("#zj_list").height(total_height);

        $("#zj_list .inner-container").height(total_height+1);
    },

    changeType(item){
      for(let i =0; i<this.newsType.length;i++){
        this.newsType[i].isActive = false;
      }
      item.isActive = true;

      let params={
        begidx:0,
        counts:10,
        type:item.type
      };

      let that = this;

      api.getNews(params).then(function(res){
          //console.log(res.data);
          if(res.data.Code ==3){
              that.economicNews = res.data.Data.Detail;
          }else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
        });
    },
  }
}
</script>

<style scoped>
    .news .inner-container{
        background-color:#4B4B4B;
        padding-right:20px;
    }

    .news .inner-container .report-item{
        background-color:#000;
        margin-bottom:10px;
        cursor:pointer;
    }

    .news .report-item{
        overflow:hidden;
        padding:20px 10px;
    }

    .news .report-item.active{
        background-color:#4B4B4B;
    }

    .news .report-item a{
       color:#fff;
       opacity:0.9;
       text-decoration:none;
    }

    .news .report-content{
        padding:0 10px;
    }

    .news .report-divider{
        width:100%;
        height:2px;
        background-color:#4B4B4B;
        margin-top:40px;
    }

    .news .zhibo .report-text{
        margin-top:30px;
        padding:0 10px;
        height:625px;
        overflow-y:auto;
    }

    .news .zhibo .report-text::-webkit-scrollbar{
        width:10px;
        height:5px;
        background-color: #000;
    }

    .news .zhibo .report-text::-webkit-scrollbar-thumb{
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #4b4b4b;
        width:5px;
    }

    .news .zhibo .report-text>img{
         margin: 0 10px 10px 10px;
         width:506px;
         height:370px;
    }

    .news .zhibo .report-text>h5{
        opacity:0.9;
    }

    .news-type{
      margin-bottom:10px;
    }

    .news-type>li{
      cursor:pointer;
      padding:5px 10px;
    }

    .news-type>li.active{
      border-radius: 5px;
    }
</style>
