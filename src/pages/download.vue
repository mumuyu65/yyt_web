<template>
<ul class="list-inline">
    <li v-for="item in downloads"  class="text-center" style="width:25%; margin-top:50px; vertical-align:top;">
        <img v-bind:src="item.imgurl" style="height:150px;" />
        <div style="margin-top:20px;" v-if="item.fileurl"><a v-bind:href="item.fileurl"><button class="btn btn-danger">客户端下载</button></a>
        </div>
    </li>
</ul>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();
export default {
  name: 'Download',
  data () {
    return {
        downloads:'',
    }
  },
  mounted (){
    this.initData();
  },
  methods:{
    initData (){
        let that = this;

        api.download().then(function(res){
            if(res.data.Code ==3){
                that.downloads = res.data.Data;
            }
        }).catch(function(err){
          console.log(err);
        });
    },
  }
}
</script>