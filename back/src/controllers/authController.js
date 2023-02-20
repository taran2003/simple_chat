const authServices = require("../services/authServices");
const userServices = require('../services/userServices');
const userRepositories = require('../repositories/userRepositories')

const login = async (req, res, next) => {
    const {login, password} = req.body;
    try {
        const data = await authServices.login({login, password});
        res.send(data);
    } catch (e) {
        next (e);
    }
};

const register = async (req, res, next) => {
    const {login, password, email} = req.body;
    try {
       await authServices.register({login, password, email})
    } catch (e) {
        next(e);
        return;
    }
    res.status(200).send();
};

const refresh = (req, res) => {
    try {
        const {refreshToken} = req.body;
        res.send(authServices.refreshToken({refreshToken}));
    } catch (e) {
        throw e;
    }
};

module.exports = {
    login,
    register,
    refresh
}