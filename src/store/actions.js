/**
 * Created by yangyangyu on 17/6/26.
 */
export const changeLoginway = ({
    commit
}, loginway) => {
    commit('CHANGE_LOGINWAY', loginway)
}

export const changeUser = ({
    commit
}, value) => {
    commit('CHANGE_USER', value)
}

export const changeLogin = ({
    commit
}, value) => {
    commit('CHANGE_Login', value)
}

export const changeReset = ({
    commit
}, value) => {
    commit('CHANGE_RESET', value)
}