import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        // Create a database connection
        const connection = await mysql.createConnection(connectionparams);

        // Queries
        let query1 = 'SELECT * FROM Product p JOIN SKU ON p.baseSKU = SKU.sku JOIN ProductImages pi ON p.productID = pi.productID WHERE p.productID = ? LIMIT 1;';
        let query2 = 'SELECT * FROM ProductImages WHERE productID = ?';
        let query3 = 'SELECT * FROM SKU WHERE productID = ?';
        let query4 = `
            SELECT 
                pv.sku AS SKU, 
                pv.variantId AS VariantID, 
                v.tiitle AS VariantTitle, 
                pv.value AS VariantValue, 
                pv.textValue AS VariantTextValue
            FROM ProductVariant pv 
            JOIN Variant v ON pv.variantId = v.variantId
            WHERE pv.sku IN (SELECT sku FROM SKU WHERE productID = ?);
        `;

        // Execute queries
        let values = [params.id];
        const [result] = await connection.execute(query1, values);
        const [images] = await connection.execute(query2, values);
        const [skuResult] = await connection.execute(query3, values);
        const [variantResult] = await connection.execute(query4, values);

        // Ensure skuResult and variantResult are arrays
        const sku: any[] = Array.isArray(skuResult) ? skuResult : [];
        const variants: any[] = Array.isArray(variantResult) ? variantResult : [];

        // Process SKUs and group the variants by SKU
        const skuMap = sku.reduce((acc: any, skuItem: any) => {
            acc[skuItem.sku] = { ...skuItem, variants: [] };
            return acc;
        }, {});

        // Add variants to the corresponding SKU in the map
        variants.forEach((variant: any) => {
            if (skuMap[variant.SKU]) {
                skuMap[variant.SKU].variants.push({
                    variantId: variant.VariantID,
                    title: variant.VariantTitle,
                    value: variant.VariantValue,
                    textValue: variant.TextValue
                });
            }
        });

        // Convert the SKU map back to an array
        const skuWithVariants = Object.values(skuMap);

        // Combine all results into a single response object
        const details = {
            result: result,
            sku: skuWithVariants, // SKUs with variants included
            images: images
        };

        console.log("Details:", details);

        // Close the database connection
        connection.end();

        // Return the result as a JSON response
        return NextResponse.json(details);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error });
    }
}
