import { all } from 'redux-saga/effects'
import layoutData from './layout/data/middleware'
import login from './login/login'
import permissionData from './permission/middleware'
import signupMiddleware from './signup/middleware'
import tokenMiddleware from './token/middleware'

export default function* rootSaga() {
    yield all([
        ...layoutData,
        ...login,
        ...signupMiddleware,
        ...tokenMiddleware,
        ...permissionData
    ])
}
