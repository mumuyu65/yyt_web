<template>
  <div class="daozhibo">
    <mq-header></mq-header>
    <sider-bar></sider-bar>
    <div class="content">
      <ol class="list-inline" style="width:100%;height:100%;">
        <li class="pull-left">
            <div class="main">
              <div class="zj-list" v-bind:class="{active:sidebarShrink}" id="zj_list">
                  <router-view></router-view>
              </div>
            </div>
        </li>
        <li class="pull-left">
          <div class="zhibo text-center" id="zhibo" style="background-color:#000; width:100%;">
              <zhibo></zhibo>
              <activity></activity>
          </div>
        </li>
        <li class="shrink" @click="toggleShrink()" v-bind:class="{active:sidebarShrink}">
        </li>
        <li>
          <chat-room></chat-room>
        </li>
      </ol>
    </div>
    <!-- qq客服 -->
    <div class="customer" v-bind:class="{active:qqShrink}">
      <div class="customer-inner">
          <ul class="list-unstyled text-center">
            <li><img src="../static/images/qq.png" style="height:80px;" /></li>
            <li v-for="item in customers" @click="callQQ(item.qq)">
              {{item.nick}}
            </li>
          </ul>
          <div class="qq-shrink" @click="shrinkQQ()">
              <img src="../static/images/qqprofile.png" style="width:18px; margin-bottom:5px;"/>
              在线客服咨询
              <img src="../static/images/shrink_close.png" v-if="!qqShrink" style="width:8px;" />
              <img src="../static/images/shrink_open.png" v-if="qqShrink" style="width:8px;" />
          </div>
      </div>
    </div>

     <!-- 客服 -->
     <div class="modal fade" id="customerModal" tabindex="-1" role="dialog"
       aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-body" style="padding:20px 50px;">
                    <div class="media">
                        <a class="media-left" href="#">
                            <img class="media-object" src="../static/images/qq.png"/>
                        </a>
                        <div class="media-body" style="color:#333; padding:10px 30px;">
                            <h4 style="margin-bottom:20px;">在线客服</h4>
                            <h4 style="font-size:16px;">欢迎访问“壹言堂直播间”</h4>
                            <h4 style="font-size:16px;">请问有什么可以帮您的吗？</h4>
                            <div style="margin-top:20px;">
                              <button class="btn" @click="callqq()" style="background-color:rgba(230,31,28,0.9); color:#fff; padding: 2px 12px; margin-right:30px;">点击咨询</button>
                              <button class="btn" style="background-color:#333; color:#fff;padding: 2px 12px;" data-dismiss="modal">稍后咨询</button>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
     </div>
  </div>
