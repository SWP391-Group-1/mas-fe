import { defaultInstance, loadToken } from '../apis/axiosClient'

const getAllUser = (searchString) => {
    loadToken()
    if(searchString == null) {
        searchString = ""
    }
    return defaultInstance.get(`/users?Name=${searchString}&IsNew=${true}&PageSize=10000`)
}

const getAccountById = (accountId) => {
    loadToken()
    return defaultInstance.get(`/users/${accountId}`)
}

const updateStatusById = (account, data) => {
    loadToken()
    return defaultInstance.put(`/users/active/${account.id}`, data)
}
export const UserApi = {
    getAllUser, getAccountById, updateStatusById
}
