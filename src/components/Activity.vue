<template>
  <div class="activity">
      <div id="myTabContent" class="tab-content">
        <div id="myCarousel" class="carousel slide">
          <!-- 轮播（Carousel）项目 -->
          <div class="carousel-inner" id="ads">

          </div>

          <!-- 轮播（Carousel）导航 -->
          <a class="carousel-control left" href="#myCarousel"
              data-slide="prev" style="font-size:85px; top:30%;">&lsaquo;
          </a>
          <a class="carousel-control right" href="#myCarousel" style="font-size:85px; top:30%;"
              data-slide="next">&rsaquo;
          </a>
        </div>
      </div>
  </div>
</template>

<script>

import Productsintro from '@/pages/productsintro'

import API from '@/api/API'
//实例化api
const api = new API();

import { mapGetters } from 'vuex'

export default {
  name: 'activity',
  data () {
    return {
        ads:[],
    }
  },
  mounted(){
    this.initData();
  },
  methods: {
    initData(){
        let that = this;
        api.adsQuery().then(function(res){
          let Data = res.data.Data[0].imgurl;

          let data_arr = Data.split(";");

          for(let i =0; i<data_arr.length-1;i++){
              let item = '<div class="item" ><img src="'+data_arr[i]+'" style="width:100%; height:100%;" /></div>';

              $("#ads").append(item);
          }

          $("#ads .item").eq(0).addClass("active");

          $('#myCarousel').carousel({ interval: 4000 });

        }).catch(function(err){
          console.log(err);
        });
    }
  }
}
</script>

<style scoped>
  .activity .price li{
    width:33%;
    line-height:80px;
    text-align:center;
    font-size:20px;
    cursor:pointer;
  }

  .activity{
    width:100%;
    height:auto;
    overflow:hidden;
  }

  .activity .price li a>img{
    margin-right:10px;
  }
</style>
