<template>
   <img v-bind:src="clanIntro"  style="width:100%; height:90%;"/>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default{
    data(){
        return{
            clanIntro:'',
        }
    },

    mounted(){
        this.initData();
    },
    methods:{
      initData(){
        let that = this;
        api.clanIntro().then(function(res){
            if(res.data.Code ==3){
                that.clanIntro = res.data.Data[0].img_url;
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
      }
    }
}
</script>