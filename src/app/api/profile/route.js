
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import {GetDBSettings} from "../../../sharedCode/common"
// export const GetDBSettings = () => {
//   return {
//     host: 'mysql-13eae395-hasiofficial2002-f9b9.c.aivencloud.com',
//     user: 'avnadmin',
//     password: 'AVNS_TVFlXjqaBIrs_ewIgdP', 
//     database: 'defaultdb',
//     port: 18475,
//   };
// };

let connectionparams = GetDBSettings();

export async function GET(request) {
    let connection;

    try {
        connection = await mysql.createConnection(connectionparams);
        //const query = 'select * from defaultdb.UserAddress left outer join defaultdb.RegisteredUser on RegisteredUser.userId=UserAddress.userId';
        const query = 'select * from UserAddress u join RegisteredUser r on u.userId=r.userId where u.userId=1';
        const [result]=await connection.execute(query);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Database error:', error); 
        return NextResponse.json({ error: 'Failed to fetch user credentials' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end(); 
            
        }
    }
}
