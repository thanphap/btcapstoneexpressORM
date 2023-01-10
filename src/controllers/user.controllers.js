const { response } = require('../helpers/response');
const userService = require('../servicers/user.service');

const getUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId);
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    };
};

const getListUser = () => {
    return async (req, res, next) => {
        try {
            const users = await userService.getListUser();
            res.status(200).json(response(users));
        } catch (error) {
            next(error);
        }
    };
};

const createUser = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const createUser = await userService.createUser(data);
            res.status(200).json(response(createUser));
        } catch (error) {
            next(error);
        }
    };
};

const updateUser = () => {
    return async (req, res, next) => {
        try {
            let user = req.body;
            const { userId } = res.locals.user;
            user = { ...user, role: "user" };
            const updateUser = await userService.updateUser(userId, user);
            res.status(200).json(response(updateUser));
        } catch (error) {
            next(error);
        }
    };
};

const updateUserAdmin = () => {
    return async (req, res, next) => {
        try {
            const user = req.body;
            const { userId } = req.params;
            const updateUser = await userService.updateUser(userId, user);
            res.status(200).json(response(updateUser));
        } catch (error) {
            next(error);
        }
    };
};

const deleteUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const deleteUser = await userService.deleteUser(userId);
            res.status(200).json(response(deleteUser));
        } catch (error) {
            next(error);
        }
    };
};

const getUserCreateImages = () => {
    return async (req, res, next) => {
        try {
            const userId = res.locals.user.userId;
            const userImages = await userService.getUserImages(userId);
            res.status(200).json(response(userImages));
        } catch (error) {
            next(error);
        }
    };
};

const getUserSaveImages = () => {
    return async (req, res, next) => {
        try {
            const userId = res.locals.user.userId;
            const userSave = await userService.getUserSaves(userId);
            res.status(200).json(response(userSave));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getUser,
    getListUser,
    createUser,
    updateUser,
    updateUserAdmin,
    deleteUser,
    getUserCreateImages,
    getUserSaveImages,
}