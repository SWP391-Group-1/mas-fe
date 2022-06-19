import { defaultInstance } from '../apis/axiosClient'

const loginAdmin = (email, password) => {
    return defaultInstance.post('/accounts/login-admin', { email, password })
}

const logout = () => {
    localStorage.removeItem('access-token')
}

export const authApis = {
    loginAdmin,
    logout,
}
