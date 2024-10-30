import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: Request) {
    let connection;
    try {
        // Establish MySQL connection
        connection = await mysql.createConnection(connectionparams);

        // Call the stored procedure
        const [result] = await connection.execute<any[]>(`CALL GetAllProducts`);

        await connection.end();

        // Return the result as JSON
        return NextResponse.json(result[0]); // Use result[0] to access data rows from procedure call
    } catch (error) {
        console.error("Error executing stored procedure:", error);
        return NextResponse.json({ error: "An error occurred while retrieving data." }, { status: 500 });
    } finally {
        if (connection) await connection.end();
    }
}
