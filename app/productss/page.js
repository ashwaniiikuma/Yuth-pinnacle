"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Sub-component jahan query params read aur list render ho rahi hain
function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  // Dummy data / replace with your actual data import
  const productsData = [
    { id: 1, title: "T-Shirt", category: "men", subcategory: "topwear", price: 499, image: "/placeholder.png" }
  ];

  const filteredProducts = productsData.filter(item => {
    const matchCategory = category ? item.category === category : true;
    const matchsubCategory = subcategory ? item.subcategory === subcategory : true;
    return matchCategory && matchsubCategory;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold uppercase mb-4">
        {subcategory ? subcategory.replace('_', ' ') : category || 'All Products'} Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <h3 className="font-semibold mt-2">{product.title}</h3>
            <p className="text-amber-500">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main exported page component wrapped in Suspense
export default function ProductPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}