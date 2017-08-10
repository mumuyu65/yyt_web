<template>
  <div class="inner-container">
    <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">操作建议</span></h4>
    <ul class="list-inline news-type">
      <li v-for="item in mainTitle" @click="showContent(item)" v-bind:class="{'active':item.isActive}">
        {{ item.title}}
      </li>
    </ul>

    <!-- 展示 -->
    <ol class="list-unstyled">
      <li v-for="item in templateArr " class="report-item">
          <div class="media">
              <h3 style="color:#d1201d;">{{item.result}}</h3>
              <h4>（仅供参考）</h4>
              <div class="media-body">
                <ul class="list-inline" style="font-size:16px; margin:10px 0;">
                  <li>类型:{{item.order_type}}</li>
                  <li>仓位:{{item.entry_price}}</li>
                  <li>产品类型:{{item.categoryname}}</li>
                </ul>
                <ul class="list-inline" style="font-size:16px;margin:10px 0;">
                  <li>止盈价:{{item.win_price}}</li>
                  <li>止损价:{{item.loss_price}}</li>
                  <li>{{item.wheat_type}}</li>
                </ul>

                <ul class="list-inline" style="font-size:16px;">
                  <li><h5>老师：{{item.owner}}</h5></li>
                  <li class="pull-right"><h5>更新日期:{{item.unix | dateStamp }}</h5></li>
                </ul>
              </div>
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
      {
        id:1,title:'大厅直播',isActive:false,
      },{
        id:2,title:'战队直播',isActive:false}
      ],
      ClanInfos:[],
      RoomInfos:[],
      templateArr:[],
      category:[],
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
    this.initProducts();
  },
  methods:{
    initProducts(){
        //商品
        let that = this;
        api.productManage().then(function(res){
            if(res.data.Code ==3){
                console.log(res.data.Data);
                that.category = res.data.Data;
            }
            else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    showContent(item){
      for(let i=0; i<2; i++){
        this.mainTitle[i].isActive = false;
      }

      item.isActive = true;

      let params={
        begidx:0,
        counts:100
      };

      let that = this;

      that.ClanInfos=[];

      that.RoomInfos=[];

      api.handleSuggestion(params).then(function(res){
        console.log(res.data);
        if(res.data.Code ==3){
            let templateObj = res.data.Data;
            for(let i =0; i<templateObj.length;i++){
                if(templateObj[i].place == '战队直播'){
                    that.ClanInfos.push(templateObj[i]);
                }
                else{
                    that.RoomInfos.push(templateObj[i]);
                }
            }

            if(item.id ==1){
              that.templateArr =that.transName(that.RoomInfos);
            }else{
              that.templateArr =that.transName(that.ClanInfos);
            }
        }
      }).catch(function(err){
          console.log(err);
      });
    },

    transName(item){
      if(item.length>0){
          let len= item.length;
          for(let i =0; i<len;i++){
              for(let j=0;j<this.category.length;j++){
                  if(this.category[j].id == item[i].category_id){
                      item[i].categoryname = this.category[j].name;
                  }
              }
          }
          return item;
      }else{
          alert("无数据！");
      }
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
