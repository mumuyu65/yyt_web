<template>
<div class="chat" id="chat_inner">
    <ul class="list-inline">
        <li><h4 style="color:#f00;">实时聊天</h4></li>
        <li v-show="isnavy" class="pull-right">
            <button class="btn btn-send" @click="changeFlag()">更改账号</button>
        </li>
    </ul>
    <div class="chat-inner">
        <div class="inner-container" >
            <div class="chat-item" v-for="item in chatInner">
              <ol class="list-inline" @click="sendTextTo(item)" style="cursor:pointer;">
                <li style="vertical-align: middle">
                  <img v-bind:src="item.userlog" alt="">
                </li>
                <li style="vertical-align: middle"><h5>{{item.date}}</h5></li>
                <li><h5>{{item.name}}</h5></li>
              </ol>
              <h4 v-html="item.text"></h4>
            </div>
        </div>
    </div>

    <!--
    <ul class="list-inline" style="margin:10px 0;">
        <li class="chat-qq">申请1对1</li>
        <li class="chat-qq">转户/开户</li>
        <li class="chat-qq">升级权限</li>
        <li class="chat-qq">错单解读</li>
    </ul>
    -->
    <div style="position:fixed; width:350px; height:220px;right:10px; bottom:20px;">
        <div style="width:100%;">
            <!-- 高级助理 -->
            <ul class="list-inline" style="margin:10px 0;">
                <li class="chat-qq" v-for="item in customers">
                    <a  target="_blank" v-bind:href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+item.qq+'&amp;site=qq&amp;menu=yes'"><img src="../../static/images/zhuli.gif" /></a>
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
                <li class="chat-face" v-show="showImg">
                    <div class="chat-face-inner">
                        <div class="chat-face-content">
                          <img v-bind:src="face.imgurl" style="width:140px; height:70px;" v-for="face in chatImgs" @click="ImgSelect(face)" />
                        </div>
                    </div>
                </li>
                <li class="chat-icon" @click="toggleSkin()">
                    <i class="iconfont icon-huanfu"></i>换肤
                </li>
                <li class="chat-face" v-show="showSkin" style="height:50px; width:460px;">
                    <div class="chat-face-inner" style="background-color:#f5f5f5">
                        <div class="skin-icon" v-bind:style='{backgroundColor:skin.value}' v-for="skin in Skins" @click="SkinSelect(skin)">
                            <i class="iconfont icon-duigou" v-if="skin.isSelected" style="color:#ececec;position:absolute; bottom:-3px; right:0;"></i>
                        </div>
                    </div>
                </li>
                <li class="chat-icon" @click="clear()">
                    <i class="iconfont icon-lajitong"></i>清屏
                </li>
            </ul>
            <ul class="list-inline" style="position:relative;">
                <li style="width:100%;">
                    <input class="chat-content" @keyup.enter="sendContent()" v-model="chatContent" />
                </li>
                <li  class="pull-right">
                    <button class="btn btn-send" @click="sendContent()">
                        <img src="../../static/images/send.png" alt="send"/>
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
                        <span style="color:#f00;">水军账号身份选择</span>
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
      Skins:[{id:1,value:'#282828',isSelected:true,color:'#000'},{id:2,value:'#fff',isSelected:false,color:'#000',fontColor:'#1B2C36'},{id:3,value:'#BF0103',isSelected:false,color:'#000',fontColor:'#fff'},{id:4,value:'#F7C33B',isSelected:false,color:'#000',fontColor:'#FEF4E2'},{id:5,value:'#003E5F',isSelected:false,color:'#000',fontColor:'#00C8F9'}],
      isnavy:false,   //水军账号
      navys:[],   //水军身份的列表
      userlevel:'',  //水军
      Nick:'',   //水军用户的昵称
    }
  },
  computed: mapGetters({
      isLogin:'getLogin',
      liveUrl:'getLive',
      flag:'getFlag',
  }),
  watch:{
    isLogin:'initChat',
    liveUrl:'changeChatRoom',
  },
  mounted (){
    this.initFace();  //初始化表情

    this.UserLevel();  //用户等级

    this.customer();   //客服助理

    this.roomNo();    //房间号列表
  },
  methods:{
    //聊天图标
    initFace (){
      let that =this;
      Jsonp('https://api.weibo.com/2/emotions.json?source=1362404091',function (err, res) {
          if(res.code ==1){
            that.chatFaces=res.data;
            that.initChat();  //初始化聊天室
          }
        });

        //聊天图片
        api.chatImage().then(function(res){
            //console.log(res.data);
            if(res.data.Code ==3){
                that.chatImgs=res.data.Data;
            }else{
                alert("加载聊天图片不成功！");
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    initChat (){
        if(this.isLogin || window.localStorage.getItem("clf-user") ){
            this.user=JSON.parse(window.localStorage.getItem("clf-user"));
            this.ConnSvr();

            if(this.user.Flag ==5){
                this.isNavy();
            }
        }
    },

    //清屏
    clear(){
        this.chatInner = [];
    },

    //用户等级
    UserLevel (){
      let that =this;
      api.userLevel().then(function(res){
           if (res.data.Code == 3) {
                that.userLevels = res.data.Data;
            }
      }).catch(function(err){
          console.log(err);
        });
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
            let chat_content={
                userlog:this.userLevels[this.user.Level].role_css,
                name:this.user.Nick,
                text:this.ImgTrans(item.imgurl),
                date:this.dateStamp(new Date())
            };

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

        this.$store.dispatch('ChangeSkin',item);
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

    //查询房间号
    roomNo(){
        let params={
            begidx:0,
            counts:10
        };

        let that = this;
        api.roomNum(params).then(function(res){
            if(res.data.Code ==3){
                that.templateRoom = res.data.Data.Detail;
                console.log(that.templateRoom);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //进入房间
    enterRoom () {
        let body = parseInt(this.templateRoom[0].roomno);
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
        console.log(this.templateRoom);
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
    },

    //长链接
    ConnSvr (){
        var that = this;
        that.ws = new WebSocket("ws://61.147.124.143:10015/sub");

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
                    console.log("用户认证成功!");
                    // 启动计时器发送心跳包
                    var timer = setInterval(function() {
                        that.heartbeat();
                     }, 20000);
                    that.enterRoom();  //进入房间
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

                let chat_content={
                    userlog:this.userLevels[this.user.Level].role_css,
                    name:this.user.Nick,
                    text:this.analysis(this.chatContent),
                    date:this.dateStamp(new Date())
                };

                this.chatInner.push(chat_content);

                this.scrollTop();

                this.chatContent = '';
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
            case '2':
                    let roomName;
                    if(this.liveUrl == '0'){
                        roomName ='大厅直播';
                    }else{
                        roomName ='战队直播';
                    }
                    this.showChat(date, Data.username, Data.message.inname + '进入'+roomName+'房间', Data);
                    break;
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
        console.log('用户接受群聊消息', img);
        let len = this.userLevels.length;
        if(img.username == '系统'){
            userLog ='';
        }else{
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
//       let t = document.getElementById('chat_inner');
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

                for(let i=0; i<templeObj.length;i++){
                    let userlog;
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

                    //console.log(chat_content);

                    that.chatInner.push(chat_content);

                    that.scrollTop();
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
        let _this = this
        api.changeLevel(params).then(function(res){
            if(res.data.Code ==3){
                $("#navyModal").modal("hide");
                _this.user.Nick = _this.Nick
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
        color:#f00;
        font-size:14px;
        border:1px solid #f00;
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
            left: 16px;
            bottom: 144px;
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
</style>
