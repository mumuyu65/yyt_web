<template>
    <img v-bind:src='activity' style="width:100%; height:100%;" />
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();
export default {
  name: 'activityZone',
  data () {
    return {
        activity:'',
    }
  },
  mounted (){
    this.initData();
  },
  methods:{
    initData (){
        let that = this;

        api.activityZone().then(function(res){
            //console.log(res.data);
            if(res.data.Code ==3){
                that.activity=res.data.Data[0].imgurl;
            }
        }).catch(function(err){
          console.log(err);
        });
    },
  }
}
</script>