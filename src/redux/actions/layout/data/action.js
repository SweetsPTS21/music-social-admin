import {layoutDataType} from "./type";


export const loadAllSiderDataStart = (params) => ({
    type: layoutDataType.LOAD_ALL_SIDER_DATA_START,
    params
})

export const loadResourceDataSuccess = (params) => ({
    type: layoutDataType.LOAD_ALL_SIDER_DATA_SUCCESS,
    params

})

export const loadAllSiderDataError = (params) => ({
    type: layoutDataType.LOAD_ALL_SIDER_DATA_ERROR,
    params
})