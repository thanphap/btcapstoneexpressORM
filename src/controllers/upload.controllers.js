const config = require('../config');
const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const uploadFile = () => {
    return (req, res, next) => {
        const file = req.file;
        if (!file) {
            next(new AppError(400, "Please upload a file"));
        }
        file.path = file.path.replace(/\\/g, "/");
        const url = `${req.protocol}://${req.hostname}:${config.PORT}/${file.path}`;
        res.status(200).json(response(url));
    };
};

module.exports ={
    uploadFile,
}