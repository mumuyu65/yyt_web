/**
 * Created by yangyangyu on 17/6/26.
 */
export const changeLoginway = ({
        commit
    }, loginway) => {
        commit('CHANGE_LOGINWAY', loginway)
    }
    //更改用户
export const changeUser = ({
    commit
}, value) => {
    commit('CHANGE_USER', value)
}

//更改登录状态
export const changeLogin = ({
    commit
}, value) => {
    commit('CHANGE_Login', value)
}

//更换密码
export const changeReset = ({
    commit
}, value) => {
    commit('CHANGE_RESET', value)
}

//更换皮肤
export const ChangeSkin = ({
    commit
}, value) => {
    commit('CHANGE_SKIN', value)
}

//更改直播地址
export const changeLive = ({
    commit
}, value) => {
    commit('CHANGE_LIVE', value)
}

//创建水军
export const changeFlag = ({
    commit
}, value) => {
    commit('CHANGE_FLAG', value)
}

//更改房间号
export const changeRoom = ({
    commit
}, value) => {
    commit('CHANGE_ROOM', value)
}