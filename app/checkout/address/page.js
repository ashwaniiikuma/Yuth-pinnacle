"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Ashwani Kumar",
      phone: "7451832023",
      address: "94, Laksher Dhandhera Raj vihar",
      city: "Roorkee",
      state: "Uttarakhand",
      pincode: "247666",
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  
  // New Address Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill all required fields!");
      return;
    }

    const newAddress = {
      id: Date.now(),
      ...formData
    };

    setAddresses([...addresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShowForm(false);
    setFormData({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
  };

  const handleProceedToPayment = () => {
    const chosenAddress = addresses.find(addr => addr.id === selectedAddressId);
    if (!chosenAddress) {
      alert("Please select a delivery address!");
      return;
    }
    localStorage.setItem("selectedAddress", JSON.stringify(chosenAddress));
    router.push("/checkouts/payment");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-6 px-4 md:px-12">
      
      {/* Top Header & Step Wizard Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 mb-8 gap-4">
        <h1 className="text-2xl font-black tracking-wider text-[#d4af37]">YOUTH PINNACLE</h1>
        
        {/* Progress Bar */}
        <div className="w-full md:w-1/2">
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

      {/* Main Layout: 2 Columns (Left: Address, Right: Price Details) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Select Address Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-200">Select Delivery Address</h2>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="text-[#d4af37] text-xs font-bold tracking-wide hover:underline uppercase"
            >
              {showForm ? "Cancel" : "+ ADD NEW ADDRESS"}
            </button>
          </div>

          {/* Add New Address Form */}
          {showForm && (
            <form onSubmit={handleAddAddress} className="bg-[#141414] border border-gray-800 p-5 rounded-2xl space-y-3 shadow-xl">
              <h3 className="text-xs font-bold text-[#d4af37] uppercase">Enter New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                <input type="text" name="address" placeholder="House No., Building, Street Name" value={formData.address} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white md:col-span-2 focus:outline-none focus:border-[#d4af37]" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
              </div>
              <button type="submit" className="w-full bg-[#d4af37] text-black font-extrabold py-2.5 rounded-xl text-xs tracking-wider uppercase">Save Address</button>
            </form>
          )}

          {/* Address Cards List */}
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div 
                key={addr.id} 
                className={`bg-[#141414] border rounded-2xl p-5 shadow-lg transition relative ${selectedAddressId === addr.id ? 'border-[#d4af37] bg-[#141412]' : 'border-gray-800'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      checked={selectedAddressId === addr.id} 
                      onChange={() => setSelectedAddressId(addr.id)} 
                      className="accent-[#d4af37] w-4 h-4 mt-0.5 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-gray-100">{addr.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {addr.address}, {addr.city}, {addr.state}, {addr.pincode}
                      </p>
                      <p className="text-xs text-gray-300 font-semibold pt-0.5">{addr.phone}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#d4af37] tracking-wider uppercase hover:underline">
                    EDIT
                  </button>
                </div>

                {/* Deliver to this Address Button inside the card when selected */}
                {selectedAddressId === addr.id && (
                  <div className="mt-5 pt-4 border-t border-gray-800">
                    <button 
                      onClick={handleProceedToPayment}
                      className="w-full bg-[#9f2089] hover:bg-[#851972] text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
                    >
                      Deliver to this Address
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Price Details Box */}
        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-gray-200 border-b border-gray-800 pb-3">
            Price Details (1 Item)
          </h3>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="underline decoration-dotted underline-offset-4 cursor-pointer">Product Price</span>
              <span className="font-semibold">+ ₹269</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span className="underline decoration-dotted underline-offset-4 cursor-pointer">Total Discounts</span>
              <span className="font-semibold">- ₹10</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-sm font-bold text-white">
            <span>Order Total</span>
            <span className="text-base text-white">₹259</span>
          </div>

          {/* Discount Banner */}
          <div className="bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 text-xs text-center font-medium">
            🛡️ Yay! Your total discount is ₹10
          </div>
        </div>

      </div>
    </div>
  );
}