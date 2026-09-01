"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Currency } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState("online"); // 'cod' or 'online'
  const [activeAccordion, setActiveAccordion] = useState("upi"); // 'upi', 'wallet', 'card', 'netbanking'
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [selectedBank, setSelectedBank] = useState("HDFC");

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("selectedAddress"));
    if (address) {
      setSelectedAddress(address);
    }
  }, []);

  //Rozarpay script Loader Function
  const loadRazorpayScript = () =>{
    return new Promise((resolve) =>{
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    const res = await loadRazorpayScript();


  if(!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  //Razorpay Options Config
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID",
    amount: paymentType === "online" ? 23900 : 25900,
    currency: "INR",
    name: "YP Store",
    description: "Secure Payment for your order",
    handler: function (response){
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      localStorage.removeItem("cart");
      router.push("/");
    },

    prefill: {
      name: selectedAddress?.name || "Customer",
      email: "customer@example.com",
      contact: selectedAddress?.phone || "9999999999",
    },
    theme: {
      color: "#d4af37",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-6 px-4 md:px-12">
      
      {/* Top Header & Step Wizard Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-8 gap-4">
        <h1 className="text-2xl font-black tracking-wider text-[#d4af37]">YOUTH PINNACLE</h1>
        
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">✓</div>
              <span className="text-[10px] mt-1 text-emerald-500 font-medium">Cart</span>
            </div>
            <div className="flex-1 h-[2px] bg-emerald-600 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">✓</div>
              <span className="text-[10px] mt-1 text-emerald-500 font-medium">Address</span>
            </div>
            <div className="flex-1 h-[2px] bg-emerald-600 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">3</div>
              <span className="text-[10px] mt-1 text-[#d4af37] font-semibold">Payment</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-700 mx-2"></div>
            <div className="flex flex-col items-center z-10">
              <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-600 text-gray-400 font-bold flex items-center justify-center text-xs">4</div>
              <span className="text-[10px] mt-1 text-gray-400">Summary</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Payment Options */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-gray-200">Select Payment Method</h2>

          <div className="space-y-4">
            
            {/* 1. Cash on Delivery Option */}
            <div 
              onClick={() => setPaymentType("cod")}
              className={`bg-[#141414] border rounded-2xl p-4 cursor-pointer transition flex items-center justify-between ${paymentType === "cod" ? 'border-[#d4af37] bg-[#141412]' : 'border-gray-800'}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-gray-200">₹259</span>
                <div className="h-6 w-[1px] bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-100">Cash on Delivery</span>
                  <span className="text-xs">💵</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === "cod" ? 'border-[#d4af37]' : 'border-gray-600'}`}>
                {paymentType === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></div>}
              </div>
            </div>

            {/* 2. Pay Online Option (Accordion Container) */}
            <div className={`bg-[#141414] border rounded-2xl transition overflow-hidden ${paymentType === "online" ? 'border-[#d4af37]' : 'border-gray-800'}`}>
              
              {/* Main Box Header */}
              <div 
                onClick={() => setPaymentType("online")}
                className="p-4 cursor-pointer flex items-center justify-between bg-[#141414]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through">₹259</span>
                    <span className="font-bold text-sm text-[#d4af37]">
                      ₹239 
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-normal ml-1">Save ₹20</span>
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-gray-700"></div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-100">Pay Online</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === "online" ? 'border-[#d4af37]' : 'border-gray-600'}`}>
                  {paymentType === "online" && <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></div>}
                </div>
              </div>

              {/* Extra Discount Banner */}
              <div className="bg-[#1f1b10] px-4 py-2 border-t border-gray-800 flex justify-between items-center text-xs">
                <span className="text-gray-300">✨ Extra discount with bank offers</span>
                <span className="text-[#d4af37] font-bold cursor-pointer hover:underline">View Offers</span>
              </div>

              {/* Accordion Dropdowns (Visible only when Pay Online is selected) */}
              {paymentType === "online" && (
                <div className="border-t border-gray-800 divide-y divide-gray-800">
                  
                  {/* UPI */}
                  <div>
                    <div onClick={()=> setActiveAccordion(activeAccordion === "upi" ? "" : "upi")}
                    className="p-4 flex justify-between items-center cursor-pointer bg-[#181818] hover:bg-[#1c1c1c]"
                  >
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-300">UPI / Scan & Pay</span>
                      <span className="text-gray-400 text-xs font-bold">{activeAccordion === "upi" ? "▲" : "▼"}</span>
                    </div>

                      {activeAccordion === "upi" && (
                        <div className="p-4 bg-[#141414] space-y-4">
                          
                        
                         

                          <div className="text-center text-xs text-gray-500 font-medium">OR</div>

                          {/* QR code scanner option */}
                            <div className="text-center bg-[#0b0b0b] border border-gray-800 rounded-2xl p-4 space-y-3">
                              <p>Scan and pay</p>

                               {!showQr ? (
                                <button
                                onClick={() => setShowQr(true)}
                                className="px-4 py-2 bg-[#d4af37] text-black-xs font-bold rounded-xl hover:bg-[#c29f30] transition"
                                >
                                  Show QR Code
                                </button>
                               ):(
                                <div className="space-y-3 ">
                                  {/* simu;ated QR Code Box */}
                                  <div className="w-45 h-45 bg-white mx-auto object-contain  rounded-xl flex text-center items-center justify-center shadow-lg">
                                      <img src="/QRcode.jpeg"
                                       alt="Payment QR Code" 
                                       className="w-full h-full object-contain "/>
                                    
                                  </div>
                                <p className="text-[18px] pt-5 text-emerald-400">Scan QR Code with any UPI app</p>
                                <button
                                onClick={() => setShowQr(false)}
                                className="text-xs text-gray-400 underline hover:text-white"
                                >
                                  Hide QR Code
                                </button>
                                </div>
                               )}
                            </div>
                       
                        </div>
                      )}
                  </div>
                 

                {/* Debit/Credit Cards */}
                <div>
                  <div 
                    onClick={() => setActiveAccordion(activeAccordion === "card" ? "" : "card")}
                    className="p-4 flex justify-between items-center cursor-pointer bg-[#181818] hover:bg-[#1c1c1c]"
                  >
                    <span className="font-bold text-xs uppercase tracking-wider text-gray-300">Debit/Credit Cards</span>
                    <span className="text-gray-400 text-xs font-bold">{activeAccordion === "card" ? "▲" : "▼"}</span>
                </div>

                {activeAccordion === "card" && (
                  <div className="p-5 bg-[#141414] space-y-4 text-xs">
                    <h4 className="font-bold text-sm text-gray-200">Enter your card details</h4>
                    
                    {/* Card Number Input */}
                    <div>
                      <input 
                        type="text" 
                        placeholder="Enter Card Number" 
                        maxLength="19"
                        className="w-full bg-[#0b0b0b] border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" 
                      />
                    </div>

                    {/* MM and YY Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="MM" 
                        maxLength="2"
                        className="bg-[#0b0b0b] border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" 
                      />
                      <input 
                        type="text" 
                        placeholder="YY" 
                        maxLength="2"
                        className="bg-[#0b0b0b] border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" 
                      />
                    </div>

                    {/* CVV Input & Helper Text */}
                    <div className="space-y-1">
                      <input 
                        type="password" 
                        placeholder="CVV" 
                        maxLength="4"
                        className="w-full bg-[#0b0b0b] border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" 
                      />
                      <p className="text-[10px] text-gray-500 pl-1">3-digit code behind your card</p>
                    </div>

                    {/* Cancel and Verify Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button 
                        onClick={() => setActiveAccordion("")}
                        className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => alert("Card details verified!")}
                        className="px-6 py-2 rounded-xl bg-[#d4af37] text-black font-bold hover:bg-[#c29f30] transition shadow-lg"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>

                  {/* Net Banking */}
                  <div>
                    <div 
                      onClick={() => setActiveAccordion(activeAccordion === "netbanking" ? "" : "netbanking")}
                      className="p-4 flex justify-between items-center cursor-pointer bg-[#181818] hover:bg-[#1c1c1c]"
                    >
                      <span className="font-bold text-xs uppercase tracking-wider text-gray-300">Net Banking</span>
                      <span className="text-gray-400 text-xs font-bold">{activeAccordion === "netbanking" ? "▲" : "▼"}</span>
                    </div>

                    {activeAccordion === "netbanking" && (
                      <div className="p-4 bg-[#141414] text-xs text-gray-400">
                        {["State Bank of India", "HDFC Bank", "ICICI NetBanking", "Axis Bank"].map((bank) =>(
                          <div
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className="flex justify-between items-center p-3 rounded-xl bg-[#0b0b0b] border border-gray-800 cursor-pointer hover:border-[#d4af37]"
                          >
                            <span className="text-gray-200 font-medium">{bank}</span>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center $${selectedBank === bank ? 'border-[#d4af37]': 'border-gray-600'}`}>
                              {selectedBank === bank && <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>}
                            </div>
                          </div>
                        ))}
                          <button className="text-[#d4af37] font=-bold pt-2 cursor-pointer hover:underline">VIEW ALL BANKS &gt;</button>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Delivery Address Preview Card */}
          {selectedAddress && (
            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 mt-6">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>Delivering to</span>
                <button onClick={() => router.push("/checkout/address")} className="text-[#d4af37] font-bold hover:underline">CHANGE</button>
              </div>
              <p className="text-sm font-bold text-gray-200">{selectedAddress.name} <span className="font-normal text-xs text-gray-400">({selectedAddress.phone})</span></p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
            </div>
          )}

          {/* Place Order Button */}
          <div className="pt-4">
            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-[#9f2089] hover:bg-[#851972] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md"
            >
              Continue / Place Order
            </button>
          </div>
        </div>

        {/* Right Side: Price Details Box */}
        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-gray-200 border-b border-gray-800 pb-3">
            Price Details (1 Item)
          </h3>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span className="font-semibold">+ ₹269</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Total Discounts</span>
              <span className="font-semibold">- ₹10</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-sm font-bold text-white">
            <span>Order Total</span>
            <span className="text-base text-white">₹259</span>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
            🛡️ Yay! Your total discount is ₹10
          </div>
        </div>

      </div>
    </div>
  );
}