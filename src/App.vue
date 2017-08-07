<template>
  <div class="daozhibo" v-bind:style='{backgroundColor:skin.value}'>
    <mq-header></mq-header>
    <sider-bar></sider-bar>
    <div class="content">
       <ol class="list-inline" style="width:100%;height:100%;">
        <li class="pull-left">
            <div class="main">
              <div class="zj-list" v-bind:class="{active:sidebarShrink}">
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
        <li>
            <div class="shrink" @click="toggleShrink()" v-bind:class="{active:sidebarShrink}"></div>
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
  computed: mapGetters({
      skin:'getSkin',
  }),
  mounted(){
    if(window.localStorage.getItem('skin')){
        this.skin = JSON.parse(window.localStorage.getItem('skin'));
        console.log(this.skin);
    }

    this.chatHeight();  //聊天内容区块高度不固定

    this.initData();
  },
  methods:{
    toggleShrink(){
      this.sidebarShrink = !this.sidebarShrink;
    },

    chatHeight(){
        $(window).resize(function(){
          let total_height = parseInt(window.innerHeight);

          $("#chat_inner .chat-inner").height(total_height-350);

          $("#chat_inner .inner-container").height(total_height-350+1);

          let total_width = parseInt(window.innerWidth);

          if(total_width<1440){
            $("#zhibo").width(total_width-570);
          }else if(total_width<=1600){
            $("#zhibo").width(total_width-840);
          }else{
            $("#zhibo").width(total_width-950);
          }
        });
    },

    initData(){
      let total_width = parseInt(window.innerWidth);
      let total_height = parseInt(window.innerHeight);
      if(total_width<1440){
        $("#chat_inner").width('450');
        $("#zhibo").width(total_width-570);
      }else if(total_width <= 1600){
        $("#zhibo").width(total_width-840);
      }
      else{
        $("#zhibo").width(total_width-950);
      }

      $("#myTabContent").height(total_height-444);

      $("#chat_inner .chat-inner").height(total_height-350);

      if ((navigator.userAgent.indexOf('MSIE') >= 0)
          && (navigator.userAgent.indexOf('Opera') < 0)){
          alert('您使用的浏览器版本过低，请更换浏览器！');
      }
    },
  }
}
</script>