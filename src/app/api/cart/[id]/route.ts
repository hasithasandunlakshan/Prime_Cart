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
        query1 = `
        SELECT 
            c.*, 
            s.imageUrl,
            s.price,
            p.title AS productName
        FROM 
            Cart c
        JOIN 
            SKU s ON c.sku = s.sku
        JOIN 
            Product p ON s.productId = p.productID
        WHERE 
            c.userId = ?;
    `;
    
        query2='select * from ProductImages where productId = ?';
        query3='select sum(price*quantity) from  SKU  join Cart on Cart.sku=SKU.sku where Cart.userId=?';
        let values=[params.id]
        console.log("id",params.id)
        const [result]=await connection.execute(query1,values);
      
       
        const [price]=await connection.execute(query3,values);
        

        console.log("results1",result);

        const details={
            result:result,
           
            
            price:price
        }
        console.log("results1",details);
        connection.end();
        return NextResponse.json(details);
        
        


    }
    catch(error){

        return NextResponse.json(error);


    }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    let connection: mysql.Connection | null = null;

    try {
        const { productSKU } = await request.json(); // SKU of the product to delete
        connection = await mysql.createConnection(connectionparams);

        // Query to delete the product from the cart for the user
        const deleteQuery = 'DELETE FROM Cart WHERE userId = ? AND sku = ?';
        const values = [params.id, productSKU];

        // Execute the query
        const [result]: [mysql.ResultSetHeader, any] = await connection.execute(deleteQuery   , values);

        console.log("Deleted product:", result);

        // Check if any rows were affected (meaning a product was actually deleted)
        if (result.affectedRows > 0) {
            return NextResponse.json({ message: `Product with SKU ${productSKU} deleted from cart` });
        } else {
            return NextResponse.json({ message: "Product not found in cart" });
        }
    } catch (error) {
        // Close the connection if there's an error
        if (connection) connection.end();

        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Error deleting product from cart", error });
    }
}