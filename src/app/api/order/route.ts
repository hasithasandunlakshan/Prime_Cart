import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common"; // Assuming your DB settings function is defined here

export async function POST(request: Request) {
    const connectionParams = GetDBSettings();

    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();

        // Extract the required parameters from the request body
        const { userId, deliveryMethod, deliveryFee, totalAmount, paymentMethod, estimatedDeliveryDate, addressId } = body;

        // Validate that all required parameters are provided
        if (!userId || !deliveryMethod || !totalAmount || !paymentMethod || !estimatedDeliveryDate || !addressId) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        // Call the `placeOrder` stored procedure with the provided parameters
        const [result] = await connection.execute(
            `CALL defaultdb.placeOrder(?, ?, ?, ?, ?, ?, ?)`,
            [userId, deliveryMethod, deliveryFee, totalAmount, paymentMethod, estimatedDeliveryDate, addressId]
        );

        await connection.end();

        // Return the response
        return NextResponse.json({ message: "Order placed successfully", result });
    } catch (error) {
        console.error('Error calling placeOrder:', error);
        return NextResponse.json({ error: 'Failed to place order', details: error }, { status: 500 });
    }
}
