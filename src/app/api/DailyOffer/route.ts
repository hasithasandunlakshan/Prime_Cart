import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "../../../sharedCode/common"; // Adjust the import path as needed

let connectionparams = GetDBSettings();

export async function GET() {
    let connection;

    try {
        connection = await mysql.createConnection(connectionparams);
       
        const query = 'CALL getDailyOffers()';
        
        const [result] = await connection.execute(query);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Database error:', error); 
        return NextResponse.json({ error: 'Failed to fetch daily offers' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end(); 
        }
    }
}
