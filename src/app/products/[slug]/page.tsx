import ProductPage from '@/components/product/ProductPage';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React from 'react'



const product={
    
        id: 2,
        name: "Laptop",
        description: "Lightweight and powerful laptop with long battery life.",
        price: 1299,
        category: "Electronics",
        subcategory: "Computers & Laptops",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.5,
        comments: ["Perfect for work and travel.", "Excellent performance."],
      


}
interface  Iprams{
    productID:string;
}
const Product=({params}:{params:Params})=>{
    return(
  

        <ProductPage product={product}/>
    )
}
export default Product;