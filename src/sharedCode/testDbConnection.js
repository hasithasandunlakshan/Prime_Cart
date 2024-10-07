import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

const connectionParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };
  
export default async function handler(req, res) {
    try {
        const connection = await mysql.createConnection(connectionParams);
        await connection.end();
        res.status(200).json({ message: "Database connection successful" });
    } catch (error) {
        console.error('Database connection error: ', error);
        res.status(500).json({ error: "Database connection failed" });
    }
}
