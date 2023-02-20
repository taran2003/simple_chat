const {createToken,verifyToken} = require("../helper/jwt");
const userRepositories = require("../repositories/userRepositories");
const argon2 = require('argon2');
// const error = require("../errors/authErrors")
const {PrismaClientKnownRequestError} = require("@prisma/client/runtime");
// require('dotenv').config();

const refreshTokenKey = process.env.JWT_REFRESH_KEY;
const accessTokenKey = process.env.JWT_ACCESS_KEY;
const accessTokenTTL = process.env.JWT_TTL_ACCESS;
const refreshTokenTTL = process.env.JWT_TTL_REFRESH;

const parser = ({accessToken, refreshToken}) => {
    const parsToken = verifyToken(accessToken, accessTokenKey);
    return parsToken;
}

const login = async ({login, password}) => {
    try {
        const user = await userRepositories.getByLogin({login});
        if (!user) {
            throw new error.UserNotFoundError();
        }
        if (!await argon2.verify(user.password, password)) {
            throw new error.InvalidPasswordError()
        }
        data = createTokens({id: user.id});
        data = {
            ...data,
            user
        };
        return data
    } catch (e) {
        throw e
    }
}

const createTokens = ({id}) => {
    const accessToken = createToken({id}, accessTokenKey, {expiresIn: accessTokenTTL});
    const refreshToken = createToken({id}, refreshTokenKey, {expiresIn: refreshTokenTTL});
    return ({accessToken, refreshToken});
}

const register = async ({login, password, email}) => {
    try {
        const hashPassword = await argon2.hash(password)
        const result = await userRepositories.write({login, password:hashPassword, email});
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError || e.code == "P2002") {
            throw new error.InvalidLoginError();
        } else {
            throw e;
        }
    }
}

const refreshToken = ({accessToken,refreshToken}) => {
    try {
        const {id} = verifyToken(refreshToken,refreshTokenKey);
        return createTokens({id});
    } catch (e){
        throw e;
    }
}

module.exports = {
    parser,
    login,
    register,
    refreshToken
}