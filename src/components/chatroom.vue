<template>
    <div class="chat">
        <ul class="list-inline">
            <li><h4 style="color:#f00;">实时聊天</h4></li>
        </ul>
        <div class="chat-inner">
            <div class="inner-container" id="chat_inner">
                <div class="chat-item" v-for="item in chatInner">
                  <ol class="list-inline" @click="sendTextTo(item)" style="cursor:pointer;">
                    <li style="vertical-align: bottom">
                      <img v-bind:src="item.userlog" alt="">
                    </li>
                    <li style="vertical-align: bottom"><h5>{{item.date}}</h5></li>
                    <li><h5>{{item.name}}</h5></li>
                  </ol>
                  <h4 v-html="item.text"></h4>
                </div>
            </div>
        </div>
        <ul class="list-inline" style="margin:10px 0;">
            <li class="chat-qq">申请1对1</li>
            <li class="chat-qq">转户/开户</li>
            <li class="chat-qq">升级权限</li>
            <li class="chat-qq">错单解读</li>
        </ul>
        <ul class="list-inline">
            <li class="chat-icon">
                <img src="../../static/images/biaoqing.png" alt="" @click="toggleFace()"/>
                <div class="chat-face" v-show="showFace">
                    <div class="chat-face-inner">
                        <div class="chat-face-content">
                          <img v-bind:src="face.url" v-for="face in chatFaces" @click="faceSelect(face)" />
                        </div>
                    </div>
                </div>
            </li>
            <li class="chat-icon"><img src="../../static/images/tupian.png" alt="" /></li>
            <li class="chat-icon"><img src="../../static/images/qingpin.png" alt="" @click="clear()" /></li>
        </ul>
        <ul class="list-inline" style="position:relative;">
            <li style="width:100%;">
                <input class="chat-content" @keyup.enter="sendContent()" v-model="chatContent" />
            </li>
            <li>
                <button class="btn btn-send" @click="sendContent()">
                    <img src="../../static/images/send.png" alt="send"/>
                    <span>发送</span>
                </button>
            </li>
        </ul>
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
      showFace: false,
      selectedFace:'',
      chatContent:'',
      ws:null,
      user:{},
      userLevels:[],
      chatInner:[],
      roomID:0,
    }
  },
  watch:{
    isLogin:'initChat'
  },
  computed: mapGetters({
      isLogin:'getLogin'
  }),
  mounted (){
    this.initFace();  //初始化表情

    this.initChat();  //初始化聊天室

    this.UserLevel();  //用户等级
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
    },

    initChat (){
        if(this.isLogin || window.localStorage.getItem("user") ){
            this.user=JSON.parse(window.localStorage.getItem("user"));
            this.ConnSvr();
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

    //发送内容
    sendContent (){
       if(window.localStorage.getItem("user")){
            if(this.chatContent){
                 this.sendText(this.chatContent);
                 this.chatContent = '';
            }else{
                alert("输入的内容不能为空！");
            }

       }else{
          alert("未登录,不可以发送消息的哦!");
       }
    },

    ConnSvr (){
        var that = this;
        that.ws = new WebSocket("ws://61.147.124.143:10014/sub");

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

    //进入房间
    enterRoom () {
        let params={
            begidx:0,
            counts:10
        };

        let that = this;
        api.roomNum(params).then(function(res){
            if(res.data.Code ==3){
                let templateRoom = res.data.Data.Detail;
                let body = parseInt(templateRoom[0].roomno);
                let pklen = body.length + 16;
                that.ws.send(JSON.stringify({
                    'pklen': pklen,
                    'klen': 16,
                    'ver': 1,
                    'op': 27,
                    'id': 4,
                    'body': body
                }));
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //发送消息
    sendText (Message) {
        if(this.ws){
            var body = '{"roomid":"' + this.roomID + '","message":"' + Message + '","type":"0"}';
            var pklen = body + 16;
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
    },

    //接收群聊消息
    quliaoInformation (Data) {
        let date = this.dateStamp(parseInt(Data.time * 1000)); //时间戳
        switch (Data.type) {
            case '0':
                this.showChat(date, Data.username, Data.message, Data);
                break;
            case '2':
                    this.showChat(date, Data.username, Data.message.inname + '进入房间', Data);
                    break;
            case '3':
                this.showChat(date, Data.username, Data.message.inname + '退出房间', Data);
                break;
            case '5':
                alert("直播结束....");
                break;
        }
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
        let t = document.getElementById('chat_inner');
        t.scrollTop = t.scrollHeight;
    },

    //分析输入的聊天内容
     /*进行解析*/
    analysis (value) {
        let arr = value.match(/\[.{1,5}\]/g);
        console.log(arr);
        if (arr) {
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
        return value;
    },

    //显示聊天内容
    showChat (date, name, text, img) {
        //根据不同的级别，显示不同的图标
        var userLog;
        console.log('用户接受群聊消息', img);
        let len = this.userLevels.length;
        for (let i = 0; i < len; i++) {
            if (img.userflag == this.userLevels[i].fid && img.userlevel == this.userLevels[i].lid) {
                userLog = this.userLevels[i].role_css;
            }
        }

        let Text = this.analysis(text);

        let chat_content={
            userlog:userLog,
            name:name,
            text:Text,
            date:date
        };


        this.chatInner.push(chat_content);

        this.scrollTop();
    },

    //私聊
    sendTextTo(item){
        console.log(item);
    },
  },
}
</script>

<style scoped>
    .chat .chat-face-content img{
        padding:10px;
        cursor: pointer;
    }

    .chat .chat-qq{
        background-color:#2D373D;
        padding:5px 20px;
        font-size:18px;
        border-radius:5px;
        margin-right:5px;
    }
</style>
