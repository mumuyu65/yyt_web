// this file is the router of ydd
import Vue from 'vue'
import Router from 'vue-router'

import News from '@/pages/news'

import HangQing from '@/pages/hangqing'

import Hqpreview from '@/pages/hqpreview'

import Smallgame from '@/pages/smallgame'



import EconomicDate from '@/pages/economicDate'
import Arragement from '@/pages/smallvideo'
import Classes from '@/pages/classes'
import Economics from '@/pages/economics'
import HandleSuggestion from '@/pages/handlesuggestion'
import Qcode from '@/pages/qcode'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'news',
        component: News
    }, {
        path: '/hangqing',
        name: 'HangQing',
        component: HangQing
    }, {
        path: '/handlesuggestion',
        name: 'HandleSuggestion',
        component: HandleSuggestion
    }, {
        path: '/hqpreview',
        name: 'hqpreview',
        component: Hqpreview
    }, {
        path: '/classes',
        name: 'Classes',
        component: Classes
    }, {
        path: '/smallgame',
        name: 'smallgame',
        component: Smallgame
    }, {
        path: '/economicDate',
        name: 'EconomicDate',
        component: EconomicDate
    }, {
        path: '/arragement',
        name: 'Arragement',
        component: Arragement
    }, {
        path: '/qcode',
        name: 'qcode',
        component: Qcode
    }]
})