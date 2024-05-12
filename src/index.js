import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18n from './translation/i18n'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'antd'
import vi_VN from 'antd/es/locale/vi_VN'
import en_US from 'antd/es/locale/en_US'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './redux/reducers/middleware/rootSaga'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from './redux/reducers/rootReducer'
import { applyMiddleware, createStore } from 'redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}
const pReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(pReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

const persist = persistStore(store)

root.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <ConfigProvider
                    locale={
                        localStorage.getItem('language') === 'en'
                            ? en_US
                            : vi_VN
                    }
                >
                    <App />
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </I18nextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
