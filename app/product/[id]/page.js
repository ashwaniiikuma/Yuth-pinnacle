"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { productsData } from "@/app/data/products";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const resolvedParams = await params;
      const found = productsData.find((item) => item.id.toString() === resolvedParams.id);
      setProduct(found);
      if (found) {
        setActiveImage(found.image);
      }
    }
    getProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white p-12 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-[#d4af37]">Loading Product Details...</h2>
        <Link href="/" className="text-sm underline mt-4 inline-block text-gray-400">Back to Home</Link>
      </div>
    );
  }

  // Agar product ke paas alag images array nahi hai toh main image ko 4 alag angles ki tarah use karenge
  const imagesList = product.images || [product.image, product.image, product.image, product.image];

  const checkDelivery = (e) => {
    e.preventDefault();
    if(pincode.length === 6) {
      setDeliveryStatus(`Delivery by ${new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString()} | Free Delivery`);
    } else {
      setDeliveryStatus("Please enter a valid 6-digit Pincode.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-4 md:p-12">
      <Link href="/" className="text-[#d4af37] text-sm mb-6 inline-block hover:underline">← Back to Products</Link>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2 max-w-7xl mx-auto items-start">
        
        {/* Responsive Multi-Angle Image Section */}
        <div className="md:col-span-7 flex flex-col-reverse md:flex-row gap-4 md:sticky md:top-6">
          
          {/* Thumbnails: Bottom on Mobile (flex-row), Left Side on Desktop (md:flex-col) */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0 scrollbar-none">
            {imagesList.map((img, index) => (
              <div 
                key={index}
                onClick={() => setActiveImage(img)}
                className={`cursor-pointer rounded-lg overflow-hidden w-20 h-24 md:w-24 md:h-28 shrink-0 transition-all bg-transparent ${
                  activeImage === img ? "ring-2 ring-[#d4af37] opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Angle ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>

          {/* Main Large Active Image (Pure clean layout without background box) */}
          <div className="flex-1 overflow-hidden rounded-2xl flex items-center justify-center">
            <img 
              src={activeImage || product.image} 
              alt={product.title} 
              className="w-full h-[400px] sm:h-[500px] md:h-[650px] object-cover rounded-2xl shadow-2xl transition-all duration-300" 
            />
          </div>

        </div>

        {/* Product Details Section */}
        <div className="md:col-span-5">
          <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
            {product.brand || "JSL WORKS"}
          </span>
          
          <h1 className="text-2xl md:text-3xl font-bold mt-1 text-amber-50">
            {product.title}
          </h1>

          {/* Ratings & Reviews Box */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              4.3 ★
            </span>
            <span className="text-gray-400 text-xs">1,420 Ratings & 312 Reviews</span>
          </div>
          
          {/* Price Section */}
          <div className="flex items-center gap-3 mt-4 border-b border-[#332b1e] pb-4">
            <span className="text-3xl font-bold text-[#d4af37]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-lg">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="text-green-400 text-sm font-semibold">{product.discount} OFF</span>
            )}
          </div>

          <p className="text-xs text-green-400 mt-2 font-medium">inclusive of all taxes</p>

          {/* Size Selection */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-300 font-semibold uppercase">Select Size</p>
              <span className="text-xs text-[#d4af37] cursor-pointer hover:underline">Size Chart</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedSize === size 
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                      : 'border-zinc-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons (Add to Cart & Wishlist) */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
            onClick={()=>{
              if(!selectedSize){
                alert("Please select a size first!");
                return;
              }
              //cart item 
              const cartItem = {
                id:product.id,
                name:product.name,
                price:product.price,
                image:product.image,
                size:selectedSize,
                quantity:1
              };
              //save in localstorage 
              const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
              existingCart.push(cartItem);
              localStorage.setItem("cart", JSON.stringify(existingCart));

              //cart page redirect karna
              window.location.href = "/cart";
            }}
            className="flex-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black font-extrabold py-3.5 rounded-xl transition text-center flex items-center justify-center shadow-lg hover:opacity-90 cursor-pointer"  >
            🛒 Add to Cart
            </button>
            <Link href={`/checkoutt?id=${product.id}&size=${selectedSize}`} 
            className="flex-1 bg-white hover:bg-gray-200 text-black font-bold py-3.5 rounded-xl transition text-center flex items-center justify-center shadow-lg"
            >
            ⚡ Buy Now
            </Link>
            <button className="flex-1 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 font-bold py-3.5 rounded-xl transition">
              ❤️ Wishlist
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="mt-8 border-t border-[#332b1e] pt-6">
            <p className="text-xs text-gray-300 font-semibold uppercase mb-2">Delivery Options 📍</p>
            <form onSubmit={checkDelivery} className="flex gap-2 w-full max-w-sm">
              <input 
                type="text" 
                placeholder="Enter Pincode" 
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-[#d4af37] flex-1"
              />
              <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium text-[#d4af37] border border-zinc-700">
                Check
              </button>
            </form>
            {deliveryStatus && <p className="text-xs text-amber-300 mt-2">{deliveryStatus}</p>}
          </div>

          {/* Product Specifications / Highlights */}
          <div className="mt-8 border-t border-[#332b1e] pt-6">
            <p className="text-xs text-gray-300 font-semibold uppercase mb-3">Product Details & Specifications</p>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-300">Fabric:</strong> Premium Cotton Blend</li>
              <li><strong className="text-gray-300">Pattern:</strong> Ethnic Motifs / Printed</li>
              <li><strong className="text-gray-300">Sleeve Length:</strong> Three-Quarter Sleeves</li>
              <li><strong className="text-gray-300">Occasion:</strong> Daily Wear / Festive</li>
              <li><strong className="text-gray-300">Manufacturer:</strong> JSL Works Lifestyle India</li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4 border-t border-[#332b1e] pt-6 text-center">
            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
              <p className="text-[#d4af37] text-sm font-bold">100%</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Original Products</p>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
              <p className="text-[#d4af37] text-sm font-bold">14 Days</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Easy Returns</p>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
              <p className="text-[#d4af37] text-sm font-bold">Secure</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Payments</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}