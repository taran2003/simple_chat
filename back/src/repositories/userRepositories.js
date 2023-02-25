const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getByLogin = async ({ login }) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                login
            }
        });
        return user;
    } catch (error) {
        throw (error);
    }
}

const getById = async ({ id }) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user;
}

const write = async ({ login, password, email }) => {
    let user = {
        login: login,
        password: password,
        email: email
    };
    try {
        const createUser = await prisma.user.create({ data: user });
    } catch (e) {
        throw e;
    }
}

const deleteUser = async (login) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                login
            },
        });
    } catch (error) {
        throw error;
    }
}

const update = async ({ user, updatedUser }) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                login: user.login
            },
            data: {
                login: updatedUser.login,
                password: updatedUser.password,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
            }
        });
    } catch (error) {
        throw error;
    }
}

const disconnect = async () => {
    await prisma.$disconnect();
}

module.exports = {
    write,
    getByLogin,
    getById,
    update,
    disconnect,
    deleteUser
}