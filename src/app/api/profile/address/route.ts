import { NextRequest, NextResponse } from "next/server";
import mysql, { ResultSetHeader } from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function POST(request: NextRequest) {
    let connection;

    try {
        const body = await request.json();
        const {
            name,
            userId,
            addrNo,
            addrStreet,
            addrLine1,
            addrLine2,
            addrTown,
            districtId,
            postalCode,
            contactNo,
            isMainCity
        } = body;

        // Validate required fields
        console.log("Registered User:", body);

        const missingFields = [];

        if (!userId) missingFields.push("userId");
        if (!addrNo) missingFields.push("addrNo");
        if (!addrStreet) missingFields.push("addrStreet");
        if (!addrLine1) missingFields.push("addrLine1");
        if (!addrTown) missingFields.push("addrTown");
        if (!districtId) missingFields.push("districtId");
        if (!postalCode) missingFields.push("postalCode");
        if (!contactNo) missingFields.push("contactNo");
        if (isMainCity === undefined) missingFields.push("isMainCity"); // Check for undefined as it can be false

        if (missingFields.length > 0) {
            return NextResponse.json({ error: 'Missing required fields', missingFields }, { status: 400 });
        }

        connection = await mysql.createConnection(connectionparams);

        const query = `
            INSERT INTO UserAddress (name,userId, addrNo, addrStreet, addrLine1, addrLine2, addrTown, districtId, postalCode, contactNo, isMainCity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

        const [result] = await connection.execute<ResultSetHeader>(query, [
            name,
            userId,
            addrNo,
            addrStreet,
            addrLine1,
            addrLine2,
            addrTown,
            districtId,
            postalCode,
            contactNo,
            isMainCity // Make sure to include isMainCity here
        ]);

        // Check if rows were affected by the insert
        if (result.affectedRows > 0) {
            return NextResponse.json({ message: 'Address added successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to add address' }, { status: 500 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to add user address' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
