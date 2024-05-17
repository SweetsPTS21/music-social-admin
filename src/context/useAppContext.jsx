import React, { createContext, useContext } from 'react'

export const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export default AppContextProvider
