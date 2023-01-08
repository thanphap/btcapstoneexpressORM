const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { Image, User } = require("../models")

const getListImage = () => {
    try {
        const images = Image.findAll();
        return images;
    } catch (error) {
        throw error;
    }
};

const searchImages = async (name) => {
    try {
        let searchImages = await Image.findAll({
            where: {
                imageName: { [Op.like]: "%" + name + "%", }
            }
        });
        return searchImages;
    } catch (error) {
        throw error
    }
};


const createImage = async (data) => {
    try {
        const valid = await User.findByPk(data.userId);
        if (!valid) {
            throw new AppError(400, "User not found");
        }
        const createImage = Image.create(data);
        return createImage;
    } catch (error) {
        throw error;
    }
};

const updateImage = async (imageId, data) => {
    try {
        const { userId } = data;
        const image = await Image.findOne({ where: { imageId, userId } });
        if (!image) {
            throw new AppError(400, "Image not found or no have permission");
        }
        await Image.update(data, { where: { imageId: image.imageId } });
        return await Image.findByPk(image.imageId);
    } catch (error) {
        throw error;
    }
};

const deleteImage = async (imageId, userId) => {
    try {
        const image = await Image.findOne({ where: { imageId, userId } });
        if (!image) {
            throw new AppError(400, "Image not found or no have permission");
        }
        await Image.destroy({ where: { imageId: image.imageId } });
        return "Delete image success";
    } catch (error) {
        throw error
    }
};


const getImageUser = async (imageId) => {
    try {
        const imageUser = await Image.findByPk(imageId, {
            include: [{
                association: "userCreate",
                attributes: {
                    exclude: ["userId", "password", "role"]
                },
            },]
        });
        if (!imageUser) {
            throw new AppError(400, "Image not found");
        }
        return imageUser;
    } catch (error) {
        throw error
    }
};

const getImageComments = async (imageId) => {
    try {
        const imageComments = await Image.findByPk(imageId, {
            include: [{
                association: "userComments",
                attributes: {
                    exclude: ["email", "role", "password"],
                },
                through: {
                    attributes: ["content", "createdComment"],
                },
            }]
        });
        if (!imageComments) {
            throw new AppError(400, "Image not found");
        }
        return imageComments
    } catch (error) {
        throw error;
    }
};

const getImageSaves = async (imageId) => {
    try {
        const image = await Image.findByPk(imageId, {
            include: [
                {
                    association: "userSaves",
                    attributes: {
                        exclude: ["email", "role", "password"],
                    },
                    through: {
                        attributes: [],
                    },
                },

            ]
        })
        if (!image) {
            throw new AppError(400, "Image not found");
        }
        return image;
    } catch (error) {
        throw error;
    }
};

const checkImageSave = async (imageId, userId) => {
    try {
        const image = await Image.findByPk(imageId)
        if (!image) {
            throw new AppError(400, "Image not found");
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, "User not found");
        }
        const hasImageSave = await image.hasUserSave(user.userId);
        return hasImageSave;
    } catch (error) {
        throw error;
    }
};


const imageSave = async (imageId, userId) => {
    try {
        const image = await Image.findByPk(imageId);
        if (!image) {
            throw new AppError(400, "Image not found");
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, "User not found");
        }

        const hasImageSave = await image.hasUserSave(user.userId);
        if (hasImageSave) {
            await image.removeUserSave(user.userId);
            return "The image has been deleted";
        }
        else {
            await image.addUserSave(user.userId);
            return "Image has been saved";
        }
    } catch (error) {
        throw error;
    }
};

const imageComment = async (imageId, userId, data) => {
    try {
        const image = await Image.findByPk(imageId);
        if (!image) {
            throw new AppError(400, "Image not found");
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(400, "User not found");
        }
        // console.log(image.__proto__);
        const hasComment = await image.hasUserComment(user.userId);
        if (hasComment) {
            throw new AppError(400, "Comment is existed");
        }
        else {
            await image.addUserComment(user.userId, { through: { content: data.content } });
            return "Comment success";
        }
    } catch (error) {
        throw error;
    }
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




