<template>
  <div class="main">
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'ShopMall',
  data () {
    return {
        msg:'this is the 操作建议页面 !'
    }
  },
}
</script>

<style scoped>

</style>
