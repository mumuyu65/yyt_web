<template>
<div class="chat" id="chat_inner">
    <ul class="list-inline" style="margin-left:20px;">
        <li><h4 class="chat-title">实时聊天</h4></li>
        <li v-show="isnavy" class="pull-right" style="margin:10px 20px 0 0">
            <span @click="changeFlag()" class="change-account">更改账号</span>
        </li>
    </ul>
    <div class="chat-inner">
        <div class="inner-container" >
            <div class="chat-item" v-for="item in chatInner">
              <ol class="list-inline" @click="sendTextTo(item)" style="cursor:pointer; display:block;">
                <li style="vertical-align: middle">
                  <img v-bind:src="item.userlog" alt="">
                </li>
                <li style="vertical-align: middle"><h5>{{item.date}}</h5></li>
                <li><h5>{{item.name}}</h5></li>
              </ol>
              <h5 v-html="item.text" style="background:rgba(255,255,255,0.1); width:80%; padding:8px; border-radius:5px; margin:0 20px 0 50px;"></h5>
            </div>
        </div>
    </div>
    <div style="position:fixed; width:575px; height:120px;right:-20px; bottom:20px;">
        <div style="width:100%;">
            <!-- 高级助理 -->
            <ul class="list-inline" style="margin:10px 0;">
                <li class="chat-qq" v-for="item in customers">
                    <!--
                    <a  target="_blank" v-bind:href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+item.qq+'&amp;site=qq&amp;menu=yes'">
                        <img src="../../static/images/zhuli.gif" />
                    </a>
                    -->
                    <a @click="callQQ(item.qq)" style="cursor:pointer"><img src="../../static/images/zhuli.gif" /></a>
                </li>
            </ul>

            <ul class="list-inline">
                <li class="chat-icon" @click="toggleFace()">
                    <i class="iconfont icon-xiaolian"></i>表情
                </li>
                <li class="chat-face" v-show="showFace">
                    <div class="chat-face-inner">
                        <div class="chat-face-content">
                          <img v-bind:src="face.url" v-for="face in chatFaces" @click="faceSelect(face)" />
                        </div>
                    </div>
                </li>
                <li class="chat-icon" @click="toggleImg()">
                    <i class="iconfont icon-img"></i>图片
                </li>
                <li class="chat-face chat-img" v-show="showImg" >
                    <div class="chat-face-inner" style="background:rgba(0,0,0,0.7)">
                        <ol class="list-inline" style="padding:10px;">
                            <li v-bind:class="{active:item.active}" v-for="item in chatImgTitle" @click="changeImgTab(item)">
                                {{item.title}}
                            </li>
                        </ol>
                        <div class="chat-face-content" style="padding-bottom: 50px;">
                          <img v-bind:src="face.imgurl" v-for="face in chatImgs" @click="ImgSelect(face)" />
                        </div>
                    </div>
                </li>
                <li class="chat-icon" @click="toggleSkin()">
                    <i class="iconfont icon-huanfu"></i>换肤
                </li>
                <li class="chat-face" v-show="showSkin" style="height:100px; width:400px;">
                    <div class="chat-face-inner" style="background-color:#f5f5f5">
                        <div class="skin-icon" v-bind:style='{backgroundColor:skin.value}' v-for="skin in Skins" @click="SkinSelect(skin)">
                            <i class="iconfont icon-duigou" v-if="skin.isSelected" style="color:#ececec;position:absolute; bottom:-3px; right:0;"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="list-inline" style="position:relative;">
                <li style="width:100%;">
                    <input class="chat-content" @keyup.enter="sendContent()" v-model="chatContent" />
                    <button class="btn btn-send" @click="sendContent()">
                        <span>发送</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>

    <!-- 水军账号身份选择 -->
    <div class="modal fade" id="navyModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        <span class="login-title">水军账号身份选择</span>
                    </h4>
                </div>
                <div class="modal-body" style="color:#000; padding:50px 0;">
                    <ul class="list-unstyled text-center">
                        <li><h5>水军昵称：<input type='text' value=""  v-model="Nick"  style="height:30px;width:200px;"/></h5></li>
                        <li><h5>水军身份：
                                <select v-model="userlevel" style="height:30px; width:200px;">
                                    <option v-for="option in navys" v-bind:value="option.lid" >
                                            {{ option.role_name }}
                                    </option>
                                </select>
                            </h5>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" @click="changeIdentity()">提交</button>
                    <button class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import Jsonp from 'jsonp'

