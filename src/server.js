import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import cors from 'cors';
import { corsOptionsDelegate } from './config/customCors';
const app = express();

//config dotenv
dotenv.config();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
viewEngine(app);

// Use the custom CORS middleware
app.use(cors(corsOptionsDelegate));

//config router
initWebRoutes(app);

//connect to db
connectDB();

//start app
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});