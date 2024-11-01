import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    let connection;

    try {
        const keyword = decodeURIComponent(params.id);
        console.log('Query param:', keyword);
        
        connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure with the keyword parameter
        const [result] = await connection.execute('CALL GetProductsWithImagesAndCategories(?)', [keyword]);

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
