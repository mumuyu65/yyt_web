<template>
  <div class="daozhibo" v-bind:style='{backgroundColor:skin.value}'>
    <mq-header></mq-header>
    <sider-bar></sider-bar>
    <div class="content">
       <ol class="list-inline">
        <li>
          <router-view></router-view>
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

import { mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  components: { mqHeader,SiderBar,ChatRoom },
  computed: mapGetters({
      skin:'getSkin',
  }),
  mounted(){
    if(window.localStorage.getItem('skin')){
        this.skin = JSON.parse(window.localStorage.getItem('skin'));
    }
  },
}
</script>