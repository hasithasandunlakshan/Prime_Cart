import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(request:Request) {
    const connectionParams = GetDBSettings();
    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();

        const { userId,sku,quantity } = body;
       
        console.log("body",body)

        // Insert into UserCred table (userId will be auto-incremented)
        const [userCredResult] = await connection.execute(
            `INSERT INTO Cart (userId, sku, quantity)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);`,
            [userId,sku,quantity]
        );

        // Get the generated userId from UserCred
      

        // Insert into RegisteredUser table using the auto-generated userId
     
        await connection.end();

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
}
