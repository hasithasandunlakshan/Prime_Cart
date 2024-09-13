import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:NextRequest,{params}:{params:{searchid:string}}){
    console.log('Query param:', params.searchid);
    
    try{
        const connection=await mysql.createConnection(connectionparams);
      
        const query = 'SELECT * FROM uom.Categories WHERE name like  ?';
        const values = [`%${params.searchid}%`];

        const [result]=await connection.execute(query,values);
        if(result){
        const query = 'SELECT * FROM uom.Subcategories WHERE name like  ?';
        }
        connection.end();
        
        return NextResponse.json(result);


    }
    catch(error){

        return NextResponse.json(error);


    }
}