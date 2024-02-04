import express from 'express'
import cors from 'cors'
import FormRouter from './Routes/FormRoutes.js'
import UserRouter from './Routes/UserRoutes.js'
import mysql from 'mysql2'
import dotenv from 'dotenv'
 
dotenv.config()

const app = new express()
app.use(cors()) 
app.use(express.json())

app.use('/form', FormRouter)
app.use('/', UserRouter)

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '0321',
    database: process.env.DB_DATABASE || 'assign3',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.listen(process.env.PORT, () => {
    console.log('Server running on port 5000')
})