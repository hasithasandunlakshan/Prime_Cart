

import React from 'react'
import Credentials from "next-auth/providers/credentials";
import NextAuth from 'next-auth';
import mysql from 'mysql2/promise'
import { GetDBSettings } from '@/sharedCode/common';
import Google from "next-auth/providers/google"
import { toast } from '@/hooks/use-toast';

let connectionparams=GetDBSettings();
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                let  currentuser= null;
                const connection=await mysql.createConnection(connectionparams);
             
                const [rows] = await connection.execute(
                    'SELECT * FROM defaultdb.UserCred WHERE email = ? AND password = ?',
                    [credentials.email, credentials.password]
                  );
                connection.end();

                // validate credentials
              
              
                // get user

                currentuser = rows[0];
            

                if (!currentuser) {
                    console.log("Invalid credentials");
                    toast({
                        title: "You submitted the following values:",
                        description: (
                          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
                           <p> User Credentials Invalid</p>
                          </pre>
                        ),
                      })
                    return null;
                 
                }
                console.log(currentuser);


                return  currentuser;
            }

            
        })

       
    ],
   
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            // You can add more attributes here
          }
          return token;
        },
        async session({ session, token }) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.name = token.name;
          // Add more data here if needed
          return session;
        },
      },
      pages: {
        signIn: '/auth/signin', 
      },
})
