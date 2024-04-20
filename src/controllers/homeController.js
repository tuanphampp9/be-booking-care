import { raw } from 'body-parser';
import { createNewUser, getAllUser } from '../services/CRUD.service';
const getHomePage = async (req, res) => {
    return res.render('homepage.ejs');

}
const getCRUD = async (req, res) => {
    const data = await getAllUser();
    console.log(data);
    return res.render('crud.ejs');
}

const postCRUD = async (req, res) => {
    await createNewUser(req.body);
    return res.send('postCRUD');
}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD
}