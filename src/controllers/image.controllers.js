const { response } = require('../helpers/response');
const imageService = require('../servicers/image.service');

const getListImage = () => {
    return async (req, res, next) => {
        try {
            const listImage = await imageService.getListImage();
            res.status(200).json(response(listImage));
        } catch (error) {
            next(error);
        }
    };
};

const searchImages = () => {
    return async (req, res, next) => {
        try {
            const { nameImage } = req.params;
            const searchImages = await imageService.searchImages(nameImage)
            res.status(200).json(response(searchImages));
        } catch (error) {
            next(error);
        }
    };
};

const createImage = () => {
    return async (req, res, next) => {
        try {
            const userId = res.locals.user.userId;
            let image = req.body;
            image = { ...image, userId: userId };
            const createImage = await imageService.createImage(image);
            res.status(200).json(response(createImage));
        } catch (error) {
            next(error);
        }
    };
};

const updateImage = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const userId = res.locals.user.userId;
            let data = req.body;
            data = { ...data, userId: userId };
            const updateImage = await imageService.updateImage(imageId, data);
            res.status(200).json(response(updateImage));
        } catch (error) {
            next(error);
        }
    };
};

const deleteImage = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const userId = res.locals.user.userId;
            const deleteImage = await imageService.deleteImage(imageId, userId);
            res.status(200).json(response(deleteImage));
        } catch (error) {
            next(error);
        }
    };
};

const getImageUser = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const imageUser = await imageService.getImageUser(imageId);
            res.status(200).json(response(imageUser));
        } catch (error) {
            next(error);
        }
    };
};

const getImageComments = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const imageComments = await imageService.getImageComments(imageId);
            res.status(200).json(response(imageComments));
        } catch (error) {
            next(error);
        }
    };
};

const getImageSaves = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const imageSaves = await imageService.getImageSaves(imageId);
            res.status(200).json(response(imageSaves));
        } catch (error) {
            next(error);
        }
    };
};

const checkImageSave = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const userId = res.locals.user.userId;
            const imageSave = await imageService.checkImageSave(imageId, userId);
            res.status(200).json(response(imageSave));
        } catch (error) {
            next(error);
        }
    };
};

const imageSave = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const userId = res.locals.user.userId;
            const imageSave = await imageService.imageSave(imageId, userId)
            res.status(200).json(response(imageSave));
        } catch (error) {
            next(error);
        }
    };
};

const imageComment = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const userId = res.locals.user.userId;
            const comment = req.body;
            const createComment = await imageService.imageComment(imageId, userId, comment)
            res.status(200).json(response(createComment));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getListImage,
    searchImages,
    createImage,
    updateImage,
    deleteImage,
    getImageUser,
    getImageSaves,
    checkImageSave,
    getImageComments,
    imageComment,
    imageSave,
}