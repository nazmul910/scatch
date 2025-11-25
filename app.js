import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import expressSession from 'express-session';
import flash from 'connect-flash';


import dbConnection from './config/db-connection.js';

import adminRouter from './routes/admin-router.js';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';

import dotenv from 'dotenv';
import indexRouter from './routes/index-router.js';
dotenv.config();

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
})
);

app.use(flash())


app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");

app.use("/",indexRouter)
app.use("/admin",adminRouter)
app.use("/user",usersRouter)
app.use("/products",productsRouter)


app.listen(PORT ,() =>{
    console.log(`Server is running on ${PORT} Port`)
})
