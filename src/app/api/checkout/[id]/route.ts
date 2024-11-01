import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "../../../../sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    let connection;
    const userId = decodeURIComponent(params.id);
    console.log('Query param:', userId);

    try {
        connection = await mysql.createConnection(connectionparams);

        // Call the stored procedure
        const [result] = await connection.execute('CALL GetUserAddress(?)', [userId]);

        // Extract the main result set (first element of `result`)
        return NextResponse.json(result[0]);
        
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch user credentials' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
