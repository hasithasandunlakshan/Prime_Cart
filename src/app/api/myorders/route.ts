import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";

export async function GET(request: NextRequest) {
  const connectionParams = GetDBSettings();

  const userId = request.nextUrl.searchParams.get("userId");
  const status = request.nextUrl.searchParams.get("status");
  if (!userId || !status) {
    return NextResponse.json({ message: "Please provide userId and status" }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection(connectionParams);

    const [orders] = await connection.execute("CALL getMyOrders(?, ?)", [
      userId,
      status,
    ]);

    await connection.end();

    return NextResponse.json({ orders: orders[0] });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
