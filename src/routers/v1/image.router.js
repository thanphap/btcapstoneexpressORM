const express = require('express');
const { getListImage, searchImages, createImage, deleteImage, getImageUser, getImageComments, getImageSaves, imageComment, imageSave, imageUpload, checkImageSave, updateImage } = require('../../controllers/image.controllers');
const authorization = require('../../middlewares/authorization');

const imageRouter = express.Router();

imageRouter.get("", getListImage());
imageRouter.get("/search/:nameImage", searchImages());
imageRouter.post("", authorization, createImage());
imageRouter.put("/:imageId", authorization, updateImage());
imageRouter.delete("/:imageId", authorization, deleteImage());
imageRouter.get("/:imageId", getImageUser());
imageRouter.get("/:imageId/comments", getImageComments());
imageRouter.get("/:imageId/saves", getImageSaves());
imageRouter.get("/:imageId/checksave", authorization, checkImageSave());
imageRouter.post("/:imageId/comment", authorization, imageComment());
imageRouter.post("/:imageId/save", authorization, imageSave());

module.exports = imageRouter;
