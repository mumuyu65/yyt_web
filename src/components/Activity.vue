<template>
  <div class="activity">
      <div class="price">
         <ol id="myTab" class="list-inline">
              <li v-for="(tab,index) in tabs" >
                <a @click="toggle(index,tab.view)" :class="{active:active == index}">
                  <img v-bind:src="tab.image"  alt="" />{{tab.title}}
                </a>
              </li>
          </ol>
      </div>
      <div id="myTabContent" class="tab-content">
         <component :is="currentView"></component>
      </div>
  </div>
</template>

<script>

import Productsintro from '@/pages/productsintro'

import Download from '@/pages/download'

import Teamlive from '@/pages/teamlive'

import Activityzone from '@/pages/activityzone'

import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'activity',
  data () {
    return {
      active: 0,
      currentView: 'Productsintro',
      tabs: [
         {
          view: 'Productsintro',
          image:'../../static/images/product-icon.png',
          title:'产品介绍'
         },
         {
          view: 'Download',
          image:'../../static/images/xiazai.png',
          title:'下载中心'
         },
         {
          view: 'Teamlive',
          image:'../../static/images/jinrong-icon.png',
          title:'战队直播'
         },
         {
          view: 'Activityzone',
          image:'../../static/images/zhibo-icon.png',
          title:'活动专区'
         }
       ]
    }
  },
  components:{ Productsintro, Download, Teamlive, Activityzone },
  methods: {
    toggle(i, v){
       this.active = i
       this.currentView = v
       }
  }
}
</script>

<style scoped>
  .activity .tab-content{
    height:450px;
  }

  .activity .price li{
    width:24%;
    line-height:110px;
    text-align:center;
    font-size:20px;
    cursor:pointer;
  }

  .activity .price li a{
    color:#fff;
    text-decoration:none;
    padding-bottom:20px;
     border-bottom:2px solid transparent;
  }

  .activity .price li a.active{
    border-bottom:2px solid #f00;
  }

  .activity .price li a>img{
    margin-right:10px;
  }

  .active{
     color:red
    }
</style>
