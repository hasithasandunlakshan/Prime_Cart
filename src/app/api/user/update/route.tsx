import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    try {
        // Establish a connection to the database
        const connection = await mysql.createConnection(connectionParams);

        // Parse the JSON body from the request
        const body = await request.json();

        // Extract data from the body
        const { name,email,password } = body;

        // Insert the data into your database
        const [result] = await connection.execute(
            'INSERT INTO uom.users (name,email,password) VALUES (?,?, ?)', 
            [name,email,password]
        );

        // Close the database connection
        await connection.end();

        // Return a success response
        return NextResponse.json({ message: "Data inserted successfully", result });
    
    } catch (err) {
        console.log('ERROR: API - ', err as Error);

        const response = { error: (err as Error).message };
        
        return NextResponse.json(response, { status: 500 });
    }
}
