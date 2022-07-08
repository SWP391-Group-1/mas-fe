const { loadToken, defaultInstance } = require('./axiosClient')

const getAllUnapprovedRating = () => {
    loadToken()
    return defaultInstance.get('/ratings?PageSize=10000')
}

const getRatingById = (ratingId) => {
    loadToken()
    return defaultInstance.get(`/ratings/${ratingId}`)
}

const processRating = (ratingId, decision) => {
    loadToken()
    return defaultInstance.put(`/ratings/process/${ratingId}`, decision)
}

export const ratingApi = {
    getAllUnapprovedRating,
    processRating,
    getRatingById
}
