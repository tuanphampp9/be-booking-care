import express from 'express';
import { getHomePage, getCRUD, postCRUD } from '../controllers/homeController';
import {
    handleLogin, handleGetAllUsers, handleGetUserById,
    handleCreateNewUser, handleEditUserById, handleDeleteUserById, getAllCode
} from '../controllers/userController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', getHomePage);
    router.get('/crud', getCRUD);
    router.post('/post-crud', postCRUD);
    router.post('/api/login', handleLogin)
    router.get('/api/get-all-users', handleGetAllUsers)
    router.get('/api/get-user', handleGetUserById)
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/edit-user/:id', handleEditUserById)
    router.delete('/api/delete-user/:id', handleDeleteUserById)
    router.get('/api/get-all-code', getAllCode)
    return app.use('/', router);
}

module.exports = initWebRoutes;