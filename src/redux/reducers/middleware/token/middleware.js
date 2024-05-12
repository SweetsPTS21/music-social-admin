import { call, put, takeEvery, fork } from '@redux-saga/core/effects'
import { getTokenError, getTokenSuccess } from '../../../actions/login/actions'
import { loginTypes } from '../../../actions/login/Types'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { getToken } from '../../../../api/auth/api'

function* onGetTokenStartAsync(action) {
    try {
        const { email } = action

        const response = yield call(getToken, email)

        if (response.status === 200) {
            yield put(getTokenSuccess())
            localStorage.setItem('jwtToken', JSON.stringify(response.data))

            Cookies.set('accessToken', response.data.accessToken, {
                expires: 2592
            })
            Cookies.set('refreshToken', response.data.refreshToken, {
                expires: 2592
            })
        }
    } catch (error) {
        yield put(getTokenError(error))
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!')
    }
}

function* onGetToken() {
    yield takeEvery(loginTypes.GET_TOKEN_REQUEST, onGetTokenStartAsync)
}

const tokenMiddleware = [fork(onGetToken)]

export default tokenMiddleware
