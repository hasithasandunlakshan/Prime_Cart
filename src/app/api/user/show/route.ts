import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:Request){

    try{
        const connection=await mysql.createConnection(connectionparams);
        let query='';
        query='select * from defaultdb.UserCred';
        let values:any[]=[]
        const [result]=await connection.execute(query,values);
        connection.end();
        return NextResponse.json(result);


    }
    catch(error){

        return NextResponse.json(error);


    }
}