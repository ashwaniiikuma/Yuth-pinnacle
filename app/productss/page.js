"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { productsData } from "../data/products"; // ✅ Correct// Sub-component jahan query params read aur list render ho rahi hain
function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory'); 
  const searchQuery = searchParams.get('search'); //search line

  const filteredProducts = productsData.filter(item => {
    if(searchQuery){
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query)||
        item.category.toLowerCase().includes(query)||
        (item.subcategory && item.subcategory.toLowerCase().includes(query))
      );
    }

    const matchCategory = category ? item.category === category : true;
    const matchsubCategory = subcategory ? item.subcategory === subcategory : true;
   
    return matchCategory && matchsubCategory;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6 md:p-12">
      {/* Caegory Header */}
      <div className="border-b border-[#332b1e] pb-4 mb-8">
        <h1 className=" text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#d4af37]">
          {searchQuery
          ? `Search Result for "${searchQuery}"`
          :  subcategory
          ?  subcategory.replace(/-/g, " ")
         : category || "All Products"} Collection
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Showing {filteredProducts.length} items
        </p>
      </div>

      {/* Product Grid */}
       {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden p-4 hover:border-[#d4af37] transition-all group"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-3">
                {product.brand && (
                  <p className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                    {product.brand}
                  </p>
                )}
                <h3 className="font-medium text-sm text-amber-50 truncate mt-0.5">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-amber-400 font-bold text-base">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs text-green-400 font-semibold ml-auto">
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Fallback */
        <div className="text-center py-20 bg-[#121212] rounded-xl border border-[#222]">
          <h2 className="text-lg text-gray-300 font-semibold mb-1">
            No Products Found
          </h2>
          <p className="text-gray-500 text-xs">
            Is section me abhi koi items available nahi hain.
          </p>
        </div>
      )}
      </div>
  );
}
  // Main exported page component wrapped in Suspense
        export default function ProductPage(){
          return(
          <Suspense fallback={<div className="p-8 text-amber-500 bg-black min-h-screen">Loading products...</div>}>
            <ProductsContent/>
          </Suspense>
          );
        }