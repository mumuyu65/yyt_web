<template>
  <div class="header">
        <router-link to="/"><img src="../../static/images/logo.png" class="logo" /></router-link>
        <ul class="list-inline pull-right" style="line-height:65px;">
            <li style="margin-right:30px;">
                <a href="javascript:void(0)" @click="saveToDesk()">
                    <img src="../../static/images/desktop.png" alt="" />
                    <h4>保存到桌面</h4>
                </a>
            </li>
            <li class="login_reg">
                <span class="active" @click="showLogin()">登录</span>
                <span @click="showRegister()">注册</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showLogin(){

    },

    showRegister(){

    },
  }
}
</script>

<style scoped>
    .login_reg>span{
        padding:5px 15px;
        font-size:14px;
        cursor:pointer;
    }

    .login_reg>span.active{
       background-color:#fff;
       border-radius:10px;
       color:#d1201d;
    }
</style>
