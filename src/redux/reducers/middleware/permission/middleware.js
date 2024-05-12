import { call, fork, put, takeEvery } from '@redux-saga/core/effects'
import {
    setPermissionActionsError,
    setPermissionActionsSuccess
} from '../../../actions/permission/Action'
import { layoutPermissionType } from '../../../actions/permission/Type'

function checkPermissionActionItemNew(item, module) {
    if (item.key === module) {
        return item.enable && item.create?.createValue === 'true'
    }
}

function checkPermissionWriteNew(actions, module) {
    if (!actions?.enable) return false

    return actions?.subWorkspaces?.some((item) =>
        checkPermissionActionItemNew(item, module)
    )
}

function checkPermissionViewItemNew(item, name) {
    if (item.key === name) {
        return item.enable
    }
}

function checkPermissionDepartmentItemNew(item, name) {
    if (item.key === name) {
        return item.enable && !!item.view?.viewValue
    }
}

function checkPermissionViewNew(actions, name) {
    if (!actions?.enable) return false

    return actions?.subWorkspaces?.some((item) =>
        checkPermissionViewItemNew(item, name)
    )
}

function checkPermissionDepartmentNew(actions, name) {
    if (!actions?.enable) return false

    return actions?.subWorkspaces?.some((item) =>
        checkPermissionDepartmentItemNew(item, name)
    )
}

function checkView(actions, name) {
    if (!actions?.enable) return undefined

    return actions?.subWorkspaces[0]?.view?.viewValue
}

function checkPermissionConfigNew(actions) {
    return actions?.isSystemManager
}

function mapPermissionNew(response) {
    const data = {
        permission: {}
    }

    response?.subWorkspaces?.forEach((item) => {
        data['permission'][item?.key] = {
            read: checkPermissionViewNew(response, item?.key),
            department: checkPermissionDepartmentNew(response, item?.key),
            write: checkPermissionWriteNew(response, item?.key),
            view: checkView(response, item?.key)
        }
    })

    data['permission']['config'] = checkPermissionConfigNew(response)

    return data
}

function* onLoadPermissionAccount(params) {
    try {
        const responseNew = yield call(
            function () {
                console.log('test saga')
            },
            'work',
            params.params
        )

        if (!responseNew.enable) {
            window.location.href = '/403'
        }

        const permission = mapPermissionNew(responseNew)

        yield put(setPermissionActionsSuccess(permission))
    } catch (error) {
        yield put(setPermissionActionsError(error))
    }
}

function* onLoadPermissionData() {
    yield takeEvery(
        layoutPermissionType.LOAD_PERMISSION_DATA_START,
        onLoadPermissionAccount
    )
}

const permissionData = [fork(onLoadPermissionData)]

export default permissionData
