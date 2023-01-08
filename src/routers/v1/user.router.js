const express = require('express');
const { getUser, createUser, updateUser, deleteUser, getUserCreateImages, getUserSaveImages } = require('../../controllers/user.controllers');
const authorization = require('../../middlewares/authorization');
const requiredRole = require('../../middlewares/requiredRole');

const userRouter = express.Router();

userRouter.get('/images', authorization, getUserCreateImages());
userRouter.get('/saves', authorization, getUserSaveImages());
userRouter.get("/:userId", authorization, getUser());
userRouter.post("", authorization, requiredRole('admin'), createUser());
userRouter.put("", authorization, updateUser());
userRouter.delete("/:userId", authorization, requiredRole('admin'), deleteUser());


module.exports = userRouter;