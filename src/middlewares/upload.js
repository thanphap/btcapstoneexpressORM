const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./static${req.path}/`);
    },
    filename: (req, file, cb) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${prefix}-${file.originalname}`);
    },
});

const upload = multer({ storage });
module.exports = upload;