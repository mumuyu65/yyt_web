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
        }

}