import { requestType } from '../../actions/common/Type'

const initialState = {
    loading: false
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case requestType.REQUEST_START:
            return {
                ...state,
                loading: true
            }
        case requestType.REQUEST_FINISH:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default commonReducer
