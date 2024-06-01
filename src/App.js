import AppContextProvider from './context/useAppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BASE_HOME } from './config/url'
import './App.scss'
import SettingRouter from './components/setting/Router'
import LoginPage from './components/login'
import AuthedContextProvider from './context/useAuthedContext'
import Page403 from './common/error/Page403'
import { ManagementRoute } from './components/management/route/route'
import ActiveUser from './components/active'
import ResetPassword from './components/reset-password'
import ArtistRegister from './components/upgrade'

function App() {
    return (
        <AuthedContextProvider>
            <AppContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<LoginPage />}>
                            <Route
                                path="setting/*"
                                element={<SettingRouter />}
                            />
                            <Route path="forbidden" element={<Page403 />} />
                        </Route>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="active" element={<ActiveUser />} />
                        <Route path="reset" element={<ResetPassword />} />
                        <Route path="upgrade" element={<ArtistRegister />} />
                        <Route
                            index
                            path="management/*"
                            element={<ManagementRoute />}
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
