import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:Request){

    try{
        const connection=await mysql.createConnection(connectionparams);
        let query='';
        query=`SELECT DISTINCT 
    p.*, 
    SKU.*, 
    MIN(pi.imageUrl) AS imageUrl -- Fetch the first image for each product
FROM 
    Product p
JOIN 
    SKU ON p.baseSKU = SKU.sku
JOIN 
    ProductImages pi ON p.productID = pi.productID
GROUP BY 
    p.productID, SKU.sku   ORDER BY p.productId desc;`;
        let values:any[]=[]
        const [result]=await connection.execute(query,values);
        connection.end();
        return NextResponse.json(result);


    }
    catch(error){

        return NextResponse.json(error);


    }
}