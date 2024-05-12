import { combineReducers } from 'redux'
import commonReducer from './common/reducer'
import loginReducer from './login/reducer'
import signupReducer from './signup/reducer'

const rootReducer = combineReducers({
    commonReducer,
    loginReducer,
    signupReducer
})

export default rootReducer
