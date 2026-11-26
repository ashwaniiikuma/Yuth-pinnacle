// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCart(){
//       try{
//         const userId = "guest-user-1";

//         const res = await fetch(`/api/cart?userId=${userId}`);
//         const data = await res.json();

//         if(data.success && data.cart && data.cart.items){
//           setCartItems(data.cart.items);
//         }
//       }catch(error){
//         console.log("Error fetching cart data:", error);
//       }finally{
//         setLoading(false);
//       }
//     }
//     fetchCart();
//   }, []);

//   const removeItem = async (productId, size) => {
//     try{
//       const userId =  localStorage.getItem("userId") || "guest-user-1"; 
//       const res = await fetch(`/api/cart?userId=${userId}&productId=${productId}&size=${size}`,{
//         method: 'DELETE',  
//       });
//       const data = await res.json();

//       if(data.success){
//         setCartItems(data.cart.item);
//       }
//     }catch(error){
//       console.log("Error removing item:", error);
//     }
//   };

//   // Price Calculations
//   const totalProductPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const totalOriginalPrice = cartItems.reduce((acc, item)=>{
//     const itemMrp = item.originalPrice || item.mrp|| item.price|| 0;
//     return acc + itemMrp *(item.quantity||1);
//   }, 0);

//   const totalDiscount = totalOriginalPrice > totalProductPrice? totalOriginalPrice- totalProductPrice : 0;

//   const orderTotal = totalProductPrice;

//   if(loading){
//     return(
//       <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center font-medium">
//         Loading Cart...
//       </div>
//     )
//   }
//   return (
//     <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      
//        {/* Top Header & Step Wizard Bar */}
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-8 gap-4">
//         <h1 className="text-2xl font-black tracking-wider text-[#d4af37]">YOUTH PINNACLE</h1>
        
//         {/* Progress Bar */}
//         <div className="w-full md:w-2/3">
//           <div className="flex items-center justify-between relative">
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">✓</div>
//               <span className="text-[10px] mt-1 text-emerald-500 font-medium">Cart</span>
//             </div>
//             <div className="flex-1 h-[2px] bg-emerald-600 mx-2"></div>
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">2</div>
//               <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Address</span>
//             </div>
//             <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">3</div>
//               <span className="text-[10px] mt-1 text-gray-400">Payment</span>
//             </div>
//             <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">4</div>
//               <span className="text-[10px] mt-1 text-gray-400">Summary</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Layout (Left: Products, Right: Price Details) */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Side: Product Details List */}
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-lg font-bold text-gray-200 border-b border-gray-800 pb-3">
//             Product Details ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})
//           </h2>

//           {cartItems.length === 0 ? (
//             <div className="text-center py-16 bg-[#141414] rounded-2xl border border-gray-800">
//               <p className="text-gray-400 mb-4">Your cart is empty!</p>
//               <Link href="/" className="px-6 py-2.5 bg-[#d4af37] text-black font-bold rounded-xl text-sm">
//                 Shop Now
//               </Link>
//             </div>
//           ) : (
//            cartItems.map((item, index) => {
//             // calculate of percentage
//             const mrp = item.originalPrice || item.mrp || (item.price + 100);
//             const discountPercent = mrp > item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 0;

//             return (
//               <div key={index} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 items-start justify-between shadow-lg">
//                 <div className="flex gap-4">
//                   <div className="w-20 h-24 bg-gray-800 rounded-xl overflow-hidden relative flex-shrink-0">
//                     <img src={item.image || "/profile-img.png"} alt={item.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div className="space-y-1">
//                     <h3 className="font-bold text-sm md:text-base text-gray-100">{item.name}</h3>
//                     <p className="text-[#d4af37] font-extrabold text-sm flex items-center gap-2">
//                       <span>₹{item.price}</span> 
//                       <span className="text-gray-500 line-through text-xs font-normal">₹{mrp}</span>
//                       {discountPercent > 0 && (
//                         <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
//                           {discountPercent}% Off
//                         </span>
//                       )}
//                     </p>
//                     <p className="text-xs text-gray-400">All issue easy returns</p>
//                     <div className="flex gap-4 text-xs pt-1 text-gray-300 font-medium">
//                       <span>Size: <strong className="text-white">{item.size}</strong></span>
//                       <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex sm:flex-col justify-between items-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
//                   <Link 
//                     href={`/product/${item.productId}`} 
//                     className="text-xs font-bold text-[#d4af37] hover:underline"
//                   >
//                     EDIT
//                   </Link>
//                   <button 
//                     onClick={() => removeItem(item.productId, item.size)}
//                     className="text-xs font-bold text-red-400 hover:text-red-300 mt-auto"
//                   >
//                     ✕ REMOVE
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//           )}
          
//           {cartItems.length > 0 && (
//             <div className="bg-[#141414] border border-gray-800 p-4 rounded-xl text-xs text-gray-400">
//               Sold by: <span className="text-gray-200 font-bold">JSL WORKS LUXURY</span>
//             </div>
//           )}
//         </div>

