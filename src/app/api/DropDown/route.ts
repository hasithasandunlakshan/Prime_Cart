import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:Request){

    try{
        const connection=await mysql.createConnection(connectionparams);
        let query='';
        query=`SELECT c.categoryId, c.title AS categoryTitle, s.subCatId, s.title AS subCategoryTitle
FROM defaultCategory c
LEFT JOIN defaultdb.SubCategory s ON c.categoryId = s.mainCatId
ORDER BY c.categoryId, s.subCatId;
`;
        let values:any[]=[]
        const [result]=await connection.execute(query,values);
        connection.end();
        return NextResponse.json(result);


    }
    catch(error){

        return NextResponse.json(error);


    }
}