<template>
   <div class="sidebar">
        <ul class="list-unstyled">
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/" exact>
                <img src="../../static/images/news-icon.png" alt="">
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
                    <img src="../../static/images/handle-icon.png" alt="">
                    <h6>操作建议</h6></router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/hqpreview" exact>
                    <img src="../../static/images/preview-icon.png" alt="">
                    <h6>行情预测</h6></router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/teacherrecommand" exact>
                    <img src="../../static/images/zhuanjia-icon.png" alt="">
                    <h6>老师观点</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/classes" exact>
                    <img src="../../static/images/classes.png"  alt="">
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
                <a href="javascript:void(0)" @click="ClassesArrage()">
                    <img src="../../static/images/kechengzhongxin-icon.png"  alt="">
                    <h6>课程安排</h6>
                </a>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <a href="javascript:void(0)">
                    <img src="../../static/images/wechat.png"  alt="">
                    <h6>微信二维码</h6>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
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

    ClassesArrage(){
      alert("课程表的安排......");
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
