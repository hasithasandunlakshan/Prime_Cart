import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest, { params }: { params: { searchid: string } }) {
    let connection;

    try {
        console.log('Query param:', params.searchid);
        
        connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure with the search parameter
        const [result] = await connection.execute('CALL GetProductsByTitle(?)', [params.searchid]);

        return NextResponse.json(result[0]); // Access the first result set
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch product data' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
