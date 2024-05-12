import { signupTypes } from './Types'

const initialState = {
    loading: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    signupSuccess: false
}
const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case signupTypes.REQUEST:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                password: action.password
            }
        case signupTypes.SUCCESS:
            return {
                ...state,
                loading: false,
                signupSuccess: action.signupSuccess
            }
        case signupTypes.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default signupReducer
