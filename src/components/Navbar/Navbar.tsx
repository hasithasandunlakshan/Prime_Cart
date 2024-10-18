"use client"
// Import Categories array from the correct pa // Adjust the path to where the categories array is stored
import Avatar from '@mui/material/Avatar';
import * as React from "react"
import Link from "next/link"
 
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Key, LogOut } from "lucide-react"
import MenubarDemo from "./MenuBar"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { red } from "@mui/material/colors";

import {  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function Nav() {
  const {data:session}=useSession();
  const router =useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-[full] text-white bg-black  min-h-16">
       <NavigationMenu className="">
         <NavigationMenuList  className="flex gap-5">
           <NavigationMenuItem>

            <MenubarDemo/>
           
           </NavigationMenuItem>
           <NavigationMenuItem>
           Become a Seller
           
           </NavigationMenuItem>
           <NavigationMenuItem>
           Daily Offers
           
           </NavigationMenuItem>
           <NavigationMenuItem>
          Help & Support 
           
           </NavigationMenuItem>
           <NavigationMenuItem>
           {session?      
      <div className="cursor-pointer ">

<DropdownMenu   >
          <DropdownMenuTrigger asChild>
<Avatar className="text-black bg-white">{session.user?.email?.charAt(0).toUpperCase()}</Avatar>


          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel >{session.user?.id}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>router.push("/user/profile")} className='cursor-pointer'>Profile</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>History</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>settings</DropdownMenuItem>
           
            <Link href={"/api/auth/signout"}>
            <DropdownMenuItem className='cursor-pointer'>
            <h1 className="flex items-center gap-2 ">
            <LogOut size={10}/>  Logout
            </h1>
            </DropdownMenuItem>
         
          </Link>

          
            <DropdownMenuItem  className='cursor-pointer' ><h1 className="text-red-700 "> Delete account </h1>  </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

            




           :
              <Link href={"/api/auth/signin"}>

          
              <Button className='text-black bg-white' type="button">Login</Button>
           
              </Link>
            }
         
           </NavigationMenuItem> 
           {!session?   <NavigationMenuItem>
         
         <Link href={"/signup"}>
          <Button className='text-black bg-white' type="button">Sign up</Button>
       
          </Link>
         
         </NavigationMenuItem>:   <NavigationMenuItem>
         
         <Link href={"/api/auth/signout"}>
          <Button className='text-black bg-white' type="button">Sign Out</Button>
       
          </Link>
         
         </NavigationMenuItem>}
        
         </NavigationMenuList>
       </NavigationMenu>
    </div>
  )
}
