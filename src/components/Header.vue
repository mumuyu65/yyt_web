<template>
<div>
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
   <!-- 登录和找回密码 -->
   <div class="modal fade" id="loginModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        <span style="color:#f00;">{{resetTitle}}</span>
                    </h4>
                </div>
                <div class="modal-body" >
                    <div class="login_border" v-show="!resetPwd">
                        <div class="text_1">
                            <p>登 录</p>
                        </div>
                        <div class="text_2">
                            <input type="text" name="account" placeholder="输入用户名" id="login_username" />
                        </div>
                        <div class="text_3">
                            <input type="password" name="pwd" placeholder="输入密码" id="login_pwd" />
                        </div>
                        <div class="text_5">
                            <input type="submit" value="登   录"  id="login_submit" />
                        </div>
                        <div class="text_6">
                            <a @click="resetpwd()" class="pull-right">忘记密码?</a>
                        </div>
                    </div>
                    <!-- 找回密码 -->
                    <div v-show="resetPwd">
                        <ul class="list-unstyled login_border">
                            <li>
                                <div class="text_1">
                                    <p>找回密码</p>
                                </div>
                            </li>
                            <li class="text_2">
                                <input name="account" type="text" placeholder="输入手机号" id="reset_phone"/>
                                <input type="button" value="获取验证码" class="num" />
                            </li>
                            <li class="text_2">
                                <input name="vcode" type="text" placeholder="输入验证码" required/>
                            </li>
                            <li class="text_2">
                                <input name="pwd" type="password" placeholder="输入密码" required/>
                            </li>
                            <li class="text_5">
                                <input type="submit" value="提 交"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                </div>
            </div>
        </div>
   </div>

   <!-- 注册 -->
   <div class="modal fade" id="registerModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        <span style="color:#f00;" id="login_title">注册</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <ul class="list-unstyled login_border">
                        <li>
                            <div class="text_1">
                                <p>注 册</p>
                            </div>
                        </li>
                        <li class="text_2">
                            <input name="account" type="text" placeholder="输入手机号" />
                            <input type="button" value="获取验证码" class="num" />
                        </li>
                        <li class="text_2">
                            <input name="vcode" type="text" placeholder="输入验证码" required/>
                        </li>
                        <li class="text_2">
                            <input name="pwd" type="password" placeholder="输入密码" required/>
                        </li>
                        <li class="text_5">
                            <input type="submit" value="提 交"/>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                </div>
            </div>
        </div>
   </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data(){
    return{
        resetTitle:'登录',
    }
  },
  computed: mapGetters({
      resetPwd: 'getReset',
  }),
  methods: {
    showLogin(){
        $("#loginModal").modal("show");
    },

    showRegister(){
        $("#registerModal").modal("show");
    },

    resetpwd(){
        let that = this;
        this.$store.dispatch('changeReset',true).then(()=>{
            that.resetTitle ='找回密码';
        });
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
