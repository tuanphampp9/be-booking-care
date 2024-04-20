import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
const createNewUser = async (data) => {
    try {
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
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const hashUserPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
const getAllUser = async () => {
    return await db.User.findAll({
        raw: true
    });
}
module.exports = {
    createNewUser,
    getAllUser
}