<template>
   <div class="sidebar">
        <ul class="list-unstyled">
            <li class="text-center">
              <router-link to="/" exact>
                <img src="../../static/images/pencil.png" alt="">
                <h6>新闻资讯</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/hangqing" exact>
                    <img src="../../static/images/hangqing.png" alt="">
                    <h6>行情</h6></router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/handlesuggestion" exact>
                    <img src="../../static/images/hangqing.png" alt="">
                    <h6>操作建议</h6></router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/hqpreview" exact>
                    <img src="../../static/images/zhuanjia-icon.png" alt="">
                    <h6>老师观点</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/classes" exact>
                    <img src="../../static/images/kaihu.png"  alt="">
                    <h6>学习课件</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/smallgame" exact>
                  <img src="../../static/images/youxi-icon.png" alt="">
                  <h6>小游戏</h6>
              </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/economicDate" exact>
                <img src="../../static/images/calendar-icon.png" alt="">
                <h6>财经日历</h6></router-link></li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/arragement" exact >
                    <img src="../../static/images/kechengzhongxin-icon.png"  alt="">
                    <h6>课程安排</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/qcode" exact>
                    <img src="../../static/images/xiazai.png"  alt="">
                    <h6>微信二维码</h6>
                </router-link>
            </li>
            <div class="divider"></div>
        </ul>
        <div class="sidebar-divider"></div>
         <!--登录和注册部分-->
        <login></login>
    </div>
</template>

<script>
import Login from '@/pages/login'

import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  components: { Login },
  mounted (){
    this.init();
  },
  computed: mapGetters({
      user: 'getUser',
  }),
  methods:{
    init (){
      if(window.localStorage.getItem("user")){
        if (this.user.Beans.length > 7) {
            this.user.Beans = parseInt(this.user.Beans) % 10000 + '万';
        }
        this.$store.dispatch('changeUser',JSON.parse(window.localStorage.getItem("user")));
     }
    },
  }
}
</script>

<style scoped>

.router-link-active{
   background-color:#d1201d;
   text-decoration:none;
}

</style>
