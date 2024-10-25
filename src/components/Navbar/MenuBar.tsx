import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

interface SubCategory {
  subCatId: number
  subCategoryTitle: string
}

interface Category {
  categoryId: number
  categoryTitle: string
  subCategories: SubCategory[] // Optional property to handle categories with no subcategories
}

export default function MenubarDemo() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/nav_dropdown") // Replace with your actual API endpoint
        const data = await response.json()
        setCategories(data)
        console.log("Data",data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="w-full">
      <Menubar className="bg-black">
        <MenubarMenu>
          <MenubarTrigger>All Categories</MenubarTrigger>
          <MenubarContent className="">
            {categories.map((category) => (
              <MenubarSub key={category.categoryId}>
                <Link href={`/category/${category.categoryTitle}`}>
                  <MenubarSubTrigger>{category.categoryTitle}</MenubarSubTrigger>
                </Link>
                <MenubarSubContent className="">
                  {category?.subCategories?.map((subcat,key) => (
                    <Link href={`/category/${category.categoryTitle}/${subcat.subCategoryTitle}`} key={subcat.subCatId}>
                      <MenubarItem>{subcat.subCategoryTitle}</MenubarItem>
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
