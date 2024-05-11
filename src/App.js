import AppContextProvider from './context/useAppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootPage from './rootPage'
import { BASE_HOME } from './config/url'
import './App.scss'
import SettingRouter from './components/setting/Router'
import LoginPage from './components/login'
import SignupPage from './components/signup'
import AuthedContextProvider from './context/useAuthedContext'
import Page403 from './common/error/Page403'
import ManagementRouter from './router/management/router'

function App() {
    return (
        <AuthedContextProvider>
            <AppContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<RootPage />}>
                            <Route
                                path="setting/*"
                                element={<SettingRouter />}
                            />
                            <Route path="forbidden" element={<Page403 />} />
                        </Route>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                        <Route
                            path="management/*"
                            element={<ManagementRouter />}
                        />
                        <Route
                            path="403"
                            element={<Page403 href={BASE_HOME} />}
                        />
                    </Routes>
                </BrowserRouter>
            </AppContextProvider>
        </AuthedContextProvider>
    )
}

export default App
