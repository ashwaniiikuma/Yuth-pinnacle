"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // LocalStorage se wishlist items load karna
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedWishlist);
  }, []);

  // Wishlist se item remove karne ka function
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const movetocart = (item) =>{

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    //if alreaddy in cart, if not add with size/qty
    const itemExists = existingCart.some((cartItem)=> cartItem.id === item.id);
    if(!itemExists){
        const cartItem = {
            ...item,
            size: item.size || "M",
            qty:1
        };
        existingCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    removeFromWishlist(item.id);

    router.push("/cart");
};

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            My Wishlist ({wishlistItems.length} Items)
          </h1>
          <button 
            onClick={() => router.push("/")}
            className="text-xs font-bold text-gray-400 hover:text-white transition"
          >
            Back to Home
          </button>
        </div>

        {/* Wishlist Grid */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-[#141414] border border-gray-800 rounded-2xl">
            <p className="text-gray-400 text-sm">Your wishlist is currently empty.</p>
            <button 
              onClick={() => router.push("/")}
              className="bg-[#d4af37] text-black font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#c29b2f] transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden flex flex-col group relative shadow-lg"
              >
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 transition"
                  title="Remove"
                >
                  ✕
                </button>

                {/* Product Image */}
                <Link href={`/product/${item.id}`} className="relative aspect-[4/5] w-full bg-gray-900 overflow-hidden block">
                  <img 
                    src={item.image || item.images?.[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="p-3 space-y-1.5 flex flex-col flex-grow justify-between">
                  <div>
                    
                    <h3 className="text-xs font-bold text-gray-200 line-clamp-1">{item.title || "Clothing Product"}</h3>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs font-black text-white">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-gray-500 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                    {/* Move to Bag Button */}
                  <button 
                    onClick={() => moveToBag(item)}
                    className="w-full bg-[#9f2089] hover:bg-[#851972] text-white text-center font-bold py-2 rounded-lg text-xs transition block mt-2">
                    MOVE TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}