import { Categories } from "../../categories/Categories" 
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
      <div className="w-full bg-black">
   <Menubar  className="">
        <MenubarMenu>
          <MenubarTrigger>All Categories</MenubarTrigger>
          <MenubarContent className="bg-white">

            {/* <MenubarItem>
             
            </MenubarItem>
          
            <MenubarSeparator /> */}
            {Categories.map((Categories,key)=>(
   <MenubarSub>
   <MenubarSubTrigger>{Categories?.name}</MenubarSubTrigger>
   <MenubarSubContent className="bg-white">
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
 

  <MenubarItem >{subcat?.name}</MenubarItem>

 

  

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
  