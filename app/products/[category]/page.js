import Link from "next/link"
import React from "react"
import { productsData } from "@/app/data/products"
export default async function CategoryPage({params}){

    //URL se dynamic parameter (men, women, kid)
    const resolvedParams = await params;
    const categoryName = resolvedParams.category;

    const filteredProducts = productsData.filter(
        (item)=> item.category.toLowerCase() === categoryName.toLowerCase()
    );
    return(
    <div className="min-h-screen bg-[#0d0d0e] text-gray-200 px-4 py-6 md:px-10">
        {/* Header &Breadrumb */}
        {/* Header & Breadcrumb */}
      <div className="mb-6 border-b border-[#332b1e] pb-4">
        <p className="text-xs text-[#a39482] capitalize mb-1">
          Home / Clothing / <span className="text-[#e0a96d] font-semibold">{categoryName}</span>
        </p>
        <h1 className="text-xl md:text-2xl font-bold text-[#e0a96d] uppercase tracking-wider">
          {categoryName}'s Collection
          <span className="text-xs text-[#a39482] font-normal ml-3">
            ({filteredProducts.length} items)
          </span>
        </h1>
      </div>

        <div className="flex flex-col md:flex-row gap-8">
        {/* left sidebar - filters */}
            <div className="w-full md:w-64 shrink-0 bg-[#141210] p-5 rounded-lg border border-[#332b1e] h-fit">
                <h3 className="font-bold text-[#d4af37] text-xs uppercase tracking-wider mb-4">categories</h3>
                <div className="space-y-2 text-xs text-gray-300">
                    <label className="flex item-center gap-2 cursor-pointer hover:text-[#e0a96d]">
                     <input type="checkbox" className="accent-[#d4af37]" />Topwear
                        </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#e0a96d]">
                    <input type="checkbox" className="accent-[#d4af37]" /> Bottomwear
                    </label> 
                </div>
            </div>

            {/* RIGHT Section - Product Grid */}
           <div className="flex-1 w-full min-w-0">
  {filteredProducts.length === 0 ? (
    <div className="text-center py-20 text-gray-400">
      No product found for "{categoryName}"
    </div>
  ) : (
    /* Columns badha kar grid cards ke sizes chote kiye gaye hain */
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 min-w-0">
    {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-[#141310] border border-[#332b1e] rounded-md overflow-hidden hover:border-[#d4af37] transition-all duration-300 group flex flex-col justify-between"
        >
          {/* object-contain aur bg-black/60 se poori image bina cut huye fit dikhegi */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 p-1 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-2.5 space-y-1">
            <h4 className="font-bold text-[10px] text-[#d4af37] uppercase tracking-wide">
              {product.brand}
            </h4>
            <h3 className="text-[11px] text-gray-300 truncate" title={product.title}>
              {product.title}
            </h3>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="font-bold text-xs text-[#e0a96d]">₹{product.price}</span>
              <span className="line-through text-gray-500 text-[9px]">
                ₹{product.originalPrice}
              </span>
              {product.discount && (
                <span className="text-[9px] text-green-400 font-medium ml-auto">
                  {product.discount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
        </div>


    </div>

        )
    }