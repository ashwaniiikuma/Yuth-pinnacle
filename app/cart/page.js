"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // LocalStorage se cart items load karna
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [
      {
        id: 1,
        name: "Men Biker Leather Jacket",
        price: 2499,
        originalPrice: 4999,
        size: "M",
        quantity: 1,
        image: "/profile-img.png" // Apni image path ke mutabiq adjust kar sakte hain
      }
    ];
    setCartItems(savedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Price Calculations
  const totalProductPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = 100; // Sample discount
  const orderTotal = totalProductPrice > 0 ? totalProductPrice - totalDiscount : 0;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      
      {/* Top Progress Bar (Meesho Style Steps) */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          {/* Step 1: Cart (Active) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-sm shadow-md">
              1
            </div>
            <span className="text-xs mt-1 text-[#d4af37] font-semibold">Cart</span>
          </div>
          
          <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>

          {/* Step 2: Address */}
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <span className="text-xs mt-1 text-gray-400">Address</span>
          </div>

          <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>

          {/* Step 3: Payment */}
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-xs mt-1 text-gray-400">Payment</span>
          </div>

          <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>

          {/* Step 4: Summary */}
          <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-sm">
              4
            </div>
            <span className="text-xs mt-1 text-gray-400">Summary</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Left: Products, Right: Price Details) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Product Details List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-200 border-b border-gray-800 pb-3">
            Product Details ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-[#141414] rounded-2xl border border-gray-800">
              <p className="text-gray-400 mb-4">Your cart is empty!</p>
              <Link href="/" className="px-6 py-2.5 bg-[#d4af37] text-black font-bold rounded-xl text-sm">
                Shop Now
              </Link>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 items-start justify-between shadow-lg">
                <div className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-800 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={item.image || "/profile-img.png"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm md:text-base text-gray-100">{item.name}</h3>
                    <p className="text-[#d4af37] font-extrabold text-sm">
                      ₹{item.price} <span className="text-gray-500 line-through text-xs font-normal">₹{item.originalPrice || 4999}</span>
                    </p>
                    <p className="text-xs text-gray-400">All issue easy returns</p>
                    <div className="flex gap-4 text-xs pt-1 text-gray-300 font-medium">
                      <span>Size: <strong className="text-white">{item.size}</strong></span>
                      <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between items-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                  <button className="text-xs font-bold text-[#d4af37] hover:underline">EDIT</button>
                  <button 
                    onClick={() => removeItem(index)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 mt-auto"
                  >
                    ✕ REMOVE
                  </button>
                </div>
              </div>
            ))
          )}
          
          {cartItems.length > 0 && (
            <div className="bg-[#141414] border border-gray-800 p-4 rounded-xl text-xs text-gray-400">
              Sold by: <span className="text-gray-200 font-bold">JSL WORKS LUXURY</span>
            </div>
          )}
        </div>

        {/* Right Side: Price Details & Continue Button */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-gray-200 border-b border-gray-800 pb-3">
              Price Details ({cartItems.length} Items)
            </h3>

            <div className="space-y-2.5 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Product Price</span>
                <span className="font-semibold">+ ₹{totalProductPrice}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Total Discounts</span>
                <span className="font-semibold">- ₹{totalDiscount}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-base font-bold text-white">
              <span>Order Total</span>
              <span className="text-xl text-[#d4af37]">₹{orderTotal}</span>
            </div>

            {/* Discount Alert Banner */}
            <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
              🎉 Yay! Your total discount is ₹{totalDiscount}
            </div>

            <p className="text-[10px] text-gray-500 text-center">
              Clicking on 'Continue' will not deduct any money
            </p>

            {/* Continue Button to Address Step */}
            <Link 
              href="/checkout/address" 
              className="w-full block bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black font-extrabold py-3.5 rounded-xl text-center shadow-lg hover:opacity-90 transition"
            >
              Continue
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}