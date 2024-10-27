import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

// Define interfaces for the category and subcategory structures
interface SubCategory {
    subCatId: number;
    subCategoryTitle: string;
}

interface Category {
    categoryId: number;
    categoryTitle: string;
    subCategories: SubCategory[];
}

let connectionparams = GetDBSettings();

export async function GET(request: Request) {
    try {
        // Create a MySQL connection
        const connection = await mysql.createConnection(connectionparams);

        // SQL query to get categories and their respective subcategories
        const query = `
            SELECT c.categoryId, c.title AS categoryTitle, 
                   s.subCatId, s.title AS subCategoryTitle
            FROM defaultdb.Category c
            LEFT JOIN defaultdb.SubCategory s ON c.categoryId = s.mainCatId
            ORDER BY c.categoryId, s.subCatId;
        `;

        // Execute the query and specify the result type
        const [rows] = await connection.execute(query) as [
            Array<{ 
                categoryId: number; 
                categoryTitle: string; 
                subCatId: number | null; 
                subCategoryTitle: string | null; 
            }>,
            any
        ];
        
        // Close the connection
        await connection.end();

        // Initialize the result object
        const result: Record<number, Category> = {};

        rows.forEach(row => {
            const { categoryId, categoryTitle, subCatId, subCategoryTitle } = row;

            // Check if the category is already in the result
            if (!result[categoryId]) {
                result[categoryId] = {
                    categoryId: categoryId,
                    categoryTitle: categoryTitle,
                    subCategories: []
                };
            }

            // If the subcategory exists, add it to the subCategories array
            if (subCatId !== null) { // Explicitly check for null
                result[categoryId].subCategories.push({
                    subCatId: subCatId,
                    subCategoryTitle: subCategoryTitle || '' // Handle undefined case
                });
            }
        });

        // Convert the result object to an array of values
        const finalResult = Object.values(result);

        // Return the nested JSON result
        return NextResponse.json(finalResult);
    } catch (error) {
        console.error("Error retrieving categories and subcategories:", error); // Log the error for debugging
        return NextResponse.json({ error: "An error occurred while retrieving data." }, { status: 500 });
    }
}
