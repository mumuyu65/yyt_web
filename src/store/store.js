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
    resetSkin: {
        id: 1,
        value: '#282828',
        isSelected: false,
        color: '#000'
    },
    liveurl: 0,
    userFlag: '', //用户角色,
    roomNo: '',
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})