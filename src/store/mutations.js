/**
 * Created by yangyangyu on 17/6/26.
 */
export default {
    CHANGE_LOGINWAY(state, loginway) {
            state.loginway = loginway
        },

        CHANGE_USER(state, value) {
            state.user = value
        },

        CHANGE_Login(state, value) {
            state.isLogin = value;
        },

        CHANGE_RESET(state, value) {
            state.resetPwd = value;
        },

        CHANGE_SKIN(state, value) {
            state.resetSkin = value;

            window.localStorage.setItem('skin', JSON.stringify(value));
        },

        CHANGE_LIVE(state, value) {
            state.liveurl = value;

            window.localStorage.setItem('liveurl', JSON.stringify(value));
        },

        CHANGE_FLAG(state, value) {
            state.userFlag = value;
        },

        CHANGE_ROOM(state, value) {
        state.roomNo = value;
        },
}