<template>
  <div class="main">
    <div class="zj-list">
      <div class="inner-container">
        <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">财经日历</span></h4>
        <iframe src="http://www.caijingriliba.com/" style="width:100%; height:100%;"></iframe>
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

export default {
  name: 'HandleSuggestion',
  data () {
    return {

    }
  },
  components:{ Zhibo,Activity},
}
</script>

<style scoped>
    .inner-container{
        background-color:#4B4B4B;
        padding-right:20px;
    }
</style>