import { mapGetters } from 'vuex'

const chatUrl='http://61.147.124.143:10011';

export default {
    name: 'chatRoom',
    data () {
        return {
          chatFaces:[],
          showFace: false,  //表情
          selectedFace:'',
          chatContent:'',
          role_img:'',
          ws:null,        //长连接
          user:{},        //用户
          userLevels:[],  //用户等级
          chatInner:[],   //聊天内容
          roomID:0,       // 房间号
          showImg:false,  //聊天图片
          chatImgs:[],
          customers:[],   //客服助理
          showSkin:false,   //换肤
          templateRoom:'',  //直播房间号
          Skins:[{id:1,value:'#eaa832',isSelected:false,title:'gold'},
                 {id:2,value:'#e61f1c',isSelected:false,title:'red'},
                 {id:3,value:'#e52b50',isSelected:false,title:'pink'},
                 {id:4,value:'#487dbf',isSelected:false,title:'light_blue'},
                 {id:5,value:'#636d7a',isSelected:false,title:'grey'},
                 {id:6,value:'#8043e1',isSelected:false,title:'purple'},
                 {id:8,value:'#804a5c',isSelected:false,title:'brown'},
                 {id:7,value:'#31577a',isSelected:false,title:'blue'}],
          isnavy:false,   //水军账号
          navys:[],   //水军身份的列表
          userlevel:'',  //水军
          Nick:'',   //水军用户的昵称,

          timer:0,  //定时器

          templeChatImgs:[],

          timer_login:0,   //定时器

          totalTime:1800,  //倒计时

          chatImgTitle:[{id:1,title:'礼物',active:false},{id:2,title:'自创',active:false},
            {id:3,title:'逗你玩',active:false},{id:4,title:'欢喜兔',active:false},{id:5,title:'阿呆',active:false}],

          templateRoomNo:'',
        }
    },
    computed: mapGetters({
          isLogin:'getLogin',
          liveUrl:'getLive',
          flag:'getFlag',
          RoomNo:'getRoomNo',
    }),
    watch:{
        isLogin:'changeUser',
        liveUrl:'changeChatRoom',
        RoomNo:'changeRoomNo',
    },
    mounted (){
        this.initFace();  //初始化表情

        this.customer();   //客服助理

        this.initChat();   //判断是否登录
    },
    methods:{
        //聊天图标
        initFace (){
          let that =this;
          Jsonp('https://api.weibo.com/2/emotions.json?source=1362404091',function (err, res) {
              if(res.code ==1){
                that.chatFaces=res.data;
              }
            });

            //聊天图片
            api.chatImage().then(function(res){
                if(res.data.Code ==3){
                    that.templeChatImgs = res.data.Data;
                    that.changeImgTab(that.chatImgTitle[0]);
                }else{
                    alert("加载聊天图片不成功！");
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        changeImgTab(item){
            for(let i =0; i<this.chatImgTitle.length;i++){
                this.chatImgTitle[i].active = false;
            }
            item.active = !item.active;
            let temp_title = item.title;
            this.chatImgs = [];
            for(let i=0; i<this.templeChatImgs.length; i++){
                if(this.templeChatImgs[i].title ==temp_title ){
                    this.chatImgs.push(this.templeChatImgs[i]);
                }
            }
        },

        initChat (){
            if(window.localStorage.getItem("clf-user")){
                if(parseInt(JSON.parse(window.localStorage.getItem("clf-user")).Flag)!== -1){
                   this.user=JSON.parse(window.localStorage.getItem("clf-user"));
                   if(this.user.Skin){
                        let skin_css = "../../static/"+this.user.Skin+".css";

                        $("#style_css").attr("href",skin_css);
                    }else{
                        let skin_css = "../../static/"+this.Skins[0].title+".css";

                        $("#style_css").attr("href",skin_css);
                    }

                    clearInterval(this.timer_login);

                    $("#count_down").parent().css("display",'none');

                    window.localStorage.removeItem("deadlineTimer");

                    //console.log("会员登录2.......");

                    let params={
                        begidx:0,
                        counts:10
                    };

                    let that = this;

                    api.roomNum(params).then(function(res){
                        if(res.data.Code ==3){
                            that.templateRoom = res.data.Data.Detail;
                            api.userLevel().then(function(res){
                               if (res.data.Code == 3) {
                                    that.userLevels = res.data.Data;
                                    //水军账号登录
                                    if(that.user.Flag ==5){
                                        that.isNavy();
                                    }

                                    that.ConnSvr();
                                }
                          }).catch(function(err){
                              console.log(err);
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                }else{
                    if(window.localStorage.getItem('skin')){
                        let skin_css=JSON.parse(window.localStorage.getItem('skin'));

                        for(let i=0; i<8;i++){
                            if(skin_css == this.Skins[i].title){
                                this.SkinSelect(this.Skins[i]);
                                this.toggleSkin();
                            }
                        }
                    }else{
                        this.SkinSelect(this.Skins[0]);
                        this.toggleSkin();
                    }

                    console.log("游客登录2.......");

                    this.roomNo();  //用户等级

                    let that = this;


                    if(window.localStorage.getItem("deadlineTimer")){

                        let distanceTime = window.localStorage.getItem("deadlineTimer")-new Date().getTime();

                        this.timer_login = setInterval(function(){
                            $("#count_down").text(that.timeStamp(distanceTime));

                            distanceTime = distanceTime -1000;

                            if(distanceTime<0){

                                $("#loginModal").modal("show");

                                clearInterval(that.timer_login);

                                that.testLogin();

                                $("#count_down").parent().css("display",'none');

                                let countDown = new Date().getTime()+ 1800000;

                                window.localStorage.setItem("deadlineTimer",countDown);
                            }
                        },1000);
                    }
                }
            }else{
                //console.log("游客登录1.......");

                this.roomNo();  //用户等级

                let that = this;

                let countDown = new Date().getTime()+ 1800000;

                window.localStorage.setItem("deadlineTimer",countDown);

                let TotalCount = 1800000;

                this.timer_login= setInterval(function(){
                    $("#count_down").text(that.timeStamp(TotalCount));

                    //console.log('倒计时',that.timeStamp(TotalCount));

                    TotalCount = TotalCount -1000;

                    if(TotalCount<0){

                        $("#loginModal").modal("show");

                        clearInterval(that.timer_login);

                        let countDown = new Date().getTime()+ 1800000;

                        window.localStorage.setItem("deadlineTimer",countDown);

                        that.testLogin();

                        $("#count_down").parent().css("display",'none');
                    }
                },1000);
            }
        },

        testLogin(){
            if(parseInt(JSON.parse(window.localStorage.getItem("clf-user")).Flag)== -1){
                this.testlogin = setInterval(function(){
                    $("#loginModal").modal("show");
                },300000);
            }else{
                $("#loginModal").modal("show");
            }
        },

        timeStamp(tm){
            //获取一个事件戳
            var time = new Date(tm);

            var H = time.getHours();

            var M = time.getMinutes();

            var S = time.getSeconds();
            //返回拼接信息
            return '00：' + this.add(M)+ '：' + this.add(S);
        },

        add(m) {
            return m < 10 ? '0' + m : m
        },

        changeUser(){
            if(this.isLogin){
               this.user=JSON.parse(window.localStorage.getItem("clf-user"));
               this.confirmUser();  //聊天链接
               //console.log("会员登录1.......");
               clearInterval(this.timer_login);

               $("#count_down").parent().css("display",'none');

               window.localStorage.removeItem("deadlineTimer");

               let skin_css=this.user.Skin;
               for(let i=0; i<8;i++){
                    if(skin_css == this.Skins[i].title){
                        this.SkinSelect(this.Skins[i]);
                        this.toggleSkin();
                    }
                }
            }
        },

        //游客登录
        visitorLogin() {
            let that = this;
            let params={
                platform:4
            };

            api.visitorLogin(params).then(function(res) {
                if(res.data.Code ==3){
                    window.localStorage.setItem('clf-user',JSON.stringify(res.data.Data));
                    that.user = res.data.Data;
                    that.ConnSvr();  //聊天链接
                    if(that.user.Skin){
                        let skin_css = "../../static/"+that.user.Skin+".css";

                        $("#style_css").attr("href",skin_css);
                    }else{
                        let skin_css = "../../static/"+that.Skins[0].title+".css";

                        $("#style_css").attr("href",skin_css);
                    }

                }else{
                    alert(res.data.Msg);
                }
            })
        },

        callQQ(qq) {
            let url = "tencent://message/?Menu=yes&amp;amp;uin=" + qq + "&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988560E6A29DD620C36E5D02A3C50894BFDDFA9AE24C72EA4E656447195EDF21AA25E56C81415A4E3E06394A554DD64F3F1A382F9455BCE1C9214192773F8AF6EBF516F0E7092D08806B703D054DC2F56A1F65106C78DF1021C883D86C37678EE2EDB615B9954A338A2B2CD7A840089AB4E&amp;amp;SigU=30E5D5233A443AB2727689328A4863A4534880EE96161430D2EA5140D343AB27F9CE70D1273A9F87C0C4EA780476BBB4EB0CD74D567304A9E32DB62FCEABADF3D6133AE3F86FDB82";
            window.location.href = url;
        },

        //开启或关闭表情
        toggleFace (){
          this.showFace = !this.showFace;
        },

        //选择表情
        faceSelect (item){
          this.selectedFace= item;
          this.chatContent += item.phrase;
          this.showFace = !this.showFace;
        },

        ImgSelect(item){
            this.showImg = !this.showImg;
            if(window.localStorage.getItem("clf-user")){
                let Flag = JSON.parse(window.localStorage.getItem("clf-user")).Flag;
                let chat_content;
                if(parseInt(Flag)==-1){
                    chat_content={
                        userlog:this.userLevels[10].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }else{
                    chat_content={
                        userlog:this.userLevels[this.user.Level].role_css,
                        name:this.user.Nick,
                        text:this.ImgTrans(item.imgurl),
                        date:this.dateStamp(new Date())
                    };
                }
                this.chatInner.push(chat_content);
                this.sendText(item.imgurl);
            }else{
                alert("未登录，不可以发送图片!");
            }
        },

        ImgTrans(img){
            return '<img src="' + img + '"/>'
        },

        //开启或关闭聊天图片
        toggleImg(){
            this.showImg = !this.showImg;
        },

        //开启或关闭换肤
        toggleSkin(){
            this.showSkin = !this.showSkin;
        },

        SkinSelect(item){
            this.showSkin = !this.showSkin;

            for(let i=0; i<5;i++){
                this.Skins[i].isSelected = false;
            }
            item.isSelected = true;

            let skin_css = "../../static/"+item.title+".css";

            $("#style_css").attr("href",skin_css);

            if(JSON.parse(window.localStorage.getItem("clf-user")).Flag !== -1){
                    let params={
                        sid:this.user.SessionId,
                        skin:item.title
                    };
                    api.skin(params).then(function(res){
                        //console.log(res.data);
                        alert(res.data.Msg);
                    }).catch(function(err){
                        console.log(err);
                    });
            }else{
                 window.localStorage.setItem("skin",JSON.stringify(item.title));
            }
            return false;
        },

        //客服助理
        customer(){
            let that = this;
            api.qqManage().then(function(res){
                if(res.data.Code ==3){
                    let templateObj = res.data.Data;
                    for(let i =0; i<2; i++){
                        that.customers.push(templateObj[i]);
                    }
                }else{
                    alert("客服助理不存在！");
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        //长链接断开
        close (){
            let that = this;
            console.log("WebSocket Closed.");

            //2秒后启动重连
            setTimeout(function(){
                that.ConnSvr();
            }, 2000);
        },

        //长链接出错
        error (evt){
          console.log("WebSocket Error." + evt.data);
        },

        //验证用户信息
        confirmUser (){
            let sid = this.user.SessionId;
            let uid = this.user.UserId;

            // 发送认证消息
            let body = '{"uid":"' + uid + '","sessionid":"' + sid + '","platform":"4"}';
            let pklen = body.length + 16;
            this.ws.send(JSON.stringify({
                'pklen': pklen,
                'klen': 16,
                'ver': 1,
                'op': 7,
                'id': 4,
                'body': JSON.parse(body)
            }));
        },

        //心跳
        heartbeat (){
          this.ws.send(JSON.stringify({
                'pklen': 16,
                'klen': 16,
                'ver': 1,
                'op': 2,
                'id': 1,
                'body': ''
            }));
        },

         //用户等级
        UserLevel (){
          let that =this;
          api.userLevel().then(function(res){
               if (res.data.Code == 3) {
                    that.userLevels = res.data.Data;
                    //水军账号登录
                    if(that.user.Flag ==5){
                        that.isNavy();
                    }

                    that.visitorLogin();  //游客登录
                }
          }).catch(function(err){
              console.log(err);
            });
        },

        //查询房间号
        roomNo(){
            let params={
                begidx:0,
                counts:10
            };

            let that = this;
            api.roomNum(params).then(function(res){
                if(res.data.Code ==3){
                    that.templateRoom = res.data.Data;

                    that.templateRoomNo = that.templateRoom[0].roomno;

                    that.UserLevel();
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        //更改房间号
        changeRoomNo(item){
            this.templateRoomNo = item;
            this.enterRoom();
        },

        //进入房间
        enterRoom () {
            let body;
            if(window.localStorage.getItem("roomNo")){
                body = parseInt(window.localStorage.getItem("roomNo"));
            }else{
                body = parseInt(this.templateRoomNo);
            }
            let pklen = body.length + 16;
            this.ws.send(JSON.stringify({
                'pklen': pklen,
                'klen': 16,
                'ver': 1,
                'op': 27,
                'id': 4,
                'body': body
            }));
        },

        //进入战队直播的聊天区间
        changeChatRoom(){
            if(this.templateRoom[1]){
                let body = parseInt(this.templateRoom[1].roomno);
                let pklen = body.length + 16;
                this.ws.send(JSON.stringify({
                    'pklen': pklen,
                    'klen': 16,
                    'ver': 1,
                    'op': 27,
                    'id': 4,
                    'body': body
                }));
            }else{
                alert("战队直播房间不存在。");
            }
        },

        //长链接
        ConnSvr (){
            var that = this;
            that.ws = new WebSocket("ws://47.52.19.212:10025/sub");

            that.ws.onopen = function() {
                console.log("conn succeed.");

                that.confirmUser(); //用户认证消息
            };

            that.ws.onmessage = function(evt) {
                let receives = JSON.parse(evt.data); //从字符窜中解析出json对象
                let data = receives[0];
                switch (data.op) {
                    case 3:
                        console.log("聊天室收到心跳回复");
                        break;
                    case 8:
                        let rcvbody_8 = data.body;

                        if(rcvbody_8.code == 100){
                            console.log("用户认证成功!");

                            // 启动计时器发送心跳包
                            var timer = setInterval(function() {
                                that.heartbeat();
                             }, 20000);

                            that.timer = timer;

                            that.enterRoom();  //进入房间

                        }else if(rcvbody_8.code == 101){
                            console.log("用户认证失败!");

                            if(that.user.Flag == -1){

                                that.visitorLogin();

                            }else if(that.user.Flag == 0){
                                window.localStorage.removeItem("clf-user");

                                window.location.reload();

                                alert("登录已过期，请重新登录！");
                            }

                        }
                        break;
                    case 24:
                        let rcvbody_24 = data.body;
                        let data_24 = JSON.parse(JSON.stringify(rcvbody_24));
                        that.personInformation(data_24);  //接受个人信息消息
                        break;
                    case 26:
                        let rcvbody_26 = data.body;
                        let data_26 = JSON.parse(JSON.stringify(rcvbody_26));
                        that.quliaoInformation(data_26);   //接受群聊消息
                        break;
                    case 28:
                        let rcvbody_28 = data.body;
                        let data_28 = JSON.parse(JSON.stringify(rcvbody_28));
                        console.log("进入房间后的反馈信息", data_28);
                        alert(data_28.msg);
                        if (data_28.code == 100) {
                            let roomId = data_28.data.roomid;
                            that.roomID = roomId;
                            that.historyChat(roomId);
                            that.scrollTop();
                        } else {
                            console.log(data.msg);
                        };
                        break;
                    case 30:
                        let rcvbody_30 = data.body;
                        let data_30 = JSON.parse(JSON.stringify(rcvbody_30));
                        console.log("用户退出房间的反馈信息", data_30);
                        break;
                }
            };
            that.ws.onclose = that.close;
            that.ws.onerror = that.error;
        },

        //发送内容
        sendContent (){
           if(window.localStorage.getItem("clf-user")){
                if(this.chatContent){
                    this.sendText(this.chatContent);

                    let tempLevel = this.userLevels.length;

                    if(this.user.Flag == -1){
                        let chat_content={
                            userlog:this.userLevels[10].role_css,
                            name:this.user.Nick,
                            text:this.analysis(this.chatContent),
                            date:this.dateStamp(new Date())
                        };

                          this.chatInner.push(chat_content);

                          this.scrollTop();

                          this.chatContent = '';
                    }else{
                         let chat_content={
                            userlog:this.userLevels[this.user.Level].role_css,
                            name:this.user.Nick,
                            text:this.analysis(this.chatContent),
                            date:this.dateStamp(new Date())
                        };

                          this.chatInner.push(chat_content);

                          this.scrollTop();

                          this.chatContent = '';
                    }
                }else{
                    alert("输入的内容不能为空！");
                }
           }else{
              $("#loginModal").modal("show");
           }
        },

        //发送消息
        sendText (Message) {
            if(this.ws){
                let body = '{"roomid":"' + this.roomID + '","message":"' + Message + '","type":"0"}';
                let pklen = body + 16;
                this.ws.send(JSON.stringify({
                    'pklen': pklen,
                    'klen': 16,
                    'ver': 1,
                    'op': 23,
                    'id': 4,
                    'body': JSON.parse(body)
                }));
            }else{
                this.ConnSvr();
            }
        },

        personInformation (Data) {
            console.log('自己在群聊中发送消息的反馈', Data);
            if(Data.code == 100){

            }
        },

        //接收群聊消息
        quliaoInformation (Data) {
            let date = this.dateStamp(parseInt(Data.time * 1000)); //时间戳
            switch (Data.type) {
                case '0':
                    if(Data.username == this.user.Nick){
                        break;
                    }else{
                        this.showChat(date, Data.username, Data.message, Data);
                        break;
                    }
                    /*
                case '2':
                        let roomName;
                        if(this.liveUrl == '0'){
                            roomName ='大厅直播';
                        }else{
                            roomName ='战队直播';
                        }
                        this.showChat(date, Data.username, Data.message.inname + '进入'+roomName+'房间', Data);
                        break;
                        */
                case '3':
                    this.showChat(date, Data.username, Data.message.outname + '退出房间', Data);
                    break;
                case '5':
                    alert("直播结束....");
                    break;
            }
        },

        //显示聊天内容
        showChat (date, name, text, img) {
            //根据不同的级别，显示不同的图标
            var userLog;
            console.log('用户接收群聊消息', img);
            let len = this.userLevels.length;
            if(img.username == '系统'){
                userLog ='../../static/images/xitong.png';
            }else if(parseInt(img.inflag)== -1){
                userLog = this.userLevels[10].role_css;
            }
            else{
               userLog = this.userLevels[img.userlevel].role_css;
            }

            let Text = this.analysis(text);

            var chat_content={
                userlog:userLog,
                name:name,
                text:Text,
                date:date
            };

            //console.log(chat_content,this.chatInner);

            this.chatInner.push(chat_content);

            this.scrollTop();  //聊天置底
        },

        //私聊
        sendTextTo(item){
            this.chatContent = '@'+item.name;
        },

        //时间转换格式
        dateStamp (tm) {
            //获取一个事件戳
            var time = new Date(tm);
            //获取年份信息
            var y = time.getFullYear();
            //获取月份信息，月份是从0开始的
            var m = time.getMonth() + 1;
            //获取天数信息
            var d = time.getDate();

            var H = time.getHours();

            var M = time.getMinutes();

            var S = time.getSeconds();
            //返回拼接信息
            return this.add(H) + '：' + this.add(M);
        },

        add(m) {
            return m < 10 ? '0' + m : m
        },

        //文字始终置顶
        scrollTop (){
    //      let t = document.getElementById('chat_inner');
            let t = document.getElementsByClassName('chat-inner')[0];
            let shit = t.scrollHeight;
            setTimeout(function(){
                t.scrollTop = shit;
            },100)
        },

        //分析输入的聊天内容
         /*进行解析*/
        analysis (value) {

            let arr = value.match(/\[.{1,5}\]/g);

            let imgArr = value.indexOf("http");

            let gift = value.indexOf('static');

            if (arr && imgArr == -1) {
                for (let i = 0; i < arr.length; i++) {
                    for (let j in this.chatFaces) {
                        if (arr[i] == this.chatFaces[j].phrase) {
                            var ex = '<img src="' + this.chatFaces[j].url + '"/>';
                            value = value.replace(arr[i], ex);
                            break;
                        }

                    }
                }
            }
            else if(imgArr !== -1 ){
                value = '<img src="' + value + '"/>';
            }else if(gift !== -1){
                value = '<img src="' + value + '"/>';
            }
            //console.log(value);

            return value;
        },

        //聊天室的历史记录
        historyChat(rid){
            let params={
                sid:this.user.SessionId,
                rmid:parseInt(rid),
            };

            let that = this;

            api.historyChat(params).then(function(res){
                if(res.data.Code ==3){
                    let templeObj = res.data.Data;

                    let len = that.userLevels.length;

                    let userlog;

                    for(let i=0; i<templeObj.length;i++){
                        if(parseInt(templeObj[i].userflag) !==-1){
                            switch(templeObj[i].userlevel){
                                case '0': userlog = that.userLevels[0].role_css;break;
                                case '1': userlog = that.userLevels[1].role_css;break;
                                case '2': userlog = that.userLevels[2].role_css;break;
                                case '3': userlog = that.userLevels[3].role_css;break;
                                case '4': userlog = that.userLevels[4].role_css;break;
                                case '5': userlog = that.userLevels[5].role_css;break;
                            }

                            var chat_content={
                                userlog:userlog,
                                name:templeObj[i].username,
                                text:that.analysis(templeObj[i].message),
                                date:that.dateStamp(templeObj[i].time*1000)
                            };

                            that.chatInner.push(chat_content);

                            that.scrollTop();

                        }else{
                            userlog = that.userLevels[10].role_css;
                            var chat_content={
                                userlog:userlog,
                                name:templeObj[i].username,
                                text:that.analysis(templeObj[i].message),
                                date:that.dateStamp(templeObj[i].time*1000)
                            };

                            that.chatInner.push(chat_content);

                            that.scrollTop();
                        }
                    }
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        //是否为水军账号
        isNavy(){
            this.navys = [];
            this.isnavy = !this.isnavy;

            for(let i=0; i<6;i++){
                this.navys.push(this.userLevels[i]);
            }
        },

        //水军更改角色
        changeFlag(){
            $("#navyModal").modal("show");
        },

        changeIdentity(){
            let params={
                sid:this.user.SessionId,
                uid:this.user.UserId,
                nick:this.Nick,
                level:this.userlevel
            };
            let _this = this;
            api.changeLevel(params).then(function(res){
                if(res.data.Code ==3){
                    $("#navyModal").modal("hide");
                    _this.user.Nick = _this.Nick;
                    _this.user.Level = _this.userlevel;
                    _this.user.Flag = 5;
                    window.localStorage.setItem('clf-user',JSON.stringify(_this.user));
                }else{
                    alert(res.data.Msg);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
    },
}
</script>

<style scoped>
    .chat .chat-face-content img{
        padding:10px;
        cursor: pointer;
    }

    .chat>.list-inline>li{
        padding:0;
    }

    .chat .chat-qq{
        background-color:#2D373D;
        padding:5px 20px;
        font-size:18px;
        border-radius:5px;
        margin-right:5px;
    }

    .chat .chat-icon{
        color:#fff;
        font-size:14px;
        border:1px solid #fff;
        padding:0px 5px;
        vertical-align:top;
        opacity:0.6;
        margin-right:10px;
        margin-left:5px;
    }

    .chat .chat-icon>i{
        vertical-align:middle;
    }

    .chat .chat-face{
        left: -5px;
        bottom: 70px;
        z-index: 999;
        opacity: 1;
    }

    .chat .skin-icon{
        position:relative;
        width:70px;
        height:30px;
        margin:10px;
        display:inline-block;
        opacity:1.0;
        cursor:pointer;
    }

    .chat .skin-icon:hover{
        opacity:0.6;
    }

    .chat-img .chat-face-inner{
        background: rgba(0,0,0,0.7);
    }

    .chat-img .chat-face-inner>.list-inline>li{
        padding:5px 10px;
        cursor:pointer;
    }

    .chat-img .chat-face-inner>.list-inline>li.active{
        padding:5px 10px;
        background-color:#d1201d;
    }

    .chat-img img{
        width: 87px;
        height: 87px;
        margin: 5px;
        padding: 0;
        display: inline-block;
        vertical-align: middle;
    }
</style>
