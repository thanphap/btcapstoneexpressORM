const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { User } = require("../models");


const getUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw error;
    }
};


const createUser = async (data) => {
    try {
        const valid = await User.findOne({
            where: {
                email: data.email,
            },
        });
        if (valid) {
            throw new AppError(400, "Email is existed");
        }

        if (!data.password) {
            throw new AppError(400, "Please enter a password");
        }

        const createUser = await User.create(data);
        return createUser;

    } catch (error) {
        throw error
    }
};

const updateUser = async (userId, data) => {
    try {
        const valid = await User.findByPk(userId);
        if (!valid) {
            throw new AppError(400, 'User not found');
        }
        const validEmail = await User.findOne({
            where: {
                userId: { [Op.ne]: userId },
                email: data.email,
            },
        });
        if (validEmail) {
            throw new AppError(400, "Email is existed");
        }
        const updateUser = await User.update(data, { where: { userId: valid.userId } });
        return await User.findByPk(valid.userId);

    } catch (error) {
        throw error
    }
}

const deleteUser = async (userId) => {
    try {
        const valid = await User.findByPk(userId);
        if (!valid) {
            throw new AppError(400, 'User not found');
        }
        await User.destroy({ where: { userId: userId } });
        return "Delete user success";
    } catch (error) {
        throw error
    }
};

const getUserImages = async (userId) => {
    try {
        const userImages = await User.findByPk(userId, {
            include: {
                association: "imageCreates",
                attributes: {
                    exclude: ["userId"],
                }
            }
        });
        return userImages;
    } catch (error) {
        throw error;
    }
};

const getUserSaves = async (userId) => {
    try {
        const valid = await User.findByPk(userId);
        if (!valid) {
            throw new AppError(400, 'User not found');
        }
        const userSave = await User.findByPk(userId, {
            include: {
                association: "imageSaves",
                attributes: {
                    exclude: ["userId"],
                },
                through: {
                    attributes: [],
                },
            }
        });
        return userSave;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserImages,
    getUserSaves,
}




