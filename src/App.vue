<template>
  <div class="daozhibo" v-bind:style='{backgroundColor:skin.value}'>
    <mq-header></mq-header>
    <sider-bar></sider-bar>
    <div class="content">
       <ol class="list-inline">
        <li style="vertical-align:top">
            <div class="main">
              <div class="zj-list" v-bind:class="{active:sidebarShrink}">
                  <router-view></router-view>
              </div>
            </div>
        </li>
        <li>
          <div class="zhibo">
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
        //console.log(this.skin);
    }
  },
  methods:{
    toggleShrink(){
      this.sidebarShrink = !this.sidebarShrink;
    }
  }
}
</script>