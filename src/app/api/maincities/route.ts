import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/sharedCode/common";

let connectionparams = GetDBSettings();

export async function GET(request: Request) {
    try {
        // Create a MySQL connection
        const connection = await mysql.createConnection(connectionparams);

        // Call the stored procedure
        const [rows] = await connection.execute('CALL GetProvincesDistrictsCities()') as [
            Array<{ 
                provinceId: number; 
                provinceName: string; 
                districtId: number | null; 
                districtName: string | null; 
                cityId: number | null; 
                cityName: string | null; 
            }>,
            any
        ];

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
