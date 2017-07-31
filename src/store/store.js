import Vue from 'vue'

import Vuex from 'vuex'

import * as actions from './actions'

import mutations from './mutations'

import * as getters from './getters'

Vue.use(Vuex)

const state = {
    loginway: 'login',
    isLogin: false,
    resetPwd: false,
    resetSkin: '',
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})