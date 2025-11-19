import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


import dbConnection from './config/db-connection.js';
import adminRouter from './routes/admin-router.js';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");

app.use("/admin",adminRouter)
app.use("/user",usersRouter)
app.use("/products",productsRouter)


app.listen(PORT ,() =>{
    console.log(`Server is running on ${PORT} Port`)
})
