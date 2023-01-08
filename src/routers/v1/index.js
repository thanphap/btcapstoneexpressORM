const express = require('express');
const userRouter = require('./user.router');
const imageRouter = require('./image.router');
const authRouter = require('./auth.router');
const uploadRouter = require('./upload.router');

const v1 = express.Router();
v1.use('/users', userRouter);
v1.use('/images', imageRouter);
v1.use('/auth', authRouter);
v1.use('/upload', uploadRouter);

module.exports = v1;