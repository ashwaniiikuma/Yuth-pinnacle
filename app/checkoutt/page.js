// "use client"

// import Router, { useRouter, useSearchParams } from "next/navigation";
// import {useState, useEffect, Suspense } from "react";
// import { productsData } from "../data/products";
// function CheckoutContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const productId = searchParams.get("id") ;
//   const selectedSize = searchParams.get("size") ;

//   const [product, setProduct] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   useEffect(()=>{
//     //find product based n url id
//     const foundProduct = productsData.find((p) => p.id ==  productId) || productsData[0];
//     setProduct(foundProduct);

//     //load saved address from localstorage
//     const address = JSON.parse(localStorage.getItem("selectedAddress"))
//     if(address){
//       setSelectedAddress(address);
//     }
//   }, [productId]);

//   const handleContinueToPayment= () =>{
//     //save current buy item summary for the payment page
//     const checkoutItem = {
//       ...product,
//       size: selectedSize,
//       qty:1
//     };
//     localStorage.setItem("directBuyItem", JSON.stringify(checkoutItem));

//     //redirect to payment page
//     router.push("/checkouts/payment");
//   }

//   return(
//     <div className="min-h-screen bg-[#0b0b0b] text-white py-6 px-4 md:px-12 ">

//         {/* Top Header & Step Nizard Bar */}
//          <div className="mx-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-4 gap-4">
//           <h1 className="text-2xl font-black tracking-wider text-[#d4af37] cursor-pointer" onClick={()=> router.push("/")}>PY</h1>
         
//          <div className="w-full md:w-1/3">
//           <div className="flex items-center justify-between relative">
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">1</div>
//             <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Review</span>
//             </div>
//             <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
//             <div className="flex flex-col items-center z-10">
//               <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600n text-gray-400 font-bold flex items-center justify-center text-xs ">2</div>
//             <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Payment</span>
//             </div>
//           </div>
//          </div>
//          </div>
//          {/* main layout: 2 Column */}
//          <div className="max-w-6xl mx-auto  grid grid-cols-1 lg:grid-cols-3 gap-8  items-start">
//           {/* left side: product Details */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* product details */}
//             <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-lg">
//               <h2 className="text-sm font-bold  text-gray-200">Product Details</h2>

//               <div className="border border-gray-800 rounded-xl p-4 bg-[#0b0b0b] space-y-2">
//                 <p className="text-xs text-emerald-400 font-medium"> Estimated Delivery by wednesday, 03rd Sep</p>

//                 <div className="flex justify-between items-start pt-2">
//                   <div className="flex gap-4">
//                     <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
//                       <img src={productsData?.image?.[0]} 
//                       alt="Product"
//                       className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <h3 className="text-xs font-bold text-gray-100 line-clamp-1">{productsData?.name}</h3>
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm font-extrabold text-white">{productsData?.price}</span>
//                           <span className="text-sm font-gray-500 line-through">{productsData?.originalPrice}</span>
//                           <span className="text-[10px] text-emerald-400">{productsData?.discount}</span>
//                         </div>
//                         <p className="text-[11px] text-gray-400">All issue easy returns</p>
//                         <p className="text-xs text-gray-300 font-medium">Size: <span className="text-[#d4af37] font-bold ">{selectedSize}</span></p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={()=> router.back()}
//                     className="text-xs font-bold text-[#d4af37] hover:underline"
//                   >EDIT</button>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-400">Sold by: <span>{productsData?.soldBy}</span></p>
//             </div>
//               {/* Delivery address Section */}
//               <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-lg">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-sm font-bold text-gray-200">Delivery Address</h2>
//                   <button onClick={() => router.push("/checkouts/address")}
//                     className="text-xs font-bold text-[#d4af37] hover:underline"
//                     >
//                     CHANGE
//                   </button>
//                 </div>
//                 {selectedAddress ? (

               
//                 <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-4 space-y-1  text-xs">
//                   <p className="font-bold text-sm text-gray-100" >{selectedAddress.name}</p>
//                   <p className="text-gray-400">{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state}-{selectedAddress.pincode}</p>
//                   <p className="text-gray-300 font-semibold scroll-pt-1.5">{selectedAddress.phone}</p>
//                 </div>
//                 ):(
//                   <div className="text-xs text-gray-400 flex justify-between items-center bg-[#0b0b0b] p-4 rounded-xl border border-gray-800">
//                     <span>No address selected yet.</span>
//                     <button onClick={() => router.push("/checkouts/address")} className="text-[#d4af37] underline font-bold">Add Address</button>
//                   </div>
//                  )}
//               </div>
//           </div>

//           {/* Right Side: Price Details Box & Continue Button */}
//         <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
//           <h3 className="font-bold text-sm text-gray-200 border-b border-gray-800 pb-3">
//             Price Details (1 Item)
//           </h3>

//           <div className="space-y-2 text-xs text-gray-300">
//             <div className="flex justify-between">
//               <span>Product Price</span>
//               <span className="font-semibold">+ ₹{productsData?.originalPrice}</span>
//             </div>
//             <div className="flex justify-between text-emerald-400">
//               <span>Total Discounts</span>
//               <span className="font-semibold">- ₹{productsData?.originalPrice - productsData?.price}</span>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-sm font-bold text-white">
//             <span>Order Total</span>
//             <span className="text-base text-white">₹{productsData?.price}</span>
//           </div>

