import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(request: Request) {
    const connectionParams = GetDBSettings();

    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();

        const { userId, sku, quantity } = body;
       
        console.log("Request body:", body);

        // Call the stored procedure
        await connection.execute(
            `CALL AddToCart(?, ?, ?)`,
            [userId, sku, quantity]
        );

        await connection.end();

        return NextResponse.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
