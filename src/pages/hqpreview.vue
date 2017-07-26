<template>
  <div class="main">
    <div class="zj-list">
      <div class="inner-container">
        <h4 style="border-left:2px solid #f00;"><span style=" margin-left:10px;">行情预测</span></h4>
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

