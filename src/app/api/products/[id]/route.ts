import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Create a database connection
        const connection = await mysql.createConnection(connectionparams);

        // Call the stored procedure and pass in productID as the parameter
        const [resultSets]: any[] = await connection.query(`CALL GetProductDetails(?)`, [params.id]);

        // Destructure each result set from resultSets with explicit typing
        const [productResult, imagesResult, skuResult, variantResult, attributesResult] = resultSets;

        // Type definitions for each result if needed
        const result: any[] = productResult;
        const images: any[] = imagesResult;
        const sku: any[] = skuResult;
        const variants: any[] = variantResult;
        const attributes: any[] = attributesResult;

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
            images: images,
            attributes: attributes
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
