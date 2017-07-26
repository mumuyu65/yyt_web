<template>
    <img v-bind:src='products' style="width:100%;" />
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();
export default {
  name: 'News',
  data () {
    return {
        products:'',
    }
  },
  mounted (){
    this.initData();
  },
  methods:{
    initData (){
        let that = this;

        api.productIntro().then(function(res){
            if(res.data.Code ==3){
                that.products=res.data.Data[0].img_url;
            }
        }).catch(function(err){
          console.log(err);
        });
    },
  }
}

</script>