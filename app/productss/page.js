"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Sub-component jahan query params read aur list render ho rahi hain
function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory'); 
  const searchQuery = searchParams.get('search');

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MongoDB API se real data fetch karna
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if(category) params.append("category", category);
        if(subcategory) params.append("subcategory", subcategory);
        if(searchQuery) params.append("search", searchQuery);


        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setProductsData(data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [ category, subcategory, searchQuery]);

  // 2. Filtering logic (Search, Category, aur Subcategory ke liye)
  const filteredProducts = productsData.filter(item => {
    const title = item.title || item.name || "";
    const itemCategory = item.category || "";
    const itemSubcategory = item.subcategory || "";

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        title.toLowerCase().includes(query) ||
        itemCategory.toLowerCase().includes(query) ||
        itemSubcategory.toLowerCase().includes(query)
      );
    }

    const matchCategory = category ? itemCategory.toLowerCase() === category.toLowerCase() : true;
    const matchSubcategory = subcategory ? itemSubcategory.toLowerCase() === subcategory.toLowerCase() : true;
   
    return matchCategory && matchSubcategory;
  });

  if (loading) {
    return <div className="p-12 text-amber-500 bg-black min-h-screen text-center">Loading database products...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-4 md:p-12">
        {/* navigation */}
      <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#d4af37]">Home</Link>/
        <span className="hover:text-[#d4af37] ">Clothing</span>
        <span>/</span>
        {category && (
          <>
          <span className="capitalize">{category}</span>
            <span>/</span>
          </>
        )}
        <span className="text-[#d4af37] font-medium">
          {searchQuery
          ?searchQuery
        :subcategory
        ?subcategory.replace(/-/g, " ")
        :category || "All products"
          }
        </span>
      </div>
      
      
      
      {/* Category Header */}
      <div className="border-b border-[#332b1e] pb-4 mb-8">
        <h1 className="text-sm md:text-xl font-bold uppercase tracking-wider text-[#d4af37]">
          {searchQuery
          ? `Search Result for "${searchQuery}"`
          : subcategory
          ? subcategory.replace(/-/g, " ")
          : category || "All Products"} Collection
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Showing {filteredProducts.length} items from database
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
          {filteredProducts.map((product) => {
            const productId = product._id || product.id;
            return (
              <Link href={`/product/${productId}`} key={productId}>
                <div
                  className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden p-2.5 md:p-4 hover:border-[#d4af37] transition-all group h-full flex flex-col justify-between"
                >
                  <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden rounded-lg bg-zinc-900">
                    <img
                      src={product.image}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-3">
                    {product.brand && (
                      <p className="text-[9px] md:text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider truncate">
                        {product.brand}
                      </p>
                    )}
                    <h3 className="font-medium text-xs md:text-sm text-amber-50 truncate mt-0.5">
                      {product.title || product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 md:gap-2 mt-2 flex-wrap">
                      <span className="text-amber-400 font-bold text-sm md:text-base">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] md:text-xs text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-[10px] md:text-xs text-green-400 font-semibold ml-auto">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty Fallback */
        <div className="text-center py-20 bg-[#121212] rounded-xl border border-[#222]">
          <h2 className="text-lg text-gray-300 font-semibold mb-1">
            No Products Found
          </h2>
          <p className="text-gray-500 text-xs">
            is there really no items avilable in this section right now.
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