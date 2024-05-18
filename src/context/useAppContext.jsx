import React, { createContext, useContext, useMemo } from 'react'
import { notification } from 'antd'

export const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification()

    const openNotification = (type, message, icon) => {
        api[type]({
            message: 'Notification',
            description: message,
            icon: icon
        })
    }

    const contextValue = useMemo(() => {
        return {
            openNotification
        }
    }, [openNotification])

    return (
        <AppContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
