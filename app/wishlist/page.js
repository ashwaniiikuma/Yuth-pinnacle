"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the wishlist into database
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const userId = localStorage.getItem("userId") || "guest-user-1";
        const res = await fetch(`/api/wishlist?userId=${userId}`);
        const data = await res.json();
        console.log("wishlist API GET Response:", data);

        if (data.success && (data.wishlist || data.wishlisht)) {
          const targetWishlist = data.wishlist || data.wishlisht;
          setWishlistItems(targetWishlist.items || []);
        }
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  // Wishlist se item remove karne ka function
  const removeFromWishlist = async (productId) => {
    try {
      const userId = localStorage.getItem("userId") || "guest-user-1";
      
      // Optimistic update: UI se turant hatao
      setWishlistItems((prevItems) => 
        prevItems.filter((item) => {
          const itemId = item._id || item.id || item.productId;
          return itemId?.toString() !== productId?.toString();
        })
      );

      const res = await fetch(`/api/wishlist?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        const items = data.wishlist?.items || data.wishlishts?.items;
        if (items) {
          setWishlistItems(items);
        }
      } else {
        alert(data.error || "Failed to remove item");
      }
    } catch (error) {
      console.log("Error removing item from wishlist:", error);
    }
  };

  const movetocart = async (item) => {
    try {
      const userId = localStorage.getItem("userId") || "guest-user-1";
      // FIX: Ensure correct product ID format (_id or id or productId)
      const productId = item._id || item.id || item.productId;
      const size = item.size || "M";
      const quantity = 1;

      if (!productId) {
        alert("Product ID not found!");
        return;
      }
      
      const cartRes = await fetch("/api/cart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId, productId, size, quantity}),
      });
      
      const cartData = await cartRes.json();

      if (cartData.success) {
        await removeFromWishlist(productId);
        router.push("/cart");
      } else {
        alert(cartData.error || "Failed to move item to cart");
      }
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center font-medium">
        Loading Wishlist...
      </div>
    );
  }

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
            {wishlistItems.map((item) => {
              // FIX: Fallback to _id, id, or productId safely
              const prodId = item._id || item.id || item.productId;

              return (
                <div 
                  key={prodId} 
                  className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden flex flex-col group relative shadow-lg"
                >
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(prodId)}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 transition"
                    title="Remove"
                  >
                    ✕
                  </button>

                  {/* Product Image - FIX: Using prodId for dynamic link */}
                  <Link href={`/product/${prodId}`} className="relative aspect-[4/5] w-full bg-gray-900 overflow-hidden block">
                    <img 
                      src={item.image || item.images?.[0]} 
                      alt={item.name || item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="p-3 space-y-1.5 flex flex-col flex-grow justify-between">
                   <div>
  <h3 className="text-xs font-bold text-gray-200 line-clamp-1">
    {item.title || item.name || "Clothing Product"}
  </h3>
  
  <div className="flex items-center gap-2 pt-1.5 flex-wrap">
    <span className="text-xs font-black text-[#d4af37]">
      ₹{item.price}
    </span>
    
    {(item.originalPrice || item.mrp) && (
      <>
        <span className="text-[11px] text-gray-500 line-through font-normal">
          ₹{item.originalPrice || item.mrp}
        </span>
        
        {((item.originalPrice || item.mrp) > item.price) && (
          <span className="text-green-400 text-[10px] font-semibold tracking-wide">
            {Math.round((((item.originalPrice || item.mrp) - item.price) / (item.originalPrice || item.mrp)) * 100)}% Off
          </span>
        )}
      </>
    )}
  </div>
</div>
                    {/* Move to Bag Button */}
                    <button 
                      onClick={() => movetocart(item)}
                      className="w-full bg-[#9f2089] hover:bg-[#851972] text-white text-center font-bold py-2 rounded-lg text-xs transition block mt-2"
                    >
                      MOVE TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}