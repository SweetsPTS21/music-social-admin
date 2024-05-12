import React, { createContext, useContext, useMemo } from 'react'

export const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {
    const contextValue = useMemo(() => {
        return {
            authed: true
        }
    }, [])
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
