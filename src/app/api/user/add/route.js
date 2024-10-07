import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(request) {
    const connectionParams = GetDBSettings();
    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();

        const { firstName, lastName, email, password, isEmployee, empId } = body;

        // Insert into UserCred table (userId will be auto-incremented)
        const [userCredResult] = await connection.execute(
            `INSERT INTO UserCred (email, password, isEmployee, empId) VALUES (?, ?, ?, ?)`,
            [email, password, isEmployee || false, empId || null]
        );

        // Get the generated userId from UserCred
        const userId = userCredResult.insertId;

        // Insert into RegisteredUser table using the auto-generated userId
        await connection.execute(
            `INSERT INTO RegisteredUser (userId, firstName, lastName) VALUES (?, ?, ?)`,
            [userId, firstName, lastName]
        );

        await connection.end();

        return NextResponse.json({ message: "User created successfully", userId });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
