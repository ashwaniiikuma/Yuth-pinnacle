"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // LocalStorage se saved orders fetch kar rahe hain
    const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    
    // Agar koi order nahi hai, toh testing ke liye ek dummy order daal sakte hain 
    // taaki tracking UI kaisa dikhega wo samajh aa jaye.
    if (savedOrders.length === 0) {
      const dummyOrders = [
        {
          id: "YP-849201",
          date: "3rd Sep 2026",
          title: "Men Black Solid Oversized Fit T-shirt",
          size: "L",
          qty: 1,
          price: 799,
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
          status: "Shipped", // Options: Packed, Shipped, Out for Delivery, Delivered
          deliveryDate: "Expected by 6th Sep 2026",
        }
      ];

        const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
        localStorage.setItem("userOrders", JSON.stringify([...existingOrders, newOrderData ]));

      setOrders(dummyOrders);
      localStorage.setItem("userOrders", JSON.stringify(dummyOrders));
    } else {
      setOrders(savedOrders);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            Account
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Ashwani Kumar</p>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="space-y-6 bg-[#141414] p-4 border border-gray-800 rounded-2xl h-fit text-xs">
            <div>
              <button onClick={() => router.push("/")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Overview
              </button>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Orders</p>
              <button className="block w-full text-left py-2 px-3 rounded-lg font-bold text-[#d4af37] bg-gray-900 transition">
                Orders & Returns
              </button>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Account</p>
              <div className="space-y-1">
                <button onClick={() => router.push("/my/profile")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                  Profile
                </button>
                <button onClick={() => router.push("/my/address")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                  Addresses
                </button>
                <button onClick={() => { localStorage.clear(); router.push("/"); }} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-red-500 hover:bg-red-500/10 transition mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Orders & Tracking List */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-base font-bold text-white mb-2">My Orders ({orders.length})</h2>

            {orders.length === 0 ? (
              <div className="bg-[#141414] border border-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[350px]">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-900 rounded-full border border-gray-800 text-2xl">
                  📦
                </div>
                <h3 className="text-sm font-bold text-white mb-1">No orders found!</h3>
                <p className="text-xs text-gray-400 max-w-sm mb-6">
                  You haven't placed any orders yet. Start shopping to track them here.
                </p>
                <button 
                  onClick={() => router.push("/")}
                  className="bg-[#ff3f6c] hover:bg-[#e0355d] text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase transition shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-6 text-xs space-y-4">
                  
                  {/* Order Top Meta */}
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3 text-gray-400">
                    <div>
                      <span>Order ID: <strong className="text-white">{order.id}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Placed on {order.date}</span>
                    </div>
                    <span className="text-pink-500 font-extrabold bg-pink-500/10 px-3 py-1 rounded-full text-[10px]">
                      {order.status}
                    </span>
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img 
                        src={order.image || "https://via.placeholder.com/80"} 
                        alt={order.title} 
                        className="w-16 h-20 object-cover rounded-xl border border-gray-800"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{order.title}</h4>
                        <p className="text-gray-400 text-[11px]">Size: {order.size} | Qty: {order.qty}</p>
                        <p className="font-extrabold text-white mt-1">₹{order.price}</p>
                      </div>
                    </div>

                    <div className="text-right sm:text-right w-full sm:w-auto">
                      <p className="text-gray-400 text-[11px] font-medium">{order.deliveryDate}</p>
                    </div>
                  </div>

                  {/* Tracking Progress Bar UI */}
                  <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 mt-2">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
                      <span className="text-pink-500">Order Placed</span>
                      <span className={order.status !== "Packed" ? "text-pink-500" : ""}>Shipped</span>
                      <span className={order.status === "Delivered" ? "text-pink-500" : ""}>Delivered</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-pink-500 transition-all duration-500 ${
                          order.status === "Packed" ? "w-1/3" : order.status === "Shipped" ? "w-2/3" : "w-full"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-800 pt-3 flex gap-4 justify-end text-[11px] font-extrabold">
                    <button 
                      onClick={() => alert(`Tracking details for Order #${order.id}: Package is currently in transit.`)}
                      className="border border-gray-700 hover:border-white text-white px-4 py-2 rounded-xl transition uppercase"
                    >
                      Track Order
                    </button>
                    {order.status === "Delivered" && (
                      <button 
                        onClick={() => alert("Return window is open for 7 days.")}
                        className="bg-[#ff3f6c] hover:bg-[#e0355d] text-white px-4 py-2 rounded-xl transition uppercase shadow-md"
                      >
                        Return / Exchange
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </div>
  );
}