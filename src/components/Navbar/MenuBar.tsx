import Link from "next/link"
import { Categories } from "../../sample/Categories" 
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  export default function MenubarDemo() {
    return (
      <div className="w-full bg-black ">
   <Menubar  className="bg-black">
        <MenubarMenu>
          <MenubarTrigger>All Categories</MenubarTrigger>
          <MenubarContent className="">

            {/* <MenubarItem>
             
            </MenubarItem>
          
            <MenubarSeparator /> */}
            {Categories.map((Categories,key)=>(
   <MenubarSub key={key+1}>
    <Link href={`/category/${Categories?.name}`}>
   <MenubarSubTrigger>{Categories?.name}</MenubarSubTrigger>
   </Link>
   <MenubarSubContent className="">
   {/* <MenubarSub>
   <MenubarSubTrigger>Share</MenubarSubTrigger>
   <MenubarSubContent>
     <MenubarItem>Email link</MenubarItem>
     <MenubarItem>Messages</MenubarItem>
     <MenubarItem>Notes</MenubarItem>
   </MenubarSubContent>
 </MenubarSub> */}
 {Categories?.subcategories.map((subcat,key)=>(

  // <MenubarItem>{subcat?.name}</MenubarItem>
 <Link href={`/category/${Categories?.name}/${subcat?.name}`} key={key+10}>


  <MenubarItem >{subcat?.name}</MenubarItem>

  </Link>

  

 ))}
     
    
   </MenubarSubContent>
 </MenubarSub>

            ))}
         
            <MenubarSeparator />
          
          </MenubarContent>
        </MenubarMenu>
  
      </Menubar>
      </div>
   
    )
  }
  