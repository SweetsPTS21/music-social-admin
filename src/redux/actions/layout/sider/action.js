import {layoutSiderType} from "./type";

export const setSelectedKeySider = (param) => ({
    type: layoutSiderType.SET_SELECT_KEY,
    payload: param
})