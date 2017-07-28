<template>
  <div class="main">
    <div class="zj-list">
      <div class="inner-container" style="padding:0 10px;">
        <div class="zj-list-header" >
            <ul class="list-inline">
                <li class="active">伦敦金</li>
            </ul>
        </div>
        <div class="divider"></div>
        <ol class="list-inline date-select">
            <li v-bind:class="{active:item.isActive}" @click="changeAUEchartDistance(item)" v-for="item in EchartDistance">{{item.title}}</li>
        </ol>
        <div id="main" style="width:100%; margin:20px 0; height:400px;"></div>
        <div class="zj-list-header" >
            <ul class="list-inline">
                <li class="active">伦敦银</li>
            </ul>
        </div>
        <div class="divider"></div>
        <ol class="list-inline date-select">
            <li v-bind:class="{active:item.isActive}" @click="changeAGEchartDistance(item)" v-for="item in AGEchartDistance">{{item.title}}</li>
        </ol>
        <div id="main_AG" style="width:100%; margin:20px 0; height:400px;"></div>
      </div>
    </div>
    <div class="zhibo">
        <zhibo></zhibo>
        <activity></activity>
    </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import Zhibo from '@/components/Zhibo'

import Activity from '@/components/Activity'

import axios from 'axios'

const hq_endpoint='http://quotes.yddtv.cn:8006'

import echarts from 'echarts'

