import Cookies from 'js-cookie'

export function clearLocalData() {
    localStorage.clear()
    sessionStorage.clear()
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
}

export function clearLocalDataExceptToken() {
    localStorage.clear()
    sessionStorage.clear()
}
