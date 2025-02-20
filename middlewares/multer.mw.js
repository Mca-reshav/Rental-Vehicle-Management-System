const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
})

module.exports = upload;