

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  // Modal State for Return/Exchange
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionType, setActionType] = useState("Return"); // 'Return' or 'Exchange'
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newSize, setNewSize] = useState("M");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");

    if (!isLoggedIn || !email) {
      router.push("/login");
      return;
    }
    if (name) {
      setUserName(name);
    }

    async function fetchOrders() {
      try {
        const res = await fetch(`/api/auth/user/orders?email=${email}`);
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [router]);

  const handleReturnExchangeSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      alert("Please select a reason.");
      return;
    }
    const userEmail = localStorage.getItem("userEmail");
    const orderId = selectedOrder.orderId || selectedOrder._id;

    try{
      const res = await fetch("/api/auth/user/orders/return", {
      method: "POST",
        headers: {"Conent-Type": "application/json"},
        body: JSON.stringify({
          orderId,
          actionType,
          reason,
          comment,
          newSize: actionType === "Exchange" ? newSize: null,
          userEmail,
        }),
      });
      const data = await res.json();
      if(data.success){
        setSuccessMsg(`Your${actionType} request has been successfully submitted!`);

        setOrders((preOrders)=>
          preOrders.map((ord) =>
          (ord.orderId === orderId || ord._id === orderId)
        ?{...ord, status: `${actionType} Requested`}
        :ord
          )
        );
        setTimeout(() => {
          setSelectedOrder(null);
          setSuccessMsg("");
          setReason("");
          setComment("");
        }, 2500);
      }else{
        alert(data.message || "Failed to submit request.");
      }
    }catch(error){
      console.log("Fetch Error: ", error);
      alert("Server error. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center text-xs">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            Account
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{userName}</p>
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
              orders.map((order) => {
                const displayId = order.orderId || order._id;
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {day:'numeric', month: 'short', year: 'numeric'}) : "Recent";
                const orderStatus = order.status || "Pending";

                return (
                  <div key={order._id || order.orderId} className="bg-[#141414] border border-gray-800 rounded-2xl p-6 text-xs space-y-4">
                    
                    {/* Order Top Meta */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-800 pb-3 text-gray-400">
  <div className="flex flex-wrap items-center gap-x-2">
    <span>Order ID: <strong className="text-white">{displayId}</strong></span>
    <span className="hidden sm:inline">•</span>
    <span className="text-sm">Placed on {orderDate}</span>
  </div>
  <span className="text-pink-500 font-extrabold bg-pink-500/10 px-3 py-1 rounded-full text-[10px] uppercase">
    {orderStatus}
  </span>
</div>

                    {/* Product Details Section */}
                    <div className="space-y-4">
                      {order.cartItems && order.cartItems.length > 0 ? (
                        order.cartItems.map((item, index) => (
                          <div key={index} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-gray-900 pb-3 last:border-none">
                            <div className="flex gap-4 items-center">
                              <img 
                                src={item.image || "https://via.placeholder.com/80"} 
                                alt={item.title || "Product"} 
                                className="w-16 h-20 object-cover rounded-xl border border-gray-800"
                              />
                              <div>
                                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                <p className="text-gray-400 text-[11px]">
                                  {item.size ? `Size: ${item.size} | ` : ""} Qty: {item.quantity || item.qty || 1}
                                </p>
                                <p className="font-extrabold text-white mt-1">₹{item.price}</p>
                              </div>
                            </div>
                            <div className="text-right sm:text-right w-full sm:w-auto">
                              <p className="text-gray-400 text-[11px] font-medium">Total: ₹{item.price * (item.quantity || item.qty || 1)}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No items found in this order.</p>
                      )}
                    </div>

                    {/* Tracking Progress Bar UI */}
                    <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 mt-2">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
                        <span className={orderStatus.toLowerCase() !== "pending" ? "text-pink-500" : "text-white"}>Order Placed</span>
                        <span className={orderStatus.toLowerCase() === "shipped" || orderStatus.toLowerCase() === "delivered" ? "text-pink-500" : ""}>Shipped</span>
                        <span className={orderStatus.toLowerCase() === "delivered" ? "text-pink-500" : ""}>Delivered</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-pink-500 transition-all duration-500 ${
                            orderStatus.toLowerCase() === "pending" ? "w-1/4" : 
                            orderStatus.toLowerCase() === "packed" ? "w-2/4" : 
                            orderStatus.toLowerCase() === "shipped" ? "w-3/4" : 
                            orderStatus.toLowerCase() === "delivered" ? "w-full" : "w-1/4"
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-800 pt-3 flex gap-4 justify-end text-[11px] font-extrabold">
                      <button 
                        onClick={() => alert(`Tracking details for Order #${displayId}: Status is ${orderStatus}`)}
                        className="border border-gray-700 hover:border-white text-white px-4 py-2 rounded-xl transition uppercase"
                      >
                        Track Order
                      </button>
                      
                      {/* Return / Exchange Button (Enabled when Delivered) */}
                      {(orderStatus.toLowerCase() === "delivered" || orderStatus.toLowerCase() === "delivred") && (
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#ff3f6c] hover:bg-[#e0355d] text-white px-4 py-2 rounded-xl transition uppercase shadow-md"
                        >
                          Return / Exchange
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>
      </div>

      {/* Return / Exchange Modal Popup */}
     {/* Return / Exchange Modal Popup */}
{selectedOrder && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-[#141414] border border-gray-800 rounded-2xl max-w-md w-full p-6 text-xs space-y-4 shadow-2xl">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Request Return / Exchange</h3>
        <button 
          onClick={() => setSelectedOrder(null)}
          className="text-gray-400 hover:text-white font-bold text-base"
        >
          ✕
        </button>
      </div>

      {successMsg ? (
        <div className="bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-xl text-center font-bold">
          {successMsg}
        </div>
      ) : (
        <form onSubmit={handleReturnExchangeSubmit} className="space-y-4">
          
          {/* Action Type: Return or Exchange */}
          <div>
            <label className="block text-gray-400 mb-1 font-bold">Select Action Type:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input 
                  type="radio" 
                  name="actionType" 
                  value="Return" 
                  checked={actionType === "Return"} 
                  onChange={(e) => setActionType(e.target.value)} 
                />
                Return (Refund)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input 
                  type="radio" 
                  name="actionType" 
                  value="Exchange" 
                  checked={actionType === "Exchange"} 
                  onChange={(e) => setActionType(e.target.value)} 
                />
                Exchange (Change Size)
              </label>
            </div>
          </div>

          {/* MYNTRA STYLE: Agar user ne Exchange select kiya hai, toh Naya Size select karne ka option aana chahiye */}
          {actionType === "Exchange" && (
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-2">
              <label className="block text-[#d4af37] font-bold">Select New Size for Exchange:</label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => setNewSize(sz)}
                    className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                      newSize === sz 
                        ? "bg-[#d4af37] text-black border-[#d4af37]" 
                        : "bg-black text-white border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reason Selection */}
          <div>
            <label className="block text-gray-400 mb-1 font-bold">Reason for {actionType}:</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-black border border-gray-800 text-white p-2.5 rounded-xl outline-none focus:border-[#d4af37]"
              required
            >
              <option value="">-- Choose a reason --</option>
              {actionType === "Exchange" ? (
                <>
                  <option value="Size is too small">Size is too small - Need bigger size</option>
                  <option value="Size is too large">Size is too large - Need smaller size</option>
                  <option value="Received wrong item/size">Received wrong item/size</option>
                </>
              ) : (
                <>
                  <option value="Defective or damaged product">Defective or damaged product</option>
                  <option value="Quality not as expected">Quality not as expected</option>
                  <option value="Product no longer needed">Product no longer needed</option>
                </>
              )}
            </select>
          </div>

          {/* Delivery Address confirmation info */}
          <div className="text-[11px] text-gray-400 bg-black/40 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[#d4af37] font-bold">Pickup & Delivery Address:</span> Will be processed at your original delivery address registered with this order.
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-bold">Comments (Optional):</label>
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              placeholder="Mention specific details..."
              className="w-full bg-black border border-gray-800 text-white p-2.5 rounded-xl outline-none focus:border-[#d4af37] h-16 resize-none"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setSelectedOrder(null)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl font-bold uppercase transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-[#ff3f6c] hover:bg-[#e0355d] text-white py-2.5 rounded-xl font-bold uppercase transition shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

    </div>
  );
}