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

        // Call the stored procedure
        const [rows] = await connection.execute('CALL GetCategoriesWithSubCategories()') as [
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