</template>
<script>
import mqHeader from './components/Header'
import SiderBar from './components/Sidebar'
import ChatRoom from '@/components/chatroom'
import Zhibo from '@/components/Zhibo'
import Activity from '@/components/Activity'
import { mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  data(){
    return {
      sidebarShrink:false,
      customers:[
        {id:1,qq:'1955712109',nick:'认知'},
        {id:2,qq:'405623512',nick:'系统中心提示'},
        {id:3,qq:'382644860',nick:'小婷'},
        {id:4,qq:'404123265',nick:'欢欢'},
        {id:5,qq:'424123265',nick:'Honey冰封'},
        {id:6,qq:'422103825',nick:'小锦'},
        {id:7,qq:'1956689786',nick:'小旭'},
        {id:8,qq:'1957575895',nick:'露露'},
        {id:9,qq:'412383149',nick:'丹丹'}
      ],
      qqShrink:false,

      templateQQ:'',
    }
  },
  components: { mqHeader,SiderBar,ChatRoom,Zhibo,Activity},
  mounted(){
    this.chatHeight();  //聊天内容区块高度不固定

    this.initData();
  },
  methods:{
    toggleShrink(){
      this.sidebarShrink = !this.sidebarShrink;
      let total_width = parseInt(window.innerWidth);
      if(this.sidebarShrink){
        $("#zhibo").width(total_width-460);
      }else{
        $("#zhibo").width(total_width-740);
      }
    },

    chatHeight(){
        $(window).resize(function(){
          let total_height = parseInt(window.innerHeight);

          $("#zj_list").height(total_height);

          $("#zj_list .inner-container").height(total_height+1);

          $("#chat_inner .chat-inner").height(total_height-250);

          $("#chat_inner .inner-container").height(total_height-250+1);

          let total_width = parseInt(window.innerWidth);

          $("#zhibo").width(total_width-740);

          $("#player").height(total_height*0.5);

          $("#myTabContent").height(total_height*0.4);
        });
    },

    initData(){
      let total_width = parseInt(window.innerWidth);

      let total_height = parseInt(window.innerHeight);

      $("#zj_list").height(total_height);

      $("#zj_list .inner-container").height(total_height+1);

      $("#zhibo").width(total_width-740);

      $("#player").height(total_height*0.5);

      $("#myTabContent").height(total_height*0.4);

      $("#chat_inner .chat-inner").height(total_height-250);
    },

    shrinkQQ(){
      this.qqShrink = !this.qqShrink;
    },

    callQQ(qq) {
        $("#customerModal").modal("show");
        let url = "tencent://message/?Menu=yes&amp;amp;uin=" + qq + "&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988560E6A29DD620C36E5D02A3C50894BFDDFA9AE24C72EA4E656447195EDF21AA25E56C81415A4E3E06394A554DD64F3F1A382F9455BCE1C9214192773F8AF6EBF516F0E7092D08806B703D054DC2F56A1F65106C78DF1021C883D86C37678EE2EDB615B9954A338A2B2CD7A840089AB4E&amp;amp;SigU=30E5D5233A443AB2727689328A4863A4534880EE96161430D2EA5140D343AB27F9CE70D1273A9F87C0C4EA780476BBB4EB0CD74D567304A9E32DB62FCEABADF3D6133AE3F86FDB82";
        window.location.href = url;

        this.templateQQ = qq;
    },

    callqq(){
      $("#customerModal").modal("hide");
      let url = "tencent://message/?Menu=yes&amp;amp;uin=" + this.templateQQ  + "&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988560E6A29DD620C36E5D02A3C50894BFDDFA9AE24C72EA4E656447195EDF21AA25E56C81415A4E3E06394A554DD64F3F1A382F9455BCE1C9214192773F8AF6EBF516F0E7092D08806B703D054DC2F56A1F65106C78DF1021C883D86C37678EE2EDB615B9954A338A2B2CD7A840089AB4E&amp;amp;SigU=30E5D5233A443AB2727689328A4863A4534880EE96161430D2EA5140D343AB27F9CE70D1273A9F87C0C4EA780476BBB4EB0CD74D567304A9E32DB62FCEABADF3D6133AE3F86FDB82";
      window.location.href = url;
    }
  }
}
</script>
<style scoped>
  .content>.list-inline>li{
    padding:0 !important;
  }

  .customer{
    position:fixed;
    right:0;
    top:30%;
    width:130px;
    height:auto;
    background-color:#fff;
    padding:10px;
    transition:right 0.8s;
    -moz-transition:right 0.8s;
    -webkit-transition:right 0.8s;
    -o-transition:right 0.8s;
  }

  .customer .customer-inner{
    position:relative;
  }

  .customer.active{
    transition:right 0.8s;
    -moz-transition:right 0.8s;
    -webkit-transition:right 0.8s;
    -o-transition:right 0.8s;
    right:-130px;
  }

  .customer .qq-shrink{
    position:absolute;
    cursor:pointer;
    left:-33%;
    width:25px;
    background-color:rgba(230,31,28,0.9);
    border-radius:5px;
    height:auto;
    top:100px;
    font-size:12px;
    padding:5px;
    text-align:center;
    line-height:1.3;
  }

  .customer-inner li:not(:first-child){
    color:#fff;
    cursor:pointer;
    background-color:rgba(230,31,28,0.9);
    margin:5px 0;
    padding:3px 0;
    border-radius:5px;
  }
</style>