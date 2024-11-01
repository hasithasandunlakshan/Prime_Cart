import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

const connectionParams = GetDBSettings();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  let connection;

  try {
    connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure with the userId parameter
    const [result] = await connection.execute('CALL GetUserAddressWithUserInfo(?)', [params.id]);

    return NextResponse.json(result[0]); // Access the first set of results returned by the stored procedure
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch user credentials' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
