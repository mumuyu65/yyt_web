<template>
  <div class="daozhibo">
    <mq-header></mq-header>
    <sider-bar></sider-bar>
    <div class="content">
       <ol class="list-inline" style="width:100%;height:100%;">
        <li class="pull-left">
            <div class="main">
              <div class="zj-list" v-bind:class="{active:sidebarShrink}" id="zj_list">
                  <router-view></router-view>
              </div>
            </div>
        </li>
        <li class="pull-left">
          <div class="zhibo text-center" id="zhibo" style="background-color:#000; width:100%;">
              <zhibo></zhibo>
              <activity></activity>
          </div>
        </li>
        <li class="shrink" @click="toggleShrink()" v-bind:class="{active:sidebarShrink}">
        </li>
        <li>
          <chat-room></chat-room>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import mqHeader from './components/Header'
import SiderBar from './components/Sidebar'
import ChatRoom from '@/components/chatroom'
import Zhibo from '@/components/Zhibo'
import Activity from '@/components/Activity'
import { mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  data(){
    return {
      sidebarShrink:false,
    }
  },
  components: { mqHeader,SiderBar,ChatRoom,Zhibo,Activity},
  mounted(){
    this.chatHeight();  //聊天内容区块高度不固定

    this.initData();
  },
  methods:{
    toggleShrink(){
      this.sidebarShrink = !this.sidebarShrink;
      let total_width = parseInt(window.innerWidth);
      if(this.sidebarShrink){
        $("#zhibo").width(total_width-460);
      }else{
        $("#zhibo").width(total_width-740);
      }
    },

    chatHeight(){
        $(window).resize(function(){
          let total_height = parseInt(window.innerHeight);

          $("#zj_list").height(total_height);

          $("#zj_list .inner-container").height(total_height+1);

          $("#chat_inner .chat-inner").height(total_height-250);

          $("#chat_inner .inner-container").height(total_height-250+1);

          let total_width = parseInt(window.innerWidth);

          $("#zhibo").width(total_width-740);

          $("#player").height(total_height*0.5);

          $("#myTabContent").height(total_height*0.4);
        });
    },

    initData(){
      let total_width = parseInt(window.innerWidth);

      let total_height = parseInt(window.innerHeight);

      $("#zj_list").height(total_height);

      $("#zj_list .inner-container").height(total_height+1);

      $("#zhibo").width(total_width-740);

      $("#player").height(total_height*0.5);

      $("#myTabContent").height(total_height*0.4);

      $("#chat_inner .chat-inner").height(total_height-250);

      if ((navigator.userAgent.indexOf('MSIE') >= 0)
          && (navigator.userAgent.indexOf('Opera') < 0)){
          alert('您使用的浏览器版本过低，请更换浏览器！');
      }
    },
  }
}
</script>
<style scoped>
  .content>.list-inline>li{
    padding:0 !important;
  }
</style>