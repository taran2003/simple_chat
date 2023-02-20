const {createToken, verifyToken} = require("../helper/jwt");
// const {AccessError} = require("../errors/authErrors");
const userRepositories = require('../repositories/userRepositories');
const argon2 = require("argon2");

const accessTokenKey = process.env.JWT_ACCESS_KEY;

const rewriteUser = async ({id, accessToken, login, password, firstName, lastName}) => {
    try {
        await checkAccess({id, accessToken});
        const tokenId = verifyToken(accessToken, accessTokenKey);
        const user = await userRepositories.getById({id: tokenId.id});
        const updatedUser = {
            login: user.login,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        }
        if (login) {
            updatedUser.login = login;
        }
        if (password) {
            updatedUser.password = await argon2.hash(password);
        }
        if (firstName) {
            updatedUser.firstName = firstName;
        }
        if (lastName) {
            updatedUser.lastName = lastName;
        }
        await userRepositories.update({user, updatedUser});
    } catch (e) {
        throw e;
    }

}

const deleteUser = async ({id, login, accessToken}) => {
    try {
        await checkAccess({id, accessToken});
        await userRepositories.deleteUser(login)
    } catch (e) {
        throw e;
    }
}

const checkAccess = async ({id, accessToken}) => {
    const tokenId = verifyToken(accessToken, accessTokenKey);
    const userById = await userRepositories.getById({id: tokenId.id});
    if (userById.id !== id) {
        throw new AccessError();
    }
}

const getUser = async ({login}) => {
    try {
        return await userRepositories.getByLogin({login});
    } catch (e) {
        throw e;
    }
}

module.exports = {
    rewriteUser,
    deleteUser,
    getUser
};