export default {
  name: 'HangQing',
  data () {
    return {
        myEchart:{},

        myEchart_ag:{},

        echartLastTime:'',

        hqStatic:[{
            exCode:'IPM',
            sCD:'AU',
            title:'伦敦金',
            quo:'',
            isActive:false,
        },
        {
            exCode:'IPM',
            sCD:'AG',
            title:'伦敦银',
            quo:'',
            isActive:false
        }],

        hqws:'',

        hqSid:'',

        EchartDistance:[
        {id:0,title:'1分钟',isActive:true},
        {id:1,title:'5分钟',isActive:false},
        {id:2,title:'15分钟',isActive:false},
        {id:4,title:'1小时',isActive:false},
        {id:5,title:'4小时',isActive:false},
        {id:6,title:'1天',isActive:false}],

        AGEchartDistance:[
        {id:0,title:'1分钟',isActive:true},
        {id:1,title:'5分钟',isActive:false},
        {id:2,title:'15分钟',isActive:false},
        {id:4,title:'1小时',isActive:false},
        {id:5,title:'4小时',isActive:false},
        {id:6,title:'1天',isActive:false}],

        AUarr:[],

        AGarr:[]
    }
  },

  mounted (){
    this.myEchart = echarts.init(document.getElementById('main'));

    this.myEchart_ag = echarts.init(document.getElementById('main_AG'));

    this.hqConn(); //长连接实时数据变化

    this.hqConnAG();

    this.hqDetail();  //行情的历史数据显示

    this.initData();
  },
  components:{ Activity, Zhibo },
  methods:{
    initData(){
        //各股市的股票详情
        let params = {
            "excd": 'IPM',
        };

        let that = this;

        axios.post(hq_endpoint+'/quotes/getInitSymboles',JSON.stringify(params)).then(function(res){
            if(res.data.code == 100){
                let templateObj = res.data.data;
                for(let i=0; i<templateObj.length;i++){
                    if(templateObj[i].sCD =='AG'){
                        that.hqStatic[1].quo = templateObj[i].quo;
                    }else if(templateObj[i].sCD =='AU'){
                        that.hqStatic[0].quo = templateObj[i].quo;
                    }
                }
            }
            }).catch(function(err){
                console.log(err);
            });
    },

    //行情详情
    hqDetail(){
        this.hqhistoryData(this.hqStatic[0],'main',0);

        this.hqhistoryData(this.hqStatic[1],'main_AG',0);
    },

    //行情订阅情况
    hqSubscribe(item,hqSid){
        let tempArr = [];
        tempArr.push({
                "excd": item.exCode,
                "smcd": item.sCD
            });

        //根据点击的交易所不同，来进行订阅
        let body = {
            "sid": hqSid,
            "q_list": tempArr
        };

        $.post(hq_endpoint+'/quotes/quotesSubscription', JSON.stringify(body), function(result) {
            if (result.code == 100) {
                console.log("订阅成功！");
            }
        })
    },

    //实时推送行情数据
    hqConn(){
        let that = this;

        //实时推送数据
        this.hqws = new WebSocket("ws://quotes.yddtv.cn:57081/sub");

        this.hqws.onopen = function() {
            console.log("conn succeed.");
            //定时发送心跳请求，保持连接状态
            setInterval(function() {
                that.hqws.send(JSON.stringify({
                    'pklen': 32,
                    'klen': 16,
                    'ver': 2,
                    'op': 2,
                    'id': 4,
                    'body': ''
                }))
            }, 8000);
        };

        this.hqws.onmessage = function(evt) {
            let receives = JSON.parse(evt.data); //从字符窜中解析出json对象
            let data = receives[0];
            switch (data.op) {
                case 3:
                    //console.log("收到心跳回复");
                    break;
                case 1:
                    var rcvbody = data.body;
                    that.hqSubscribe(that.hqStatic[0],rcvbody.data); //订阅伦敦金数据行情
                    break;
                case 6:
                    var hqUpdate = data.body;
                    //console.log(hqUpdate);
                    that.showEcharts(that.AUarr,hqUpdate,'main'); //更新echarts里面的数据
                    break;
            }
        };
        that.hqws.onclose = that.hqClose;
        that.hqws.onerror = that.hqError;
    },

    hqConnAG(){
        let that = this;

        //实时推送数据
        let hqws = new WebSocket("ws://quotes.yddtv.cn:57081/sub");

        hqws.onopen = function() {
            console.log("conn succeed.");
            //定时发送心跳请求，保持连接状态
            setInterval(function() {
                that.hqws.send(JSON.stringify({
                    'pklen': 32,
                    'klen': 16,
                    'ver': 2,
                    'op': 2,
                    'id': 4,
                    'body': ''
                }))
            }, 8000);
        };

        hqws.onmessage = function(evt) {
            let receives = JSON.parse(evt.data); //从字符窜中解析出json对象
            let data = receives[0];
            switch (data.op) {
                case 3:
                    //console.log("收到心跳回复");
                    break;
                case 1:
                    var rcvbody = data.body;
                    that.hqSubscribe(that.hqStatic[1],rcvbody.data); //订阅伦敦银数据行情
                    break;
                case 6:
                    var hqUpdate = data.body;
                    //console.log(hqUpdate);
                    that.showEcharts(that.AGarr,hqUpdate,'main_AG'); //更新不固定数据
                    break;
            }
        };
        hqws.onclose = that.hqClose;
        hqws.onerror = that.hqError;
    },

    //断开行情
    hqClose() {
        console.log("WebSocket Closed.");
        //2秒后启动重连
        setTimeout("this.hqConn()", 2000);
    },

    //长连接出错
    hqError(evt) {
        console.log("WebSocket Error." + evt);
    },

    //行情的历史数据
    hqhistoryData(obj,ID,Unix) {
        let params = {
                "excd": obj.exCode,
                "smcd": obj.sCD,
                "unixtm": 0,
                "unit": Unix,
                "count": 20
            };
        let that = this;
        axios.post(hq_endpoint+'/quotes/queryKLine', JSON.stringify(params)).then(function(res) {
            if (res.data.code == 100) {
                that.showEcharts(res.data.data,'',ID);
                if(ID =='main'){
                    that.AUarr = res.data.data;
                }else{
                    that.AGarr = res.data.data;
                }
            }
        }).catch(function (error) {
                console.log(error);
            });
    },

    showEcharts(Arr,newData,ID){
       let arr = Arr.sort(this.compare('stime'));

       if (!newData) {
            this.echartLastTime = arr[0].stime;
        } else {
            this.echartLastTime = newData.time;
            let arr_len = arr.length - 1;
            switch (newData.type) {
                case '26':
                    arr.push({
                        stime: newData.time,
                        oprice: arr[arr_len].oprice,
                        cprice: arr[arr_len].cprice,
                        lprice: arr[arr_len].lprice,
                        hprice: newData.value
                    });
                    break;
                case '27':
                    arr.push({
                        stime: newData.time,
                        oprice: arr[arr_len].oprice,
                        cprice: arr[arr_len].cprice,
                        lprice: newData.value,
                        hprice: arr[arr_len].hprice
                    });
                    break;
            }
        }

        let rawData = [],
            dates, data;
        rawData = arr.reverse();

        let that = this;

        dates = rawData.map(function(item) {
            return that.hqDateStamp(item.stime);
        });
        data = rawData.map(function(item) {
            return [+item.oprice, +item.cprice, +item.lprice, +item.hprice];
        });

        let option = {
            backgroundColor: '#000',
            legend: {
                data: [],
                inactiveColor: '#777',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: dates, //时间
                axisLine: {
                    lineStyle: {
                        color: '#8392A5'
                    }
                }
            },
            yAxis: {
                scale: true,
                axisLine: {
                    lineStyle: {
                        color: '#8392A5'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#8392A5'
                    }
                },
                position: 'right',
                axisTick: {
                    show: false
                },
            },
            grid: {
                bottom: 40,
                right: 60,
                left:60,
                top: 40
            },
            dataZoom: [{
                type: 'inside',
                show: 'true',
            }],
            animation: false,
            series: [{
                type: 'candlestick',
                name: '日K',
                data: data,
                dimensions: ['date', '开盘价', '收盘价', '最低价', '最高价'],
                itemStyle: {
                    normal: {
                        color: '#FD1050',
                        color0: '#23d7e3',
                        borderColor: '#FD1050',
                        borderColor0: '#23d7e3'
                    }
                }
            }]
        };
        if(ID == 'main'){
            this.myEchart.setOption(option);
        }else{
            this.myEchart_ag.setOption(option);
        }
    },

    //更新行情数据的时间间隔
    changeAUEchartDistance(item){
        for(let i=0; i<6;i++){
            this.EchartDistance[i].isActive = false;
        }

        item.isActive = true;

        this.hqhistoryData(this.hqStatic[0],'main',item.id);
    },

    changeAGEchartDistance(item){
        for(let i=0; i<6;i++){
            this.AGEchartDistance[i].isActive = false;
        }

        item.isActive = true;

        this.hqhistoryData(this.hqStatic[1],'main_AG',item.id);
    },

    //数组排序
    compare (property) {
        return function(a, b) {
            let value1 = a[property];
            let value2 = b[property];
            return value2 - value1;
        }
    },

    hqDateStamp (tm) {
        var timestamp = tm;
        if (/^\d{10}$/.test(timestamp)) {
            timestamp *= 1000;
        } else if (/^\d{13}$/.test(timestamp)) {
            timestamp = parseInt(timestamp);
        } else {
            return;
        }
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
        var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
        var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
        var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
        var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
        var YmdHis = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        return YmdHis;
    },
  },
}
</script>

<style scoped>
    .zj-list-header>ul{
        margin:0;
    }
    .zj-list-header>ul li{
        padding:3px 20px;
        font-size:16px;
        margin:0 10px 10px 0;
    }

    .zj-list-header>ul li.active{
        background-color:#d1201d;
    }

    .hq-item{
        cursor:pointer;
        padding:0 5px;
    }
    .hq-item.active{
        background-color:#4b4b4b;
    }

    .report-divider{
        width:100%;
        height:2px;
        background-color:#4B4B4B;
        margin-top:40px;
    }

    .hq-select-time>li{
        margin-right:12px;
    }

    .date-select{
        margin:10px;
    }

    .date-select>li {
        width: 55px;
        text-align: center;
        cursor: pointer;
    }

    .date-select>li.active {
        background-color: #fff;
        color: #d1201d;
        border-radius: 5px;
    }
</style>
