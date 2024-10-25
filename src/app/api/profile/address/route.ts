import { NextRequest, NextResponse } from "next/server";
import mysql, { ResultSetHeader } from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function POST(request: NextRequest) {
    let connection;

    try {
        const body = await request.json();
        const {
            userId,
            addrNo,
            addrStreet,
            addrLine1,
            addrLine2,
            addrTown,
            addrDistrict,
            addrProvince,
            postalCode,
            contactNo
        } = body;

        // Validate required fields
        if (!userId || !addrNo || !addrStreet || !addrLine1 || !addrTown || !addrDistrict || !addrProvince || !postalCode || !contactNo) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        connection = await mysql.createConnection(connectionparams);

        const query = `
            INSERT INTO UserAddress (userId, addrNo, addrStreet, addrLine1, addrLine2, addrTown, addrDistrict, addrProvince, postalCode, contactNo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await connection.execute<ResultSetHeader>(query, [
            userId,
            addrNo,
            addrStreet,
            addrLine1,
            addrLine2,
            addrTown,
            addrDistrict,
            addrProvince,
            postalCode,
            contactNo
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
