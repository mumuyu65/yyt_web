/**
 * Created by yangyangyu on 2017/6/14.
 * 统一的api接口部分
 */
import querystring from 'querystring'
import axios from 'axios'
import config from './config'

class API {
    // 游客登录
    visitorLogin(param) {
        config.data = param
        return axios.post('/yyt/visitor/login', {}, config)
    }

    //登录
    login(param) {
        config.data = param;
        return axios.post('/yyt/login', {}, config);
    }

    //皮肤
    skin(param) {
        config.data = param;
        return axios.post('/yyt/user/skin', {}, config);
    }

    //验证码
    getVcode(param) {
        config.data = param;
        return axios.post('/yyt/vcode/get', {}, config);
    }

    //重置密码
    resetPwd(param) {
        config.data = param;
        return axios.post('/yyt/pwd/reset', {}, config);
    }

    //注册
    register(param) {
        config.data = param;
        return axios.post('/yyt/register', {}, config);
    }

    //退出
    logout(param) {
        config.data = param;
        return axios.post('/yyt/logout', {}, config);
    }

    //用户等级
    userLevel(param) {
        config.data = param;
        return axios.post('/yyt/level/query', {}, config);
    }

    changeLevel(param) {
        config.data = param;
        return axios.post('/yyt/live/changeNick', {}, config);
    }

    //资讯类型
    getNewsType(param) {
        config.data = param;
        return axios.post('/yyt/news/type/query', {}, config);
    }

    //资讯内容
    getNews(param) {
        config.data = param;
        return axios.post('/yyt/news/query', {}, config);
    }

    //个人设置
    personSetting(param) {
        config.data = param;
        return axios.post('/yyt/userinfo/update', {}, config);
    }

    //品类管理
    productManage(param) {
        config.data = param;
        return axios.post('/yyt/category/query', {}, config);
    }

    //品类预测
    productPrecast(param) {
        config.data = param;
        return axios.post('/yyt/forecast/cliquery', {}, config);
    }

    //操盘建议
    handleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/cliquery', {}, config);
    }

    //用户信息查询
    userInfo(param) {
        config.data = param;
        return axios.post('/yyt/admin/specifyuser', {}, config);
    }

    //用户权限查询
    userAuth(param) {
        config.data = param;
        return axios.post('/yyt/admin/authquery', {}, config);
    }

    //老师观点 ---早晚评
    dayComment(param) {
        config.data = param;
        return axios.post('/yyt/comment/cliquery', {}, config);
    }

    //学习课件
    classes(param) {
        config.data = param;
        return axios.post('/yyt/courware/cliquery', {}, config);
    }

    //讲师风采
    teachers(param) {
        config.data = param;
        return axios.post('/yyt/lecturer/query', {}, config);
    }


    //课程表管理
    schedule(param) {
        config.data = param;
        return axios.post('/yyt/schedule/query', {}, config);
    }

    //二维码管理
    qrCode(param) {
        config.data = param;
        return axios.post('/yyt/wxcode/query', {}, config);
    }

    //产品介绍
    productIntro(param) {
        config.data = param;
        return axios.post('/yyt/product/query', {}, config);
    }

    //战队介绍
    clanIntro(param) {
        config.data = param;
        return axios.post('/yyt/clan/query', {}, config);
    }

    //下载中心
    download(param) {
        config.data = param;
        return axios.post('/yyt/app/query', {}, config);
    }

    //活动专区
    activityZone(param) {
        config.data = param;
        return axios.post('/yyt/activity/query', {}, config);
    }

    //高级助理管理
    qqManage(param) {
        config.data = param;
        return axios.post('/yyt/customer/query', {}, config);
    }

    //兑奖
    exchangePrize(param) {
        config.data = param;
        return axios.post('/yyt/dj/cliquery', {}, config);
    }

    //直播
    getZhibo(param) {
        config.data = param;
        return axios.post('/yyt/live/query', {}, config);
    }

    //查询房间号
    roomNum(param) {
        config.data = param;
        return axios.post('/yyt/live/query', {}, config);
    }

    //查询聊天的历史记录
    historyChat(param) {
        config.data = param;
        return axios.post('/yyt/live/messages', {}, config);
    }

    //课程表时间段
    scheduleDistance(param) {
        config.data = param;
        return axios.post('/yyt/schedule/period', {}, config);
    }

    //聊天图片
    chatImage(param) {
        config.data = param;
        return axios.post('/yyt/live/images', {}, config);
    }

    //课程安排时间段
    periodQuery(param) {
        config.data = param;
        return axios.post('/yyt/schedule/period', {}, config);
    }

    adsQuery(param) {
            config.data = param;
            return axios.post('/yyt/activity/query', {}, config);
        }
        //访问财经日历
    calendar(param) {
        config.data = param;
        return axios.post('/yyt/calendar/clicks', {}, config);
    }

    //推广链接记录
    linksRecord(param) {
        config.data = param;
        return axios.post('/yyt/promoter/click', {}, config);
    }
}
export default API;