//         {/* Right Side: Price Details & Continue Button */}
//         <div className="space-y-4">
//           <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
//             <h3 className="font-bold text-base text-gray-200 border-b border-gray-800 pb-3">
//               Price Details ({cartItems.length} Items)
//             </h3>

//             <div className="space-y-2.5 text-sm text-gray-300">
//               <div className="flex justify-between">
//                 <span>Product Price</span>
//                 <span className="font-semibold">+ ₹{totalOriginalPrice}</span>
//               </div>
//               <div className="flex justify-between text-green-400">
//                 <span>Total Discounts</span>
//                 <span className="font-semibold">- ₹{totalDiscount}</span>
//               </div>
//             </div>

//             <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-base font-bold text-white">
//               <span>Order Total</span>
//               <span className="text-xl text-[#d4af37]">₹{orderTotal}</span>
//             </div>

//             {/* Discount Alert Banner */}
//             <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
//               🎉 Yay! Your total discount is ₹{totalDiscount}
//             </div>

//             <p className="text-[10px] text-gray-500 text-center">
//               Clicking on 'Continue' will not deduct any money
//             </p>

//             {/* Continue Button to Address Step */}
//             <Link 
//               href="/checkout/address" 
//               className="w-full block bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black font-extrabold py-3.5 rounded-xl text-center shadow-lg hover:opacity-90 transition"
//             >
//               Continue
//             </Link>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic userId getter from localStorage or fallback
  const getUserId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId") || "guest-user-1";
    }
    return "guest-user-1";
  };

  useEffect(() => {
    async function fetchCart(){
      try{
        const userId = getUserId();
        const res = await fetch(`/api/cart?userId=${userId}`);
        const data = await res.json();

        if(data.success && data.cart && data.cart.items){
          setCartItems(data.cart.items);
        }
      }catch(error){
        console.log("Error fetching cart data:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const removeItem = async (productId, size) => {
    try{
      const userId = getUserId();
      const res = await fetch(`/api/cart?userId=${userId}&productId=${productId}&size=${size}`,{
        method: 'DELETE',  
      });
      const data = await res.json();

      if(data.success){
        // FIX: data.cart.items (plural) instead of item
        setCartItems(data.cart.items || []);
      }
    }catch(error){
      console.log("Error removing item:", error);
    }
  };

  // Price Calculations
  const totalProductPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  
  const totalOriginalPrice = cartItems.reduce((acc, item) => {
    const itemMrp = item.originalPrice || item.mrp || (item.price ? item.price * 2 : 0);
    return acc + itemMrp * (item.quantity || 1);
  }, 0);

  const totalDiscount = totalOriginalPrice > totalProductPrice ? totalOriginalPrice - totalProductPrice : 0;
  const orderTotal = totalProductPrice;

  if(loading){
    return(
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center font-medium">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      
       {/* Top Header & Step Wizard Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-8 gap-4">
        <h1 className="text-2xl font-black tracking-wider text-[#d4af37]">YOUTH PINNACLE</h1>
        
        {/* Progress Bar */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">✓</div>
              <span className="text-[10px] mt-1 text-emerald-500 font-medium">Cart</span>
            </div>
            <div className="flex-1 h-[2px] bg-emerald-600 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">2</div>
              <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Address</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">3</div>
              <span className="text-[10px] mt-1 text-gray-400">Payment</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">4</div>
              <span className="text-[10px] mt-1 text-gray-400">Summary</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
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
           cartItems.map((item, index) => {
            const mrp = item.originalPrice || item.mrp || (item.price ? item.price * 2 : 0);
            const discountPercent = mrp > item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 0;

            return (
              <div key={index} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 items-start justify-between shadow-lg">
                <div className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-800 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={item.image || "/profile-img.png"} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm md:text-base text-gray-100">{item.name}</h3>
                   <p className="text-[#d4af37] font-extrabold text-sm flex items-center gap-2">
            <span>₹{item.price}</span> 
            <span className="text-gray-500 line-through text-xs font-normal">₹{mrp}</span>
            
            {discountPercent > 0 && (
              <span className="text-green-400 text-xs font-semibold">
                {discountPercent}% Off
              </span>
            )}
          </p>
                    <p className="text-xs text-gray-400">All issue easy returns</p>
                    <div className="flex gap-4 text-xs pt-1 text-gray-300 font-medium">
                      <span>Size: <strong className="text-white">{item.size}</strong></span>
                      <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between items-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                  <Link 
                    href={`/product/${item.productId}`} 
                    className="text-xs font-bold text-[#d4af37] hover:underline"
                  >
                    EDIT
                  </Link>
                  <button 
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 mt-auto"
                  >
                    ✕ REMOVE
                  </button>
                </div>
              </div>
            );
          })
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
                <span className="font-semibold">+ ₹{totalOriginalPrice}</span>
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