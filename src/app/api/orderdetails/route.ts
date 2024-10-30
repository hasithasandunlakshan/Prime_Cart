import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams = GetDBSettings();
export async function GET(request: NextRequest) {
  const orderId = Number(request.nextUrl.searchParams.get("orderId"));
  
  try {
    const connection = await mysql.createConnection(connectionparams);

    const [result] = await connection.execute("CALL getOrder(?)", [orderId]);
    connection.end();

    return NextResponse.json(result[0][0]);
  } catch (error) {
    return NextResponse.json(error);
  }
}