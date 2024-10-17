import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:NextRequest,{params}:{params:{id:string}}){
   
   
    
    try{
        const connection=await mysql.createConnection(connectionparams);
        let query1='';
        let query2='';
        let query3='';
        query1='SELECT * FROM Product p JOIN SKU ON p.baseSKU = SKU.sku JOIN ProductImages pi ON p.productID = pi.productID WHERE p.productID = ? Limit 1;';
        query2='select * from ProductImages where productId = ?';
        query3='select * from SKU where productID = ?';
        let values=[params.id]
        const [result]=await connection.execute(query1,values);
      
        const [images]=await connection.execute(query2,values);
        const [sku]=await connection.execute(query3,values);
        

        console.log("results1",result);

        const details={
            result:result,
            sku:sku,
            images:images
        }
        console.log("results1",details);
        connection.end();
        return NextResponse.json(details);
        
        


    }
    catch(error){

        return NextResponse.json(error);


    }
}