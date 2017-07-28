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
            <li class="login_reg" v-show="!loginSuc">
                <span class="active" @click="showLogin()">登录</span>
                <span @click="showRegister()">注册</span>
            </li>
            <li class="login_reg dropdown" v-show="loginSuc">
                <img v-bind:src="userImg" class="img-circle" style="height:30px;"/>
                <span class="dropdown-toggle" data-toggle="dropdown">{{userNick}}<span class="caret"></span></span>
                <ol class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" style="min-width:0; top:92%; left:30px;">
                    <li role="presentation">
                        <a role="menuitem" tabindex="-1" style="cursor:pointer" @click="showPerson()">设置</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabindex="-1" style="cursor:pointer" @click="logout()">退出</a>
                    </li>
                </ol>
            </li>
        </ul>
   </div>
   <!-- 登录和找回密码 -->
   <div class="modal fade" id="loginModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="loginClose()" aria-hidden="true">
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
                            <input type="text" name="account" placeholder="输入用户名" required  v-model="user.account"/>
                        </div>
                        <div class="text_3">
                            <input type="password" name="pwd" @keyup.enter="doLogin()" placeholder="输入密码" v-model="user.pwd" required/>
                        </div>
                        <div class="text_5">
                            <input type="submit" value="登   录"  @click="doLogin()" />
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
                                <input name="account" type="text" placeholder="输入手机号" v-model="reset.phone"/>
                                <input type="button" value="获取验证码" class="num" @click="getResetVcode()"/>
                            </li>
                            <li class="text_2">
                                <input name="vcode" type="number" placeholder="输入验证码" v-model="reset.vcode" required/>
                            </li>
                            <li class="text_2">
                                <input name="pwd" type="password" @keyup.enter="resetLogin()" placeholder="输入密码" v-model="reset.pwd" required/>
                            </li>
                            <li class="text_5">
                                <input type="submit" value="提 交" @click="resetLogin()"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="loginClose()">关闭
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
                        <span style="color:#f00;">注册</span>
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
                            <input name="account" type="text" placeholder="输入手机号" v-model="Phone" required/>
                            <input type="button" value="获取验证码" class="num" @click="getVcode()"/>
                        </li>
                        <li class="text_2">
                            <input name="vcode" type="text" placeholder="输入验证码" v-model="Vcode" required/>
                        </li>
                        <li class="text_2">
                            <input name="nick" type="text" placeholder="用户昵称" v-model="Nick" required/>
                        </li>
                        <li class="text_2">
                            <input name="pwd" type="password" @keyup.enter="doRegister()" placeholder="输入密码" v-model="Pwd" required/>
                        </li>
                        <li class="text_5">
                            <input type="submit" value="提 交" @click="doRegister()"/>
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

import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'header',
  data(){
    return{
        resetTitle:'登录',
        user:{
            account:'',
            pwd:'',
        },
        loginSuc:false,
        userImg:'',
        userNick:'',
        Sid:'',
        Phone:'',
        Vcode:'',
        Pwd:'',
        Nick:'',
        reset:{
            phone:'',
            vcode:'',
            pwd:'',
        },

    }
  },
  computed: mapGetters({
      resetPwd: 'getReset',
  }),
  mounted(){
    if(window.localStorage.getItem("user")){
        this.loginSuc = true;
        let user = JSON.parse(window.localStorage.getItem("user"));
        this.userNick = user.Nick;
        this.userImg = '../../static/images/course_t.png';
        this.Sid = user.SessionId;
    }
  },
  methods: {
    //登录
    showLogin(){
        $("#loginModal").modal("show");
    },

    //登录关闭
    loginClose(){
        let that = this;
        $("#loginModal").modal("hide");
        this.$store.dispatch('changeReset',false).then(()=>{
            that.resetTitle ='登录';
        });
    },

    doLogin(){
        let params={
            account:this.user.account.trim(),
            pwd:this.user.pwd.trim(),
        };

        let that = this;

        if(this.user.account && this.user.pwd){
            api.login(params).then(function(res){
                if(res.data.Code ==3){
                    window.localStorage.setItem('user',JSON.stringify(res.data.Data));
                    that.loginSuc = true;
                    $("#loginModal").modal("hide");
                    that.userNick = res.data.Data.Nick;
                    that.userImg = '../../static/images/course_t.png';
                    that.Sid = res.data.Data.SessionId;
                }else{
                    alert(res.data.Msg);
                }
            }).catch(function(error){
                console.log(error);
            });
        }else{
            alert('用户名或密码不能为空!');
        }
    },

    //注册
    showRegister(){
        $("#registerModal").modal("show");
    },

    getVcode(){
        let params={
            phone:this.Phone.trim()
        };

        if(this.Phone.trim()){
            api.getVcode(params).then(function(res){
                console.log(res);
            }).catch(function(error){
                console.log(error);
            });
        }else{
            alert('手机号码不能为空！');
        }
    },

    doRegister(){
        let params={
            account:this.Phone.trim(),
            pwd:this.Pwd.trim(),
            vcode:this.Vcode.trim(),
            nick:this.Nick.trim(),
            phone:this.Phone.trim(),
        };

        let that = this;

        if(this.Phone.trim() && this.Pwd.trim() && this.Nick.trim() && this.Phone.trim()){
            api.register(params).then(function(res){
                if(res.data.Code ==3){
                    //TODO
                    console.log(res.data);
                }else{
                    alert(res.data.Msg);
                }
                $("#registerModal").modal("hide");
            }).catch(function(err){
                console.log(err);
            });
        }else{
            alert("存在空值!");
        }
    },

    //重置密码
    resetpwd(){
        let that = this;
        this.$store.dispatch('changeReset',true).then(()=>{
            that.resetTitle ='找回密码';
        });
    },

    getResetVcode(){
        let params={
            phone:this.reset.phone.trim()
        };

        if(this.reset.phone.trim()){
            api.getVcode(params).then(function(res){
                console.log(res);
            }).catch(function(error){
                console.log(error);
            });
        }else{
            alert('手机号码不能为空！');
        }
    },

    resetLogin(){
        let params={
            account:this.reset.phone,
            newpwd:this.reset.pwd,
            vcode:this.reset.vcode
        };
        let that = this;
        api.resetPwd(params).then(function(res){
            console.log(res.data);
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.loginClose();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //退出
    logout(){
        let params ={
            sid:this.Sid
        };

        let that = this;
        api.logout(params).then(function(res){
            //console.log(res.data);
            if(res.data.Code ==3){
                that.loginSuc = false;
                window.localStorage.removeItem("user");
                that.$router.push('/');
            }
        }).catch(function(err){
            console.log(err);
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
