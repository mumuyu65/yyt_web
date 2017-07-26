/**
 * Created by yangyangyu on 2017/6/14.
 * 统一的api接口部分
 */
import querystring from 'querystring'
import axios from 'axios'
import config from './config'

class API {
    //登录
    login(param) {
        config.data = param;
        return axios.post('/cycj/login', {}, config);
    }

    //验证码
    getVcode(param) {
        config.data = param;
        return axios.post('/cycj/vcode/get', {}, config);
    }

    //重置密码
    resetPwd(param) {
        config.data = param;
        return axios.post('/cycj/pwd/reset', {}, config);
    }

    //注册
    register(param) {
        config.data = param;
        return axios.post('/cycj/register', {}, config);
    }

    //退出
    logout(param) {
        config.data = param;
        return axios.post('/cycj/logout', {}, config);
    }

    //用户等级
    userLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/query', {}, config);
    }

    //资讯类型
    getNewsType(param) {
        config.data = param;
        return axios.post('/cycj/news/type/query', {}, config);
    }

    //资讯内容
    getNews(param) {
        config.data = param;
        return axios.post('/cycj/news/query', {}, config);
    }

    //个人设置
    personSetting(param) {
        config.data = param;
        return axios.post('/cycj/userinfo/update', {}, config);
    }

    //品类管理
    productManage(param) {
        config.data = param;
        return axios.post('/cycj/category/query', {}, config);
    }

    //品类预测
    productPrecast(param) {
        config.data = param;
        return axios.post('/cycj/forecast/cliquery', {}, config);
    }

    //操盘建议
    handleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/cliquery', {}, config);
    }

    //用户信息查询
    userInfo(param) {
        config.data = param;
        return axios.post('/cycj/admin/specifyuser', {}, config);
    }

    //用户权限查询
    userAuth(param) {
        config.data = param;
        return axios.post('/cycj/admin/authquery', {}, config);
    }

    //老师观点 ---早晚评
    dayComment(param) {
        config.data = param;
        return axios.post('/cycj/comment/cliquery', {}, config);
    }

    //学习课件
    classes(param) {
        config.data = param;
        return axios.post('/cycj/courware/cliquery', {}, config);
    }

    //课程表管理
    schedule(param) {
        config.data = param;
        return axios.post('/cycj/schedule/query', {}, config);
    }

    //二维码管理
    qrCode(param) {
        config.data = param;
        return axios.post('/cycj/wxcode/query', {}, config);
    }

    //产品介绍
    productIntro(param) {
        config.data = param;
        return axios.post('/cycj/product/query', {}, config);
    }

    //战队介绍
    clanIntro(param) {
        config.data = param;
        return axios.post('/cycj/clan/query', {}, config);
    }

    //下载中心
    download(param) {
        config.data = param;
        return axios.post('/cycj/app/query', {}, config);
    }

    //高级助理管理
    qqManage(param) {
        config.data = param;
        return axios.post('/cycj/customer/query', {}, config);
    }

    //兑奖
    exchangePrize(param) {
        config.data = param;
        return axios.post('/cycj/dj/cliquery', {}, config);
    }

    //直播
    getZhibo(param) {
        config.data = param;
        return axios.post('/cycj/liveinfo', {}, config);
    }

}
export default API;