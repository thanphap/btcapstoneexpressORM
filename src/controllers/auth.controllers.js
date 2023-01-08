
const { response } = require('../helpers/response');
const authService = require('../servicers/auth.service');

const login = () =>{
    return async (req, res, next) => {
        try {
            const credentials = req.body;
            const user = await authService.login(credentials);
            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    };
};

const register = () => {
    return async (req, res, next) => {
        try {
            let data = req.body;
            data = {...data, role:'user'};
            const createUser = await authService.register(data);
            res.status(200).json(response(createUser));
        } catch (error) {
            next(error);
        }
    };
};

const getProfile = () => {
    return async (req, res, next) => { 
        try {
            const { user } = res.locals;
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
     };
};

module.exports = {
    login,
    register,
    getProfile,
}