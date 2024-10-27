import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
    const { userId, deliveryMethod, totalAmount, paymentMethod, estimatedDeliveryDate, addressId, deliveryFee } = await request.json();

    // Log incoming parameters for debugging
    console.log("Incoming Order Data:", { userId, deliveryMethod, totalAmount, paymentMethod, estimatedDeliveryDate, addressId, deliveryFee });

    try {
        const connection = await mysql.createConnection(connectionParams);
        const query = `INSERT INTO Orders (userId, deliveryMethod, totalAmount, paymentMethod, estimatedDeliveryDate, addressId, deliveryFee) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [userId, deliveryMethod, totalAmount, paymentMethod, estimatedDeliveryDate, addressId, deliveryFee];

        // Execute the query and ensure result follows expected structure
        const [result] = await connection.execute<mysql.OkPacket>(query, values);
        await connection.end();

        // Validate that the result includes `insertId` as expected
        if (result && 'insertId' in result) {
            console.log("Order placed successfully with ID:", result.insertId);
            return NextResponse.json({ message: "Order placed successfully", orderId: result.insertId });
        } else {
            console.error("Unexpected query result:", result);
            return NextResponse.json({ message: "Order placed but could not retrieve order ID." });
        }
    } catch (error) {
        // Enhanced error logging with stack trace for better debugging
        console.error("Error placing order:", error instanceof Error ? error.stack : error);

        // Display the error in the response
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: "Error placing order", error: errorMessage });
    }
}
