import { call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { signUp } from '../../../../api/auth/api'
import { signupSuccess, signupError } from '../../../actions/signup/actions'
import { signupTypes } from '../../../actions/signup/Types'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { loginSuccess } from '../../../actions/login/actions'

function* onSignupStartAsync(action) {
    try {
        const { firstName, lastName, email, password } = action
        const response = yield call(
            signUp,
            firstName,
            lastName,
            email,
            password
        )
        if (response.status === 200) {
            Cookies.set('accessToken', response.data.accessToken, {
                expires: 2592
            })
            Cookies.set('refreshToken', response.data.refreshToken, {
                expires: 2592
            })
            yield put(signupSuccess())
            yield put(loginSuccess())
        }
    } catch (error) {
        yield put(signupError(error?.message))
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
    }
}

function* onSignup() {
    yield takeEvery(signupTypes.REQUEST, onSignupStartAsync)
}

const signupMiddleware = [fork(onSignup)]

export default signupMiddleware
