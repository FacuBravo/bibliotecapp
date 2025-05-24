import { useDispatch, useSelector } from 'react-redux'
import { onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
    const dispatch = useDispatch()
    const { status, user, errorMessage } = useSelector((state) => state.auth)

    const startLogin = async ({ username, password }) => {
        dispatch(onChecking())

        const res = await window.sessionApi.login({ username, password })

        if (res.ok) {
            localStorage.setItem('sessionToken', res.sessionToken)
            dispatch(onLogin({ username, sessionToken: res.sessionToken }))
            return true
        }

        dispatch(onLogout(res.msg))

        return false
    }

    const startRegister = async ({ username, password }) => {
        dispatch(onChecking())

        const res = await window.sessionApi.register({ username, password })

        if (res.ok) {
            localStorage.setItem('sessionToken', res.sessionToken)
            dispatch(onLogin({ username, sessionToken: res.sessionToken }))
            return true
        }

        dispatch(onLogout(res.msg))

        return false
    }

    const startLogout = async () => {
        dispatch(onChecking())

        localStorage.removeItem('sessionToken')

        await window.sessionApi.logout()
        dispatch(onLogout())
    }

    const checkAuthToken = async () => {
        const sessionToken = localStorage.getItem('sessionToken')

        if (!sessionToken) return dispatch(onLogout())

        const res = await window.sessionApi.checkSessionToken({ sessionToken })

        if (res.ok) {
            dispatch(onLogin({ username: res.username, sessionToken }))
        } else {
            localStorage.removeItem('sessionToken')
            dispatch(onLogout())
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken
    }
}
