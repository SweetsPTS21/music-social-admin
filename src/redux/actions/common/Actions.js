import {requestType} from "./Type";

export const requestStart = () => ({
    type: requestType.REQUEST_START
})

export const requestFinish = () => ({
    type: requestType.REQUEST_FINISH
})