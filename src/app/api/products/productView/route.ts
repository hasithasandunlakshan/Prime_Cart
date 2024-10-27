import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(request:Request) {
    const connectionParams = GetDBSettings();
    try {
        const connection = await mysql.createConnection(connectionParams);
        const body = await request.json();

        const { productId } = body;
       
        console.log("body",body)

        const [rows] = await connection.execute('CALL incrementProductView(?)', [productId]);

       
      

      
     
        await connection.end();

        return NextResponse.json({ message: " successfully" });
    } catch (error) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
}
 