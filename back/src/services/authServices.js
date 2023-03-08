const {createToken,verifyToken} = require("../helper/jwt");
const userRepositories = require("../repositories/userRepository");
const argon2 = require('argon2');
// const error = require("../errors/authErrors")
const {PrismaClientKnownRequestError} = require("@prisma/client/runtime");
// require('dotenv').config();

const refreshTokenKey = process.env.JWT_REFRESH_KEY;
const accessTokenKey = process.env.JWT_ACCESS_KEY;
const accessTokenTTL = process.env.JWT_TTL_ACCESS;
const refreshTokenTTL = process.env.JWT_TTL_REFRESH;

const parser = ({accessToken, refreshToken}) => {
    return verifyToken(accessToken, accessTokenKey);
}

const createTokens = (data) => {
    const accessToken = createToken(data, accessTokenKey, {expiresIn: accessTokenTTL});
    const refreshToken = createToken(data, refreshTokenKey, {expiresIn: refreshTokenTTL});
    return ({accessToken, refreshToken});
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
        data = createTokens({id: user.id, login: user.login});
        data = {
            ...data,
            user
        };
        return data
    } catch (e) {
        throw e
    }
}

const register = async ({login, password, email}) => {
    try {
        const hashPassword = await argon2.hash(password)
        const user = await userRepositories.write({ login, email, password: hashPassword });
        return { user, ...createTokens(user) };
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
        const {id, login} = verifyToken(refreshToken,refreshTokenKey);
        return createTokens({id, login});
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