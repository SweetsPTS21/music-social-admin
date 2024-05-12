import { signupTypes } from './Types'

export const signupStart = (firstName, lastName, email, password) => ({
    type: signupTypes.REQUEST,
    firstName,
    lastName,
    email,
    password
})

export const signupSuccess = () => ({
    type: signupTypes.SUCCESS,
    signupSuccess: true
})

export const signupError = (error) => ({
    type: signupTypes.FAILURE,
    error: error
})
