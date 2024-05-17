import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useSelector } from 'react-redux'

export const AuthedContext = createContext(null)
export const useAuthedContext = () => useContext(AuthedContext)

const AuthedContextProvider = ({ children }) => {
    const { user, loginSuccess } = useSelector((state) => state.loginReducer)
    const [authedUser, setAuthedUser] = useState(null)

    useEffect(() => {
        if (loginSuccess && user) {
            setAuthedUser(user)
        } else {
            setAuthedUser(null)
        }
    }, [loginSuccess, user])

    const contextValue = useMemo(() => {
        return {
            authed: true,
            authedUser
        }
    }, [user, authedUser, loginSuccess])
    return (
        <AuthedContext.Provider value={contextValue}>
            {children}
        </AuthedContext.Provider>
    )
}

export default AuthedContextProvider
