import { defaultInstance, loadToken } from '../apis/axiosClient'

const createAdminAccount = (data) => {
    loadToken()
    return defaultInstance.post(`/accounts/register-admin`, data)
}

const getUserInformation = (id) => {
    loadToken()
    return defaultInstance.get(`/users/${id}`)
}

const getMentorSubjects = (id) => {
    loadToken()
    return defaultInstance.get(`/mentor-subjects/${id}`)
}

const processMentorStatus =(id, data) => {
    loadToken()
    return defaultInstance.put(`/users/accept-request?userId=${id}`, data)
}

export const AccountApi = {
    createAdminAccount,
    getUserInformation,
    getMentorSubjects,
    processMentorStatus
}
