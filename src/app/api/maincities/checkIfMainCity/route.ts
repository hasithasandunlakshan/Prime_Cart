// Import dependencies
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

// Set up the database connection parameters
const connectionParams = GetDBSettings();

export async function POST(request: Request) {
    try {
        // Get the city name from the request body
        const { cityName } = await request.json();

        // Create a MySQL connection
        const connection = await mysql.createConnection(connectionParams);

        // Call the stored procedure to check if the city is a main city
        const [rows] = await connection.execute<any[]>(
            `CALL defaultdb.CheckIfMainCity(?)`, 
            [cityName]
        );
        await connection.end();

        // Retrieve the result from the stored procedure
        const isMainCity = rows[0]?.[0]?.isMainCity;

        // Return the result in JSON format
        return NextResponse.json({ cityName, isMainCity });
    } catch (error) {
        console.error("Error checking if city is a main city:", error);
        return NextResponse.json({ error: "An error occurred while checking the city." }, { status: 500 });
    }
}
