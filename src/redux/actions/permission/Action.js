import {layoutPermissionType} from "./Type";

export const loadPermissionActions = (params) => ({
    type: layoutPermissionType.LOAD_PERMISSION_DATA_START,
    params
})
export const setPermissionActionsSuccess = (params) => ({
    type: layoutPermissionType.SET_PERMISSION_SUCCESS,
    params
})

export const setPermissionActionsError = (params) => ({
    type: layoutPermissionType.SET_PERMISSION_ERROR,
    params
})