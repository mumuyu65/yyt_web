<template>
  <div class="inner-container">
    <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">操作建议</span></h4>
    <ul class="list-inline news-type">
      <li v-for="item in mainTitle" @click="showContent(item)" v-bind:class="{'active':item.isActive}">
        {{ item.title}}
      </li>
    </ul>
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
        id:2,title:'战队直播',isActive:false}],
    }
  },
  mounted(){
    this.showContent(this.mainTitle[0]);
  },
  methods:{
    showContent(item){
      for(let i=0; i<2; i++){
        this.mainTitle[i].isActive = false;
      }

      item.isActive = true;

      let params={
        begidx:0,
        counts:100
      };

      api.handleSuggestion(params).then(function(res){
        console.log(res.data);
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
</style>
