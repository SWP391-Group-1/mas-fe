import { defaultInstance, loadToken } from '../apis/axiosClient'

const createSubject = (data) => {
    loadToken()
    return defaultInstance.post('/subjects', data)
}

const updateSubject = (id, data) => {
    loadToken()
    return defaultInstance.put(`/subjects/${id}`, data)
}

const getSubjectById = (id) => {
    loadToken()
    return defaultInstance.get(`/subjects/${id}`)
}

const deleteSubject = (id) => {
    loadToken()
    return defaultInstance.delete(`/subjects/${id}`)
}

const getAllSubject = (searchString, majorId) => {
    loadToken()
    if(searchString == null) {
        searchString = ''
    }
    if(majorId == null) {
        majorId =''
    }
    return defaultInstance.get(
        `/subjects?SearchString=${searchString}&MajorId=${majorId}&IsActive=true&PageSize=10000`
    )
}
export const subjectApi = {
    createSubject,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getAllSubject,
}
