import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    const keyword=decodeURIComponent(params.id)
    console.log('Query param:', keyword);
    
    try{
        const connection=await mysql.createConnection(connectionparams);
      
//         const query = `SELECT 
//     p.*, 
//     p.title AS productTitle, 
//     SKU.*, 
//     MIN(pi.imageurl) AS imageurl, 
//     s.title AS subCategoryTitle 
// FROM Product p 
// JOIN SKU ON p.baseSKU = SKU.sku 
// JOIN ProductImages pi ON p.productID = pi.productID 
// JOIN ProductSubCategory pc ON pc.productID = p.productID 
// JOIN SubCategory s ON s.subCatId = pc.subCategoryId 
// WHERE s.title LIKE ? 
// GROUP BY p.productID, SKU.sku, s.title
// LIMIT 0, 1000;
// `;

//         const values = [`%${keyword}%`];

//         const [result]=await connection.execute(query,values);
const query = `call GetProductsBySubCategory(?)`;

const values = [`%${keyword}%`];

const [result]=await connection.execute(query,values);
// if(result){
// const query = 'SELECT * FROM defaultdb.SubCategories WHERE title like  ?';
// }
        // if(result){
        // const query = 'SELECT * FROM defaultdb.SubCategories WHERE title like  ?';
        // }
        connection.end();
        
        return NextResponse.json(result);


    }
    catch(error){

        return NextResponse.json(error);


    }
}