"use client";
import { useSearchParams } from "next/navigation";


export default function ProductPage(){
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    //products array filter
    const filteredProducts = productsData.filter(item =>{
        const matchCategory = category? item.category === category: true;
        const matchsubCategory = subcategory? item.subcategory === subcategory: true;
        return matchCategory && matchsubCategory;
    });
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold uppercase mb-4">
               {subcategory ? subcategory.replace('_', ' '): category} Collection
            </h1>
            <div className="grid grid-cols-3 gap-4">
                
                <div key={product.id} className="border p-4 rounded">
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                    <h3 className="font-semibold mt-2">{productsData.title}</h3>
                    <p className="text-amber-500">₹{product.price}</p>
                </div>
            </div>
        </div>
    )
}