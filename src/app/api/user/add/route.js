import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(request) {
    const connectionParams = GetDBSettings();
    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();
console.log("data",body)
        const { firstName, lastName, email, password } = body;

        // Call the stored procedure and retrieve the result
        const [rows] = await connection.execute(
            `CALL registerUser(?, ?, ?, ?)`,
            [email, password, firstName, lastName]
        );

        await connection.end();

        console.log("rows",rows)
        

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
