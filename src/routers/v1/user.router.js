const express = require('express');
const { getUser, createUser, updateUser, deleteUser, getUserCreateImages, getUserSaveImages, updateUserAdmin, getListUser } = require('../../controllers/user.controllers');
const authorization = require('../../middlewares/authorization');
const requiredRole = require('../../middlewares/requiredRole');

const userRouter = express.Router();

userRouter.get('', authorization, requiredRole('admin'), getListUser());
userRouter.get('/images', authorization, getUserCreateImages());
userRouter.get('/saves', authorization, getUserSaveImages());
userRouter.get('/:userId', getUser());
userRouter.post('', authorization, requiredRole('admin'), createUser());
userRouter.put('', authorization, updateUser());
userRouter.put('/:userId', authorization, requiredRole('admin'), updateUserAdmin());
userRouter.delete('/:userId', authorization, requiredRole('admin'), deleteUser());


module.exports = userRouter;