// this file is the router of ydd
import Vue from 'vue'
import Router from 'vue-router'

//新闻资讯
import News from '@/pages/news'
//行情
import HangQing from '@/pages/hangqing'
//操作建议
import HandleSuggestion from '@/pages/handlesuggestion'
//行情预测
import Hqpreview from '@/pages/hqpreview'
//老师观点
import TeacherRecommand from '@/pages/teacherrecommand'
//学习课件
import Classes from '@/pages/classes'
//小游戏
import Smallgame from '@/pages/smallgame'
//财经日历
import EconomicDate from '@/pages/economicDate'
//课程安排
import Arragement from '@/pages/smallvideo'
//微信二维码
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
        path: '/teacherrecommand',
        name: 'teacherrecommand',
        component: TeacherRecommand
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