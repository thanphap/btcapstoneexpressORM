const express = require('express');
const { login, getProfile, register } = require('../../controllers/auth.controllers');
const authorization = require('../../middlewares/authorization');

const authRouter = express.Router();

authRouter.post("/login", login());
authRouter.post("/register", register());
authRouter.get('/profile', authorization, getProfile());

module.exports = authRouter;
