import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "../../../sharedCode/common"; // Adjust the import path as needed

let connectionparams = GetDBSettings();

export async function POST(request:NextRequest) {
    const body = await request.json();

    // Define required fields
    const requiredFields = [
        "address",
        "orderProducts",
        "deliveryMethod",
        "deliveryFee",
        "totalAmount",
        "paymentMethod",

        "estimatedDeliveryDate",
    
    ];

    // Check for missing fields
    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
        }
    }

    // Further validation for specific fields
    if (!body.address.name || !body.address.contactNo) {
        return NextResponse.json({ error: "Address must include name and contact number." }, { status: 400 });
    }

    if (!Array.isArray(body.orderProducts) || body.orderProducts.length === 0) {
        return NextResponse.json({ error: "Order products must be a non-empty array." }, { status: 400 });
    }
    console.log("body:   ", body)

    let connection;

    try {
        connection = await mysql.createConnection(connectionparams);

        const [result] = await connection.query(
            'CALL placeOrderUnregistered(?, ?, ?, ?, ?, ?, ?)',
            [
                JSON.stringify(body.address),
                JSON.stringify(body.orderProducts),
                body.deliveryMethod,
                body.deliveryFee,
                body.totalAmount,
                body.paymentMethod,
                body.estimatedDeliveryDate,
            ]
        );

        return NextResponse.json(result);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
