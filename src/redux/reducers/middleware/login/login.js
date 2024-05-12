import { call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { getMe, logout, signIn } from '../../../../api/auth/api'
import {
    clearLogin,
    loginError,
    loginSuccess
} from '../../../actions/login/actions'
import { loginTypes } from '../../../actions/login/Types'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { BASE_HOME } from '../../../../config/url'
import { clearLocalData } from '../../../../utils/localDataUtils'

function* onLoginStartAsync(action) {
    try {
        const { email, password, rememberMe } = action
        message.loading('Đang đăng nhập...', 0).then((r) => r)
        const response = yield call(signIn, email, password, rememberMe)

        if (response.status === 200) {
            Cookies.set('id_token', response.data.id_token, {
                expires: 2592
            })

            localStorage.setItem('jwtToken', response.data.id_token)

            const me = yield call(getMe)
            if (me.status === 200) {
                yield put(loginSuccess(me.data))
                message.success('Đăng nhập thành công!')
                message.destroy()
            }
        }
    } catch (error) {
        yield put(loginError(error?.message))
        message.error('Sai tên người dùng hoặc mật khẩu. Vui lòng thử lại!')
    }
}

function* onLogin() {
    yield takeEvery(loginTypes.REQUEST, onLoginStartAsync)
}

function* onLogoutStartAsync() {
    try {
        const response = yield call(logout)

        if (response.status === 200) {
            clearLocalData()

            yield put(clearLogin())

            window.location.href = `${BASE_HOME}/login`
        }
    } catch (error) {
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
    }
}

function* onLogout() {
    yield takeEvery(loginTypes.LOGOUT, onLogoutStartAsync)
}

const login = [fork(onLogin), fork(onLogout)]

export default login
