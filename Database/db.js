import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '0321',
    database: process.env.DB_DATABASE || 'assign3',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
});

export default pool;