import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';
const userLoginService = async (email, password) => {
    const isValidEmail = await checkUserEmail(email);
    let userData = {};
    if (isValidEmail) {
        //check password
        const isMatch = await bcrypt.compare(password, isValidEmail.password);
        if (isMatch) {
            userData = {
                status: 200,
                message: 'Login successful',
                user: {
                    email: isValidEmail.email,
                    roleId: isValidEmail.roleId,
                }
            }
        } else {
            userData = {
                status: 400,
                message: 'Invalid password'
            }
        }
    } else {
        userData = {
            status: 400,
            message: 'Email is not exist in the system'
        }
    }
    return userData;
}

const checkUserEmail = async (email) => {
    return await db.User.findOne({
        where: { email: email },
        attributes: ['email', 'password', 'roleId'],
    });
}

const getAllUserService = async () => {
    return await db.User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
}

const getUserByIdService = async (id) => {
    return await db.User.findOne({
        where: { id: id },
        attributes: {
            exclude: ['password']
        }
    });

}

const createNewUserService = async (data) => {
    try {
        const checkEmailExist = await checkUserEmail(data.email);
        if (checkEmailExist?.email) {
            return {
                status: 400,
                msg: 'Email is exist in the system'
            }
        }
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender == '1' ? 1 : 0,
            roleId: data.roleId,
            phoneNumber: data.phoneNumber,
        });
        return {
            status: 200,
            msg: 'ok'
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const hashUserPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
const deleteUserByIdService = async (id) => {
    const user = await getUserByIdService(id);
    if (!user) {
        return {
            status: 404,
            msg: 'User is not exist'
        }
    }
    await db.User.destroy({
        where: { id: id }
    });
    return {
        status: 200,
        msg: 'ok'
    }
}

const editUserByIdService = async (id, data) => {
    const user = await getUserByIdService(id);
    if (!user) {
        return {
            status: 404,
            msg: 'User is not exist'
        }
    }
    await db.User.update(
        {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender === '1' ? 1 : 0
        }
        , {
            where: { id: id }
        }
    )
    return {
        status: 200,
        msg: 'ok'
    }
}

const getAllCodeService = async (typeInput) => {
    try {
        const roles = await db.Allcode.findAll({
            where: { type: typeInput },
            attributes: ['key', 'value_en', 'value_vi']
        });
        return roles
    } catch (error) {
        console.error(error);
        throw error;
    }

}
module.exports = {
    userLoginService,
    getAllUserService,
    getUserByIdService,
    createNewUserService,
    deleteUserByIdService,
    editUserByIdService,
    getAllCodeService
}