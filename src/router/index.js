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
    }]
})