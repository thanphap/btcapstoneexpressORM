const express = require('express');
const { uploadFile } = require('../../controllers/upload.controllers');
const authorization = require('../../middlewares/authorization');
const upload = require('../../middlewares/upload');

const uploadRouter = express.Router();

uploadRouter.post("/images", authorization, upload.single("file"), uploadFile());
uploadRouter.post("/avatars", authorization, upload.single("file"), uploadFile());

module.exports = uploadRouter;