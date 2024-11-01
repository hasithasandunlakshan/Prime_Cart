import { NextResponse,NextRequest } from "next/server";
import mysql from 'mysql2/promise'
import { GetDBSettings } from "@/sharedCode/common";
let connectionparams=GetDBSettings();
export async function GET(request:NextRequest,{params}:{params:{id:string}}){  
    try{
        const connection=await mysql.createConnection(connectionparams);
        let query1='';
    
        let query3='';
    //     query1 = `
    //     SELECT 
    //         c.*, 
    //         s.imageUrl,
    //         s.price,
    //         p.title AS productName
    //     FROM 
    //         Cart c
    //     JOIN 
    //         SKU s ON c.sku = s.sku
    //     JOIN 
    //         Product p ON s.productId = p.productID
    //     WHERE 
    //         c.userId = ?;
    // `;
    
    //     // query2='select * from ProductImages where productId = ?';
    //     query3='select sum(price*quantity) from  SKU  join Cart on Cart.sku=SKU.sku where Cart.userId=?';
    query1 = "call GetCartDetails(?)";
    // query2 = "call GetProductImages(?)";
    query3 = "call GetCartTotal(?)";
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
        const userId = params.id; // User ID from the URL params
        connection = await mysql.createConnection(connectionparams);

        // Call the stored procedure to delete the product from the cart
        const [result]: any = await connection.execute('CALL DeleteFromCart(?, ?)', [userId, productSKU]);

        // Check if the deletion was successful
        if (result.affectedRows > 0) {
            return NextResponse.json({ message: `Product with SKU ${productSKU} deleted from cart` });
        } else {
            return NextResponse.json({ message: "Product not found in cart" });
        }

    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Error deleting product from cart", error }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}