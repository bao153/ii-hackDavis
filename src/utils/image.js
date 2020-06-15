const multer = require('multer')

const imgUploader = multer({
    limits: {
        fileSize: 5000000 // 5MB limit
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload an image of extension .png,.jpg, or .jpeg.'))
        }
        callback(undefined, true)
    }
})

const getAvatarURL = (id) => {
    // return `${process.env.PROD_BACKEND_URL}/api/users/${id}/image`
    return `${process.env.BACKEND_URL}/api/user/avatar/${id}`
}

const getCertificateURL = (id) => {
    // return `${process.env.PROD_BACKEND_URL}/api/users/${id}/image`
    return `${process.env.BACKEND_URL}/api/interpreter/certificates/${id}`
}

const getEventImageURL = (id) => {
    // return `${process.env.PROD_BACKEND_URL}/api/users/${id}/image`
    return `${process.env.BACKEND_URL}/api/events/${id}`
}


module.exports = {
    imgUploader,
    getAvatarURL,
    getCertificateURL,
    getEventImageURL
}
