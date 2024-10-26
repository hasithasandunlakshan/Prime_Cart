import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export const GetDBSettings = () => {
  return {
    host: 'mysql-13eae395-hasiofficial2002-f9b9.c.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_TVFlXjqaBIrs_ewIgdP',
    database: 'defaultdb',
    port: 18475,
  };
};

let connectionparams = GetDBSettings();

export async function POST(req) {
  const { firstName, lastName } = await req.json(); 

  let connection;
  try {
    connection = await mysql.createConnection(connectionparams);
    const [result] = await connection.execute(
      'UPDATE RegisteredUser SET firstName = ?, lastName = ? WHERE userId = 16',
      [firstName, lastName]
    );

    if (result.affectedRows > 0) {
      const [updatedData] = await connection.execute(
        'SELECT * FROM RegisteredUser WHERE userId = 16'
      );
      return new Response(JSON.stringify(updatedData), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ message: 'Error updating user', error }), { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
