import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthedContext } from './useAuthedContext'

export const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {
    const { authedUser } = useAuthedContext()
    const [loginFailed, setLoginFailed] = useState(null)

    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export default AppContextProvider
