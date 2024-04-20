import {
    userLoginService, getAllUserService, getUserByIdService,
    createNewUserService, deleteUserByIdService, editUserByIdService,
    getAllCodeService
} from "../services/user.service";

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing required fields',
        });
    }
    // Call service
    const userData = await userLoginService(email, password);
    // Check status to login success
    if (userData.status === 200) {
        return res.status(userData.status).json({
            errCode: userData.status,
            message: userData.message,
            user: userData.user
        });
    }
    return res.status(userData.status).json({
        errCode: userData.status,
        message: userData.message,
    });
}

const handleGetAllUsers = async (req, res) => {
    const listUser = await getAllUserService();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: listUser
    });
}
const handleGetUserById = async (req, res) => {
    const user = await getUserByIdService(req.query.id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user: user
    });
}
const handleCreateNewUser = async (req, res) => {
    const user = await createNewUserService(req.body);
    return res.status(user.status).json({
        errCode: user.status,
        message: user.msg
    });
}

const handleDeleteUserById = async (req, res) => {
    const userDelete = await deleteUserByIdService(req.params.id);
    return res.status(userDelete.status).json({
        errCode: userDelete.status,
        message: userDelete.msg,
    });
}

const handleEditUserById = async (req, res) => {
    const userEdit = await editUserByIdService(req.params.id, req.body);
    return res.status(userEdit.status).json({
        errCode: userEdit.status,
        message: userEdit.msg,
    });

}
const getAllCode = async (req, res) => {
    const typeInput = req.query.type;
    if (!typeInput) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing required fields',
        });
    }
    const data = await getAllCodeService(typeInput);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data: data
    });
}
module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleGetUserById,
    handleCreateNewUser,
    handleEditUserById,
    handleDeleteUserById,
    getAllCode
}