//           <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
//             🛡️ Yay! Your total discount is ₹{productsData?.originalPrice - productsData?.price}
//           </div>

//           <p className="text-[10px] text-gray-500 text-center">Clicking on 'Continue' will not deduct any money</p>

//           <button 
//             onClick={handleContinueToPayment}
//             className="w-full bg-[#9f2089] hover:bg-[#851972] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md"
//           >
//             Continue
//           </button>
//         </div>
//          </div>
//     </div>
//   )
// }


// export default function CheckoutPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">Loading...</div>}>
//       <CheckoutContent />
//     </Suspense>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { productsData } from "../data/products";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");
  const selectedSize = searchParams.get("size") || "M";

  const [product, setProduct] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Find product based on URL id
    const foundProduct = productsData.find((p) => String(p.id) === String(productId)) || productsData[0];
    setProduct(foundProduct);

    // Load saved address from localstorage
    const address = JSON.parse(localStorage.getItem("selectedAddress"));
    if (address) {
      setSelectedAddress(address);
    }
  }, [productId]);

  const handleContinueToPayment = () => {
    if (!product) return;
    // Save current buy item summary for the payment page
    const checkoutItem = {
      ...product,
      size: selectedSize,
      qty: 1
    };
    localStorage.setItem("directBuyItem", JSON.stringify(checkoutItem));

    // Redirect to payment page
    router.push("/checkouts/payment");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-6 px-4 md:px-12">
      
      {/* Top Header & Step Wizard Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-4 gap-4">
        <h1 className="text-2xl font-black tracking-wider text-[#d4af37] cursor-pointer" onClick={() => router.push("/")}>YP</h1>
         
        <div className="w-full md:w-1/3">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">1</div>
              <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Review</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">2</div>
              <span className="text-[10px] mt-1 text-gray-400">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: 2 Column */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Product Details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Product Details Box */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h2 className="text-sm font-bold text-gray-200">Product Details</h2>

            <div className="border border-gray-800 rounded-xl p-4 bg-[#0b0b0b] space-y-2">
              <p className="text-xs text-emerald-400 font-medium">Estimated Delivery by Wednesday, 03rd Sep</p>

              <div className="flex justify-between items-start pt-2">
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product?.image || product?.images?.[0] || "/product-1.jpg"} 
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-100 line-clamp-1">{product?.name || "Loading product..."}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-white">₹{product?.price}</span>
                      <span className="text-xs text-gray-500 line-through">₹{product?.originalPrice}</span>
                      <span className="text-[10px] text-emerald-400">{product?.discount}</span>
                    </div>
                    <p className="text-[11px] text-gray-400">All issue easy returns</p>
                    <p className="text-xs text-gray-300 font-medium">Size: <span className="text-[#d4af37] font-bold">{selectedSize}</span></p>
                  </div>
                </div>
                
                <button
                  onClick={() => router.back()}
                  className="text-xs font-bold text-[#d4af37] hover:underline"
                >
                  EDIT
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">Sold by: <span className="text-gray-200">{product?.soldBy || "Official Store"}</span></p>
          </div>

          {/* Delivery Address Section */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-gray-200">Delivery Address</h2>
              <button 
                onClick={() => router.push("/checkout/address")}
                className="text-xs font-bold text-[#d4af37] hover:underline"
              >
                CHANGE
              </button>
            </div>
            
            {selectedAddress ? (
              <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-4 space-y-1 text-xs">
                <p className="font-bold text-sm text-gray-100">{selectedAddress.name}</p>
                <p className="text-gray-400">{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state}-{selectedAddress.pincode}</p>
                <p className="text-gray-300 font-semibold pt-1">{selectedAddress.phone}</p>
              </div>
            ) : (
              <div className="text-xs text-gray-400 flex justify-between items-center bg-[#0b0b0b] p-4 rounded-xl border border-gray-800">
                <span>No address selected yet.</span>
                <button onClick={() => router.push("/checkouts/address")} className="text-[#d4af37] underline font-bold">Add Address</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Price Details Box & Continue Button */}
        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-gray-200 border-b border-gray-800 pb-3">
            Price Details (1 Item)
          </h3>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span className="font-semibold">+ ₹{product?.originalPrice || product?.price}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Total Discounts</span>
              <span className="font-semibold">- ₹{product?.originalPrice ? product.originalPrice - product.price : 0}</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-sm font-bold text-white">
            <span>Order Total</span>
            <span className="text-base text-white">₹{product?.price}</span>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
            🛡️ Yay! Your total discount is ₹{product?.originalPrice ? product.originalPrice - product.price : 0}
          </div>

          <p className="text-[10px] text-gray-500 text-center">Clicking on 'Continue' will not deduct any money</p>

          <button 
            onClick={handleContinueToPayment}
            className="w-full bg-[#9f2089] hover:bg-[#851972] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}