import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: Request) {
    try {
        // Create a MySQL connection
        const connection = await mysql.createConnection(connectionparams);

        // SQL query to fetch provinces, districts, and cities
        const query = `
            SELECT 
                p.provinceId, 
                p.provinceName, 
                d.districtId, 
                d.districtName, 
                mc.cityId, 
                mc.cityName
            FROM 
                Province p
            LEFT JOIN 
                District d ON p.provinceId = d.provinceId
            LEFT JOIN 
                MainCity mc ON d.districtId = mc.districtId
            ORDER BY 
                p.provinceId, d.districtId, mc.cityId;
        `;

        // Execute the query
        const [rows] = await connection.execute<any[]>(query); // Use 'any[]' for rows
        await connection.end();

        // Organize the data into the desired structure
        const provincesMap: Record<number, any> = {};

        rows.forEach(row => {
            const { provinceId, provinceName, districtId, districtName, cityId, cityName } = row;

            if (!provincesMap[provinceId]) {
                provincesMap[provinceId] = {
                    provinceId,
                    provinceName,
                    districts: []
                };
            }

            const province = provincesMap[provinceId];

            // Check if the district exists
            if (districtId !== null) {
                let district = province.districts.find((d: { districtId: any; }) => d.districtId === districtId);
                
                if (!district) {
                    district = {
                        districtId,
                        districtName,
                        cities: []
                    };
                    province.districts.push(district);
                }

                // If the city exists, add it to the cities array
                if (cityId !== null) {
                    district.cities.push({
                        cityId,
                        cityName: cityName || '' // Handle undefined case
                    });
                }
            }
        });

        // Convert provinces map to an array if needed
        const finalResult = Object.values(provincesMap);

        // Return the nested JSON result
        return NextResponse.json(finalResult);
    } catch (error) {
        console.error("Error retrieving provinces, districts, and cities:", error);
        return NextResponse.json({ error: "An error occurred while retrieving data." }, { status: 500 });
    }
}
