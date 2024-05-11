import { call, fork, put, takeEvery } from '@redux-saga/core/effects'
import {
    loadAllSiderDataError,
    loadResourceDataSuccess
} from '../../../../actions/layout/data/action'
import { layoutDataType } from '../../../../actions/layout/data/type'

function* onLoadAllSiderDataStartAsync(params) {
    try {
        const response = yield call(function () {}, params.params)

        yield put(loadResourceDataSuccess(response))
    } catch (error) {
        const response = yield call(function () {}, params)
        yield put(loadResourceDataSuccess(response))

        yield put(loadAllSiderDataError(error))
    }
}

function* onLoadAllSiderData() {
    yield takeEvery(
        layoutDataType.LOAD_ALL_SIDER_DATA_START,
        onLoadAllSiderDataStartAsync
    )
}

const layoutData = [fork(onLoadAllSiderData)]

export default layoutData
